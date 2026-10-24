import {
	cloneElement,
	isValidElement,
	useCallback,
	useEffect,
	useId,
	useMemo,
	useRef,
	type ComponentPropsWithRef,
	type FC,
	type ReactElement
} from 'react'
import {TextInput, View} from 'react-native'
import {useImmer} from 'use-immer'

import type {InteractionState} from '../../constants'
import type {PopoverBaseProps, PopoverState} from './Popover.interface'

import {
	useInteractionStateEvent,
	useMergeRefs,
	usePendingEvent,
	type HandleInteractionStateChangeOptions,
	type InteractionEvent
} from '../../hooks'
import {debounce} from '../../utils'
import {POPOVER_TYPE} from './Popover.enum'
import {
	emitPopoverContent,
	emitPopoverPressableLayout,
	handleElevationAnimationFinished,
	handlePopoverContentAnimationFinished,
	handlePopoverStateChange,
	unmountPopoverContent,
	unmountPopoverPressableLayout,
	handlePopoverContextMenu,
	updatePopoverElevation,
	updatePopoverVisible
} from './Popover.handler'
import {RenderPopover} from './Popover.render'

export const PopoverBase: FC<PopoverBaseProps> = ({
	children: rawChildren,
	content,
	contentPosition,
	defaultVisible,
	disabled: isDisabled = false,
	elevation: rawElevation,
	onAnimationFinished: rawOnAnimationFinished,
	onKeyDown,
	onVisibleChange: rawOnVisibleChange,
	ref,
	shape,
	triggerOn,
	type = POPOVER_TYPE.TOOLTIP,
	visible: rawVisible,
	...renderPopoverProps
}) => {
	const [
		{
			contextMenuLayout,
			elevation,
			pendingAnimationFinishedEvent,
			pendingEmitContentEvent,
			pendingUnmountContentEvent,
			pendingUnmountPressableLayoutEvent,
			pendingVisibleEvent,
			pendingVisibleRequestEvent,
			visible: isVisible
		},
		setState
	] = useImmer<PopoverState>({visible: rawVisible ?? defaultVisible})

	usePendingEvent('pendingVisibleEvent', rawOnVisibleChange, {pendingEvent: pendingVisibleEvent, setState})
	usePendingEvent('pendingAnimationFinishedEvent', rawOnAnimationFinished, {
		pendingEvent: pendingAnimationFinishedEvent,
		setState
	})

	const childrenRef = useRef<TextInput>(null)
	const containerRef = useRef<View>(null)
	const mergedRef = useMergeRefs([ref, containerRef])
	const mergedChildrenRef = useMergeRefs([
		isValidElement(rawChildren) && type === POPOVER_TYPE.TEXT_INPUT_PICKER ?
			(rawChildren as ReactElement<ComponentPropsWithRef<typeof TextInput>>).props.ref
		:	null,
		childrenRef
	])

	const id = useId()
	const debounceVisibleDelay = type === POPOVER_TYPE.TEXT_INPUT_PICKER ? 0 : 100
	const onVisibleChange = useMemo(() => {
		const delayedVisible = debounce(
			updatePopoverVisible(setState, {onVisibleChange: rawOnVisibleChange, type}),
			debounceVisibleDelay
		)

		const immediateVisible = updatePopoverVisible(setState, {onVisibleChange: rawOnVisibleChange, type})
		const resolveVisible = (visible?: boolean) => (visible ? delayedVisible(visible) : immediateVisible(visible))

		resolveVisible.cancel = delayedVisible.cancel

		return resolveVisible
	}, [debounceVisibleDelay, rawOnVisibleChange, setState, type])

	usePendingEvent('pendingVisibleRequestEvent', onVisibleChange, {pendingEvent: pendingVisibleRequestEvent, setState})

	const onElevationAnimationFinished = useMemo(
		() => handleElevationAnimationFinished(setState, rawOnVisibleChange),
		[rawOnVisibleChange, setState]
	)

	const onUnmountContent = useMemo(() => unmountPopoverContent(id), [id])

	usePendingEvent('pendingUnmountContentEvent', onUnmountContent, {
		pendingEvent: pendingUnmountContentEvent,
		setState
	})

	const onUnmountPressableLayout = useMemo(() => unmountPopoverPressableLayout(id), [id])

	usePendingEvent('pendingUnmountPressableLayoutEvent', onUnmountPressableLayout, {
		pendingEvent: pendingUnmountPressableLayoutEvent,
		setState
	})

	const onContentAnimationFinished = useMemo(
		() =>
			handlePopoverContentAnimationFinished(setState, {
				onAnimationFinished: rawOnAnimationFinished,
				onUnmountContent,
				onUnmountPressableLayout,
				type
			}),
		[onUnmountContent, onUnmountPressableLayout, rawOnAnimationFinished, setState, type]
	)

	const onContextMenu = useMemo(
		() => handlePopoverContextMenu(setState, {disabled: isDisabled, onVisibleChange}),
		[isDisabled, onVisibleChange, setState]
	)

	const onEmitContent = useMemo(
		() =>
			emitPopoverContent(id, {
				content,
				contentPosition,
				elevation,
				onAnimationFinished: onContentAnimationFinished,
				onElevationAnimationFinished,
				onVisibleChange,
				shape,
				triggerOn,
				type
			}),
		[
			content,
			elevation,
			id,
			onContentAnimationFinished,
			onElevationAnimationFinished,
			onVisibleChange,
			contentPosition,
			shape,
			triggerOn,
			type
		]
	)

	const runEmitContent = onEmitContent

	usePendingEvent('pendingEmitContentEvent', onEmitContent, {pendingEvent: pendingEmitContentEvent, setState})

	const onInteractionStateChange = useCallback(
		(event: InteractionEvent, interactionState: InteractionState, options: HandleInteractionStateChangeOptions) =>
			handlePopoverStateChange(event, setState, {
				...options,
				childrenRef,
				containerRef,
				interactionState,
				onEmitContent,
				onUnmountContent,
				onUnmountPressableLayout,
				onVisibleChange,
				triggerOn,
				type
			}),
		[onEmitContent, onUnmountContent, onUnmountPressableLayout, onVisibleChange, setState, triggerOn, type]
	)

	const interactionHandlers = useInteractionStateEvent({
		...renderPopoverProps,
		disabled: isDisabled,
		onInteractionStateChange
	})

	const runEmitPressableLayout = useMemo(() => emitPopoverPressableLayout(id, containerRef), [id])
	const runUnmountContent = onUnmountContent
	const runUnmountPressableLayout = onUnmountPressableLayout
	const runUpdateVisible = onVisibleChange
	const runUpdateElevation = useMemo(() => updatePopoverElevation(setState), [setState])
	const children = cloneElement(rawChildren ?? <></>, {
		...(type === POPOVER_TYPE.CONTEXT_MENU && {onContextMenu}),
		...(type === POPOVER_TYPE.TEXT_INPUT_PICKER && {onKeyPress: onKeyDown, ref: mergedChildrenRef}),
		...interactionHandlers
	})

	useEffect(() => {
		if (contextMenuLayout) {
			runEmitContent({containerLayout: contextMenuLayout, visible: isVisible})

			return
		}

		containerRef.current?.measureInWindow((x, y, width, height) =>
			runEmitContent({containerLayout: {height, width, x, y}, visible: isVisible})
		)
	}, [contextMenuLayout, isVisible, runEmitContent])

	useEffect(() => {
		if (type === POPOVER_TYPE.TEXT_INPUT_PICKER && isVisible) {
			runEmitPressableLayout(interactionHandlers)
		}
	}, [interactionHandlers, isVisible, runEmitPressableLayout, type])

	useEffect(() => {
		runUpdateElevation(rawElevation)
	}, [rawElevation, runUpdateElevation])

	useEffect(() => {
		runUpdateVisible(rawVisible)

		return () => runUpdateVisible.cancel()
	}, [rawVisible, runUpdateVisible])

	useEffect(
		() => () => {
			runUnmountContent()
			runUnmountPressableLayout()
		},
		[runUnmountContent, runUnmountPressableLayout]
	)

	return (
		<RenderPopover
			{...renderPopoverProps}
			children={children}
			id={id}
			onContextMenu={onContextMenu}
			ref={mergedRef}
			shape={shape}
			type={type}
		/>
	)
}
