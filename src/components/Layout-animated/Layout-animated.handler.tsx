import type {WritableDraft} from 'immer'
import type {LayoutChangeEvent} from 'react-native'
import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import type {StateEvent} from '../../hooks'
import {COMPONENT_STATUS, EVENT_NAME, type EventName, type LayoutRectangle} from '../Common'
import {LAYOUT_ANIMATED} from './Layout-animated.enum'
import type {
	AnimateLayoutAnimatedOptions,
	ContentSize,
	FinalizeLayoutAnimatedVisibilityChangeOptions,
	HandleLayoutAnimatedStateChangeOptions,
	LayoutAnimatedState,
	UpdateLayoutAnimatedStatusOptions,
	UpdateLayoutAnimatedVisibilityOptions
} from './Layout-animated.interface'

export const updateLayoutAnimatedSize =
	(contentSize?: ContentSize) => (setState: Updater<LayoutAnimatedState>) => (layout: LayoutRectangle) => {
		const {height, width} = layout

		setState(draft => {
			if (draft.status !== COMPONENT_STATUS.SUCCEEDED) {
				draft.status = COMPONENT_STATUS.SUCCEEDED
			}

			if (contentSize) {
				return
			}

			const {width: prevWidth, height: prevHeight} = draft.layout

			if (prevHeight !== height || prevWidth !== width) {
				draft.layout.height = height
				draft.layout.width = width
			}
		})
	}

export const handleLayoutAnimatedStateChange =
	({eventName, onLayoutChange}: HandleLayoutAnimatedStateChangeOptions) =>
	(event: StateEvent) => {
		const nextEvent = {
			[EVENT_NAME.LAYOUT]: () =>
				onLayoutChange((event as LayoutChangeEvent).nativeEvent.layout as LayoutRectangle)
		} as Record<EventName, () => void | Promise<void>>

		if (!eventName) {
			return
		}

		nextEvent[eventName]?.()
	}

export const updateLayoutAnimatedVisibility =
	({onVisibility, animatedType}: UpdateLayoutAnimatedVisibilityOptions) =>
	(setState: Updater<LayoutAnimatedState>) => {
		const createNextVisibilityEvent = (visible?: boolean) => () => onVisibility?.(visible)
		const applyLayoutVisibilityToDraft =
			(visible?: boolean) => (draft: WritableDraft<LayoutAnimatedState>) => {
				if (visible === draft.visible) {
					return
				}

				draft.nextVisibilityEvent = createNextVisibilityEvent(visible)
				draft.visible = visible

				if (animatedType === LAYOUT_ANIMATED.STANDARD) {
					draft.invisible = !visible

					return
				}

				if (visible) {
					draft.invisible = false
				}
			}

		return (visible?: boolean) => setState(applyLayoutVisibilityToDraft(visible))
	}

export const finalizeLayoutAnimatedVisibilityChange =
	({onUnmount, unmount}: FinalizeLayoutAnimatedVisibilityChangeOptions) =>
	(setState: Updater<LayoutAnimatedState>) =>
	(visible?: boolean) => {
		const nextUnmountEvent = () => onUnmount?.()

		setState(draft => {
			draft.invisible = !visible

			if (unmount && !visible) {
				draft.nextUnmountEvent = nextUnmountEvent
				draft.status = COMPONENT_STATUS.IDLE
				draft.unmountLayout = true
			}
		})
	}

export const updateLayoutAnimatedStatus =
	({unmount, lazy}: UpdateLayoutAnimatedStatusOptions) =>
	(setState: Updater<LayoutAnimatedState>) =>
	(visible?: boolean) =>
		setState(draft => {
			if (draft.status === COMPONENT_STATUS.SUCCEEDED) {
				return
			}

			if (unmount) {
				draft.unmountLayout = !visible
			}

			draft.status = lazy && !visible ? COMPONENT_STATUS.IDLE : COMPONENT_STATUS.LOADING
		})

export const animateLayoutAnimated =
	({createEntrySharedValueAnimator, createExitSharedValueAnimator, animatedType}: AnimateLayoutAnimatedOptions) =>
	(containerSharedValue: SharedValue<number>) =>
	(visible?: boolean) => {
		if (animatedType === LAYOUT_ANIMATED.STANDARD) {
			return
		}

		if (typeof visible === 'boolean' && visible) {
			createEntrySharedValueAnimator({sharedValue: containerSharedValue})(1)

			return
		}

		createExitSharedValueAnimator({sharedValue: containerSharedValue})(0)
	}

export const clearLayoutAnimatedEvent = (setState: Updater<LayoutAnimatedState>) => () =>
	setState(draft => {
		draft.nextUnmountEvent = undefined
		draft.nextVisibilityEvent = undefined
	})
