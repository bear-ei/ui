import type {LayoutChangeEvent} from 'react-native'
import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'

import type {AnimatedTimingFactory, InteractionEvent} from '../../hooks'
import type {
	AnimateLayoutAnimatedOptions,
	FinalizeLayoutAnimatedVisibleChangeOptions,
	HandleLayoutAnimatedInteractionStateChangeOptions,
	LayoutAnimatedState
} from './Layout-animated.interface'

import {COMPONENT_STATUS, EVENT_NAME, type MeasuredLayoutRectangle, type PartialSize} from '../../constants'
import {EASING} from '../../theme'
import {LAYOUT_ANIMATION} from './Layout-animated.enum'

export const updateLayoutAnimatedSize =
	(setState: Updater<LayoutAnimatedState>, contentSize?: PartialSize) => (layout?: MeasuredLayoutRectangle) => {
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
	event: InteractionEvent,
	{eventName, onLayoutChange}: HandleLayoutAnimatedInteractionStateChangeOptions
) => {
	if (eventName !== EVENT_NAME.LAYOUT) {
		return
	}

	onLayoutChange((event as LayoutChangeEvent).nativeEvent.layout as MeasuredLayoutRectangle)
}

export const finalizeLayoutAnimatedVisibleChange =
	(
		setState: Updater<LayoutAnimatedState>,
		{onAnimationFinished, onUnmount, unmountOnHide}: FinalizeLayoutAnimatedVisibleChangeOptions
	) =>
	(visible?: boolean) =>
		setState(draft => {
			if (unmountOnHide && !visible) {
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
	(setState: Updater<LayoutAnimatedState>, lazyMount?: boolean) => (visible?: boolean) =>
		setState(draft => {
			if (draft.status === COMPONENT_STATUS.SUCCEEDED) {
				return
			}

			draft.status = lazyMount && !visible ? COMPONENT_STATUS.IDLE : COMPONENT_STATUS.LOADING
		})

export const updateLayoutAnimatedVisible =
	(setState: Updater<LayoutAnimatedState>, onVisibleChange?: (visible?: boolean) => void) => (visible?: boolean) => {
		if (typeof visible !== 'boolean') {
			return
		}

		setState(draft => {
			if (draft.visible === visible) {
				return
			}

			draft.visible = visible

			if (onVisibleChange) {
				draft.pendingVisibleEvent = visible
			}
		})
	}

export const animateLayoutAnimated = (
	sharedValue: SharedValue<number>,
	animatedTiming: AnimatedTimingFactory,
	{animation, entry, exit, onAnimationFinished}: AnimateLayoutAnimatedOptions
) => {
	const entryAnimateSharedValueTo = animatedTiming(sharedValue, {
		easing: EASING.STANDARD_DECELERATE,
		...entry,
		onFinish: (finished?: boolean) => finished && onAnimationFinished(true)
	})

	const exitAnimateSharedValueTo = animatedTiming(sharedValue, {
		easing: EASING.STANDARD_ACCELERATE,
		...exit,
		onFinish: (finished?: boolean) => finished && onAnimationFinished(false)
	})

	return (visible?: boolean) => {
		if (animation === LAYOUT_ANIMATION.NONE || typeof visible !== 'boolean') {
			return
		}

		if (visible) {
			entryAnimateSharedValueTo(1)

			return
		}

		exitAnimateSharedValueTo(0)
	}
}
