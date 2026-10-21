import type {LayoutRectangle} from 'react-native'

import {useCallback, useEffect, useId, useMemo, type FC} from 'react'
import {useImmer} from 'use-immer'

import type {LayoutAnimatedBaseProps, LayoutAnimatedState} from './Layout-animated.interface'

import {COMPONENT_STATUS, type State} from '../../constants'
import {
	useInteractionStateEvent,
	usePendingEvent,
	type HandleStateEventChangeOptions,
	type StateEvent
} from '../../hooks'
import {LAYOUT_ANIMATED} from './Layout-animated.enum'
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
	animatedType = LAYOUT_ANIMATED.FADE,
	contentSize: rawContentSize,
	defaultVisible,
	delay,
	entry,
	exit,
	lazy = false,
	onAnimationFinished: rawOnAnimationFinished,
	onUnmount,
	onVisible,
	opacity,
	outputRanges,
	scale,
	translate,
	unmount,
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

	usePendingEvent(onVisible, setState, {eventKey: 'pendingVisibleEvent', pendingEvent: pendingVisibleEvent})
	usePendingEvent(onUnmount, setState, {eventKey: 'pendingUnmountEvent', pendingEvent: pendingUnmountEvent})
	usePendingEvent(rawOnAnimationFinished, setState, {
		eventKey: 'pendingAnimationFinishedEvent',
		pendingEvent: pendingAnimationFinishedEvent
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
				unmount
			}),
		[onUnmount, rawOnAnimationFinished, setState, unmount]
	)

	const onLayoutChange = useMemo(() => updateLayoutAnimatedSize(setState, contentSize), [contentSize, setState])
	const onStateEventChange = useCallback(
		(event: StateEvent, state: State, options: HandleStateEventChangeOptions) =>
			handleLayoutAnimatedStateChange(event, {...options, onLayoutChange, state}),
		[onLayoutChange]
	)

	const interactionHandlers = useInteractionStateEvent({...renderLayoutAnimatedProps, onStateEventChange})
	const {containerAnimatedStyle} = useLayoutAnimated({
		animatedType,
		delay,
		entry,
		exit,
		height: layout.height ?? contentSize?.height,
		onAnimationFinished,
		opacity,
		outputRanges,
		scale,
		status,
		translate,
		visible: isVisible,
		width: layout.width ?? contentSize?.width
	})

	const runUpdateStatus = useMemo(() => updateLayoutAnimatedStatus(setState, lazy), [lazy, setState])
	const runUpdateVisible = useMemo(() => updateLayoutAnimatedVisible(setState, onVisible), [setState, onVisible])
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

	if (status === COMPONENT_STATUS.IDLE && (lazy || unmount)) {
		return <></>
	}

	return (
		<RenderLayoutAnimated
			{...renderLayoutAnimatedProps}
			animatedType={animatedType}
			containerAnimatedStyle={containerAnimatedStyle}
			id={id}
			interactionHandlers={interactionHandlers}
			visible={isVisible}
		/>
	)
}

LayoutAnimatedBase.displayName = 'LayoutAnimatedBase'
