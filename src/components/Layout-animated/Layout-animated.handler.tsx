import type {LayoutChangeEvent} from 'react-native'
import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import {COMPONENT_STATUS, EVENT_NAME, type LayoutRectangle, type PartialSize} from '../../constants'
import type {StateEvent} from '../../hooks'
import {EASING} from '../../theme'
import {LAYOUT_ANIMATED} from './Layout-animated.enum'
import type {
	AnimateLayoutAnimatedOptions,
	FinalizeLayoutAnimatedVisibleChangeOptions,
	HandleLayoutAnimatedStateChangeOptions,
	LayoutAnimatedState
} from './Layout-animated.interface'

export const updateLayoutAnimatedSize =
	(contentSize?: PartialSize) => (setState: Updater<LayoutAnimatedState>) => (layout?: LayoutRectangle) => {
		const {height, width} = contentSize ?? layout ?? {}

		setState(draft => {
			if (draft.status !== COMPONENT_STATUS.SUCCEEDED && (width || height)) {
				draft.status = COMPONENT_STATUS.SUCCEEDED
			}

			if (contentSize) {
				return
			}

			const {width: prevWidth, height: prevHeight} = draft.layout

			if (prevHeight !== height || prevWidth !== width) {
				draft.layout.height = height ?? 0
				draft.layout.width = width ?? 0
			}
		})
	}

export const handleLayoutAnimatedStateChange =
	({eventName, onLayoutChange}: HandleLayoutAnimatedStateChangeOptions) =>
	(event: StateEvent) => {
		if (eventName !== EVENT_NAME.LAYOUT) {
			return
		}

		onLayoutChange((event as LayoutChangeEvent).nativeEvent.layout as LayoutRectangle)
	}

export const finalizeLayoutAnimatedVisibleChange =
	({onUnmount, unmount, onAnimationFinished}: FinalizeLayoutAnimatedVisibleChangeOptions) =>
	(setState: Updater<LayoutAnimatedState>) =>
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
	(lazy?: boolean) => (setState: Updater<LayoutAnimatedState>) => (visible?: boolean) =>
		setState(draft => {
			if (draft.status === COMPONENT_STATUS.SUCCEEDED) {
				return
			}

			draft.status = lazy && !visible ? COMPONENT_STATUS.IDLE : COMPONENT_STATUS.LOADING
		})

export const updateLayoutAnimatedVisible =
	(onVisible?: (visible?: boolean) => void) => (setState: Updater<LayoutAnimatedState>) => (visible?: boolean) => {
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

export const animateLayoutAnimated =
	({animatedTiming, animatedType, entry, exit, onAnimationFinished}: AnimateLayoutAnimatedOptions) =>
	(containerSharedValue: SharedValue<number>) => {
		const entryAnimateSharedValueTo = animatedTiming({
			easing: EASING.STANDARD_DECELERATE,
			...entry,
			callback: (finished?: boolean) => finished && onAnimationFinished(true)
		})({sharedValue: containerSharedValue})

		const exitAnimateSharedValueTo = animatedTiming({
			easing: EASING.STANDARD_ACCELERATE,
			...exit,
			callback: (finished?: boolean) => finished && onAnimationFinished(false)
		})({sharedValue: containerSharedValue})

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
