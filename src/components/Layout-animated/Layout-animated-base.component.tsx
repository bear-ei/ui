import type {LayoutRectangle} from 'react-native'

import {useCallback, useEffect, useId, useMemo, type FC} from 'react'
import {useImmer} from 'use-immer'

import type {LayoutAnimatedBaseProps, LayoutAnimatedState} from './Layout-animated.interface'

import {COMPONENT_STATUS, type InteractionState} from '../../constants'
import {
	useInteractionStateEvent,
	usePendingEvent,
	type HandleInteractionStateChangeOptions,
	type InteractionEvent
} from '../../hooks'
import {LAYOUT_ANIMATION} from './Layout-animated.enum'
import {
	finalizeLayoutAnimatedVisibleChange,
	handleLayoutAnimatedStateChange,
	updateLayoutAnimatedSize,
	updateLayoutAnimatedStatus,
	updateLayoutAnimatedVisible
} from './Layout-animated.handler'
import {RenderLayoutAnimated} from './Layout-animated.render'
import {useLayoutAnimated} from './use-layout-animated.hook'

export const LayoutAnimatedBase: FC<LayoutAnimatedBaseProps> = ({
	animation = LAYOUT_ANIMATION.FADE,
	contentSize: rawContentSize,
	debounceDelay,
	defaultVisible,
	entry,
	exit,
	lazyMount = false,
	onAnimationFinished: rawOnAnimationFinished,
	onUnmount,
	onVisibleChange,
	opacity,
	outputRanges,
	scaleOnCollapse,
	translateOnCollapse,
	unmountOnHide,
	visible,
	...renderLayoutAnimatedProps
}) => {
	const [
		{layout, pendingAnimationFinishedEvent, pendingUnmountEvent, pendingVisibleEvent, status, visible: isVisible},
		setState
	] = useImmer<LayoutAnimatedState>({
		layout: {} as Partial<LayoutRectangle>,
		status: COMPONENT_STATUS.IDLE,
		visible: visible ?? defaultVisible
	})

	usePendingEvent('pendingVisibleEvent', onVisibleChange, {pendingEvent: pendingVisibleEvent, setState})
	usePendingEvent('pendingUnmountEvent', onUnmount, {pendingEvent: pendingUnmountEvent, setState})
	usePendingEvent('pendingAnimationFinishedEvent', rawOnAnimationFinished, {
		pendingEvent: pendingAnimationFinishedEvent,
		setState
	})

	const id = useId()
	const contentSize = useMemo(
		() => (typeof rawContentSize === 'number' ? {height: rawContentSize, width: rawContentSize} : rawContentSize),
		[rawContentSize]
	)

	const onAnimationFinished = useMemo(
		() =>
			finalizeLayoutAnimatedVisibleChange(setState, {
				onAnimationFinished: rawOnAnimationFinished,
				onUnmount,
				unmountOnHide
			}),
		[onUnmount, rawOnAnimationFinished, setState, unmountOnHide]
	)

	const onLayoutChange = useMemo(() => updateLayoutAnimatedSize(setState, contentSize), [contentSize, setState])
	const onInteractionStateChange = useCallback(
		(event: InteractionEvent, interactionState: InteractionState, options: HandleInteractionStateChangeOptions) =>
			handleLayoutAnimatedStateChange(event, {...options, interactionState, onLayoutChange}),
		[onLayoutChange]
	)

	const interactionHandlers = useInteractionStateEvent({...renderLayoutAnimatedProps, onInteractionStateChange})
	const {containerAnimatedStyle} = useLayoutAnimated({
		animation,
		debounceDelay,
		entry,
		exit,
		height: layout.height ?? contentSize?.height,
		onAnimationFinished,
		opacity,
		outputRanges,
		scaleOnCollapse,
		status,
		translateOnCollapse,
		visible: isVisible,
		width: layout.width ?? contentSize?.width
	})

	const runUpdateStatus = useMemo(() => updateLayoutAnimatedStatus(setState, lazyMount), [lazyMount, setState])
	const runUpdateVisible = useMemo(
		() => updateLayoutAnimatedVisible(setState, onVisibleChange),
		[setState, onVisibleChange]
	)

	const runLayoutChange = onLayoutChange

	useEffect(() => {
		if (contentSize) {
			runLayoutChange()
		}
	}, [contentSize, runLayoutChange])

	useEffect(() => {
		runUpdateVisible(visible)
	}, [visible, runUpdateVisible])

	useEffect(() => {
		runUpdateStatus(visible)
	}, [visible, runUpdateStatus])

	if (status === COMPONENT_STATUS.IDLE && (lazyMount || unmountOnHide)) {
		return <></>
	}

	return (
		<RenderLayoutAnimated
			{...renderLayoutAnimatedProps}
			animation={animation}
			containerAnimatedStyle={containerAnimatedStyle}
			id={id}
			interactionHandlers={interactionHandlers}
			visible={isVisible}
		/>
	)
}
