import {forwardRef, useCallback, useEffect, useId, useMemo} from 'react'
import type {LayoutRectangle, View} from 'react-native'
import {useImmer} from 'use-immer'

import {COMPONENT_STATUS, type State} from '../../constants'
import {
	type HandleStateEventChangeOptions,
	type StateEvent,
	useInteractionStateEvent,
	usePendingEvent
} from '../../hooks'

import {LAYOUT_ANIMATED} from './Layout-animated.enum'
import {
	finalizeLayoutAnimatedVisibleChange,
	handleLayoutAnimatedStateChange,
	updateLayoutAnimatedSize,
	updateLayoutAnimatedStatus,
	updateLayoutAnimatedVisible
} from './Layout-animated.handler'
import type {LayoutAnimatedBaseProps, LayoutAnimatedState} from './Layout-animated.interface'
import {RenderLayoutAnimated} from './Layout-animated.render'
import {useLayoutAnimated} from './use-layout-animated.hook'

export const LayoutAnimatedBase = forwardRef<View, LayoutAnimatedBaseProps>(
	(
		{
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
		},
		ref
	) => {
		const [
			{
				layout,
				pendingAnimationFinishedEvent,
				pendingUnmountEvent,
				pendingVisibleEvent,
				status,
				visible: isVisible
			},
			setState
		] = useImmer<LayoutAnimatedState>({
			layout: {} as Partial<LayoutRectangle>,
			status: COMPONENT_STATUS.IDLE,
			visible: visible ?? defaultVisible
		})

		usePendingEvent({func: onVisible, eventKey: 'pendingVisibleEvent', setState, pendingEvent: pendingVisibleEvent})
		usePendingEvent({func: onUnmount, eventKey: 'pendingUnmountEvent', setState, pendingEvent: pendingUnmountEvent})
		usePendingEvent({
			eventKey: 'pendingAnimationFinishedEvent',
			func: rawOnAnimationFinished,
			pendingEvent: pendingAnimationFinishedEvent,
			setState
		})

		const id = useId()
		const contentSize = useMemo(
			() =>
				typeof rawContentSize === 'number' ? {width: rawContentSize, height: rawContentSize} : rawContentSize,
			[rawContentSize]
		)

		const onAnimationFinished = useMemo(
			() =>
				finalizeLayoutAnimatedVisibleChange({
					onAnimationFinished: rawOnAnimationFinished,
					onUnmount,
					unmount
				})(setState),
			[onUnmount, rawOnAnimationFinished, setState, unmount]
		)

		const onLayoutChange = useMemo(() => updateLayoutAnimatedSize(contentSize)(setState), [contentSize, setState])
		const onStateEventChange = useCallback(
			(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
				handleLayoutAnimatedStateChange({...options, onLayoutChange, state})(event),
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

		const runUpdateStatus = useMemo(() => updateLayoutAnimatedStatus(lazy)(setState), [lazy, setState])
		const runUpdateVisible = useMemo(() => updateLayoutAnimatedVisible(onVisible)(setState), [setState, onVisible])
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
				ref={ref}
				visible={isVisible}
			/>
		)
	}
)

LayoutAnimatedBase.displayName = 'LayoutAnimatedBase'
