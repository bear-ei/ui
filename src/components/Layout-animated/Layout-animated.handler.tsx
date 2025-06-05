import type {WritableDraft} from 'immer'
import type {LayoutChangeEvent, LayoutRectangle} from 'react-native'
import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import type {StateEvent} from '../../hooks'
import {COMPONENT_STATUS, EVENT_NAME, type EventName} from '../Common'
import type {
	AnimateLayoutAnimatedOptions,
	FinalizeLayoutAnimatedVisibilityChangeOptions,
	HandleLayoutAnimatedStateChangeOptions,
	LayoutAnimatedState,
	UpdateLayoutAnimatedStatusOptions
} from './Layout-animated.interface'

export const updateLayoutAnimatedSize =
	(shouldUpdateLayout?: boolean) => (setState: Updater<LayoutAnimatedState>) => (layout: LayoutRectangle) => {
		const {height, width} = layout

		setState(draft => {
			if (draft.status !== COMPONENT_STATUS.SUCCEEDED) {
				draft.status = COMPONENT_STATUS.SUCCEEDED
			}

			if (!shouldUpdateLayout) {
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
			[EVENT_NAME.LAYOUT]: () => onLayoutChange((event as LayoutChangeEvent).nativeEvent.layout)
		} as Record<EventName, () => void | Promise<void>>

		if (!eventName) {
			return
		}

		nextEvent[eventName]?.()
	}

export const updateLayoutAnimatedVisibility =
	(onVisible?: (visible?: boolean) => void) => (setState: Updater<LayoutAnimatedState>) => {
		const createNextVisibilityEvent = (visible?: boolean) => () => onVisible?.(visible)
		const applyLayoutVisibilityToDraft =
			(visible?: boolean) => (draft: WritableDraft<LayoutAnimatedState>) => {
				if (visible === draft.visible) {
					return
				}

				draft.invisible = !visible
				draft.nextVisibilityEvent = createNextVisibilityEvent(visible)
				draft.visible = visible
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
	({animatedTiming, onAnimationFinished, entry, exit}: AnimateLayoutAnimatedOptions) =>
	(containerSharedValue: SharedValue<number>) =>
	(visible?: boolean) =>
		typeof visible === 'boolean' &&
		animatedTiming({
			...(visible ? entry : exit),
			callback: (finished?: boolean) => finished && onAnimationFinished?.(visible)
		})(containerSharedValue)(visible ? 1 : 0)
