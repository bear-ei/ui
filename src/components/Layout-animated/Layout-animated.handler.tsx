import type {LayoutChangeEvent} from 'react-native'
import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'

import type {AnimatedTiming, StateEvent} from '../../hooks'
import type {
	AnimateLayoutAnimatedOptions,
	FinalizeLayoutAnimatedVisibleChangeOptions,
	HandleLayoutAnimatedStateChangeOptions,
	LayoutAnimatedState
} from './Layout-animated.interface'

import {COMPONENT_STATUS, EVENT_NAME, type LayoutRectangle, type PartialSize} from '../../constants'
import {EASING} from '../../theme'
import {LAYOUT_ANIMATED} from './Layout-animated.enum'

export const updateLayoutAnimatedSize =
	(setState: Updater<LayoutAnimatedState>, contentSize?: PartialSize) => (layout?: LayoutRectangle) => {
		const {height, width} = contentSize ?? layout ?? {}

		setState(draft => {
			if (draft.status !== COMPONENT_STATUS.SUCCEEDED && (width || height)) {
				draft.status = COMPONENT_STATUS.SUCCEEDED
			}

			if (contentSize) {
				return
			}

			const {height: prevHeight, width: prevWidth} = draft.layout

			if (prevHeight !== height || prevWidth !== width) {
				draft.layout.height = height ?? 0
				draft.layout.width = width ?? 0
			}
		})
	}

export const handleLayoutAnimatedStateChange = (
	event: StateEvent,
	{eventName, onLayoutChange}: HandleLayoutAnimatedStateChangeOptions
) => {
	if (eventName !== EVENT_NAME.LAYOUT) {
		return
	}

	onLayoutChange((event as LayoutChangeEvent).nativeEvent.layout as LayoutRectangle)
}

export const finalizeLayoutAnimatedVisibleChange =
	(
		setState: Updater<LayoutAnimatedState>,
		{onAnimationFinished, onUnmount, unmount}: FinalizeLayoutAnimatedVisibleChangeOptions
	) =>
	(visible?: boolean) =>
		setState(draft => {
			if (unmount && !visible) {
				draft.status = COMPONENT_STATUS.IDLE

				if (onUnmount) {
					draft.pendingUnmountEvent = true
				}
			}

			if (onAnimationFinished) {
				draft.pendingAnimationFinishedEvent = visible
			}
		})

export const updateLayoutAnimatedStatus =
	(setState: Updater<LayoutAnimatedState>, lazy?: boolean) => (visible?: boolean) =>
		setState(draft => {
			if (draft.status === COMPONENT_STATUS.SUCCEEDED) {
				return
			}

			draft.status = lazy && !visible ? COMPONENT_STATUS.IDLE : COMPONENT_STATUS.LOADING
		})

export const updateLayoutAnimatedVisible =
	(setState: Updater<LayoutAnimatedState>, onVisible?: (visible?: boolean) => void) => (visible?: boolean) => {
		if (typeof visible !== 'boolean') {
			return
		}

		setState(draft => {
			if (draft.visible === visible) {
				return
			}

			draft.visible = visible

			if (onVisible) {
				draft.pendingVisibleEvent = visible
			}
		})
	}

export const animateLayoutAnimated = (
	sharedValue: SharedValue<number>,
	animatedTiming: AnimatedTiming,
	{animatedType, entry, exit, onAnimationFinished}: AnimateLayoutAnimatedOptions
) => {
	const entryAnimateSharedValueTo = animatedTiming(sharedValue, {
		easing: EASING.STANDARD_DECELERATE,
		...entry,
		callback: (finished?: boolean) => finished && onAnimationFinished(true)
	})

	const exitAnimateSharedValueTo = animatedTiming(sharedValue, {
		easing: EASING.STANDARD_ACCELERATE,
		...exit,
		callback: (finished?: boolean) => finished && onAnimationFinished(false)
	})

	return (visible?: boolean) => {
		if (animatedType === LAYOUT_ANIMATED.NONE || typeof visible !== 'boolean') {
			return
		}

		if (visible) {
			entryAnimateSharedValueTo(1)

			return
		}

		exitAnimateSharedValueTo(0)
	}
}
