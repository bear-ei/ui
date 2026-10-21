import {
	cloneElement,
	forwardRef,
	isValidElement,
	useCallback,
	useEffect,
	useId,
	useMemo,
	useRef,
	type ComponentPropsWithRef,
	type ReactElement
} from 'react'
import {TextInput, View} from 'react-native'
import {useImmer} from 'use-immer'
import type {State} from '../../constants'
import {
	useInteractionStateEvent,
	useMergeRefs,
	usePendingEvent,
	type HandleStateEventChangeOptions,
	type StateEvent
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
	updatePopoverContextMenuLayout,
	updatePopoverElevation,
	updatePopoverVisible
} from './Popover.handler'
import type {PopoverBaseProps, PopoverState} from './Popover.interface'
import {RenderPopover} from './Popover.render'

export const PopoverBase = forwardRef<View, PopoverBaseProps>(
	(
		{
			children: rawChildren,
			content,
			defaultVisible,
			disabled: isDisabled = false,
			elevation: rawElevation,
			onAnimationFinished: rawOnAnimationFinished,
			onKeyDown,
			onVisible: rawOnVisible,
			popoverContentPosition,
			shape,
			triggerEvent,
			type = POPOVER_TYPE.TOOLTIP,
			visible: rawVisible,
			...renderPopoverProps
		},
		ref
	) => {
		const [
			{
				contextMenuLayout,
				elevation,
				pendingAnimationFinishedEvent,
				pendingUnmountContentEvent,
				pendingUnmountPressableLayoutEvent,
				pendingVisibleEvent,
				pendingEmitContentEvent,
				visible: isVisible
			},
			setState
		] = useImmer<PopoverState>({visible: rawVisible ?? defaultVisible})

		usePendingEvent({
			eventKey: 'pendingAnimationFinishedEvent',
			func: rawOnAnimationFinished,
			pendingEvent: pendingAnimationFinishedEvent,
			setState
		})

		usePendingEvent({
			eventKey: 'pendingVisibleEvent',
			func: rawOnVisible,
			pendingEvent: pendingVisibleEvent,
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
		const onVisible = useMemo(() => {
			const delayedVisible = debounce(updatePopoverVisible({onVisible: rawOnVisible, type})(setState))(
				debounceVisibleDelay
			)

			const immediateVisible = updatePopoverVisible({onVisible: rawOnVisible, type})(setState)
			const func = (visible?: boolean) => (visible ? delayedVisible(visible) : immediateVisible(visible))

			func.cancel = delayedVisible.cancel

			return func
		}, [debounceVisibleDelay, rawOnVisible, setState, type])

		const onElevationAnimationFinished = useMemo(
			() => handleElevationAnimationFinished(rawOnVisible)(setState),
			[rawOnVisible, setState]
		)

		const onUnmountContent = useMemo(() => unmountPopoverContent(id), [id])

		usePendingEvent({
			eventKey: 'pendingUnmountContentEvent',
			func: onUnmountContent,
			pendingEvent: pendingUnmountContentEvent,
			setState
		})

		const onUnmountPressableLayout = useMemo(() => unmountPopoverPressableLayout(id), [id])

		usePendingEvent({
			eventKey: 'pendingUnmountPressableLayoutEvent',
			func: onUnmountPressableLayout,
			pendingEvent: pendingUnmountPressableLayoutEvent,
			setState
		})

		const onContentAnimationFinished = useMemo(
			() =>
				handlePopoverContentAnimationFinished({
					onAnimationFinished: rawOnAnimationFinished,
					onUnmountContent,
					onUnmountPressableLayout,
					type
				})(setState),
			[onUnmountContent, onUnmountPressableLayout, rawOnAnimationFinished, setState, type]
		)

		const onContextMenu = useMemo(
			() => updatePopoverContextMenuLayout(setState)({onVisible, disabled: isDisabled}),
			[isDisabled, onVisible, setState]
		)

		const onEmitContent = useMemo(
			() =>
				emitPopoverContent(id)({
					content,
					elevation,
					onAnimationFinished: onContentAnimationFinished,
					onElevationAnimationFinished,
					onVisible,
					popoverContentPosition,
					shape,
					triggerEvent,
					type
				}),
			[
				content,
				elevation,
				id,
				onContentAnimationFinished,
				onElevationAnimationFinished,
				onVisible,
				popoverContentPosition,
				shape,
				triggerEvent,
				type
			]
		)

		const runEmitContent = onEmitContent

		usePendingEvent({
			eventKey: 'pendingEmitContentEvent',
			func: onEmitContent,
			pendingEvent: pendingEmitContentEvent,
			setState
		})

		const onStateEventChange = useCallback(
			(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
				handlePopoverStateChange(setState)({
					...options,
					childrenRef,
					containerRef,
					onEmitContent,
					onUnmountContent,
					onUnmountPressableLayout,
					onVisible,
					state,
					triggerEvent,
					type
				})(event),
			[onEmitContent, onUnmountContent, onUnmountPressableLayout, onVisible, setState, triggerEvent, type]
		)

		const interactionHandlers = useInteractionStateEvent({
			...renderPopoverProps,
			disabled: isDisabled,
			onStateEventChange
		})

		const runEmitPressableLayout = useMemo(() => emitPopoverPressableLayout(id)(containerRef), [id])
		const runUnmountContent = onUnmountContent
		const runUnmountPressableLayout = onUnmountPressableLayout
		const runUpdateVisible = onVisible
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
				runEmitContent({containerLayout: {x, y, width, height}, visible: isVisible})
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
)

PopoverBase.displayName = 'PopoverBase'
