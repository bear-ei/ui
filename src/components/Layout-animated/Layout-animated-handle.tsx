import type {WritableDraft} from 'immer'
import type {LayoutChangeEvent, LayoutRectangle} from 'react-native'
import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import type {StateEvent} from '../../hooks'
import {COMPONENT_STATUS, EVENT_NAME, type EventName} from '../Common'
import type {
	HandleLayoutAnimatedFinishedOptions,
	HandleLayoutAnimatedStateChangeOptions,
	HandleLayoutAnimatedStatusOptions,
	HandleLayoutAnimatedTimingOptions,
	LayoutAnimatedState
} from './Layout-animated.interface'

export const handleLayoutAnimatedLayoutChange =
	(setState: Updater<LayoutAnimatedState>) => (layout: LayoutRectangle) => {
		const {height, width} = layout

		setState(draft => {
			const {width: prevWidth, height: prevHeight} = draft.layout

			if (prevHeight !== height || prevWidth !== width) {
				draft.layout.height = height
				draft.layout.width = width
			}

			if (draft.status !== COMPONENT_STATUS.SUCCEEDED) {
				draft.status = COMPONENT_STATUS.SUCCEEDED
			}
		})
	}

export const handleLayoutAnimatedStateChange =
	({eventName, onLayoutChange}: HandleLayoutAnimatedStateChangeOptions) =>
	(event: StateEvent) => {
		const nextEvent = {
			[EVENT_NAME.LAYOUT]: () => onLayoutChange((event as LayoutChangeEvent).nativeEvent.layout)
		} as Record<EventName, () => void>

		if (!eventName) {
			return
		}

		nextEvent[eventName]?.()
	}

export const handleLayoutAnimatedLayoutVisible =
	(onVisible?: (visible?: boolean) => void) => (setState: Updater<LayoutAnimatedState>) => {
		const handleNextVisibleEvent = (visible?: boolean) => () => onVisible?.(visible)
		const handleDraftChange = (visible?: boolean) => (draft: WritableDraft<LayoutAnimatedState>) => {
			if (visible === draft.visible) {
				return
			}

			draft.invisible = !visible
			draft.visible = visible
			draft.nextVisibleEvent = handleNextVisibleEvent(visible)
		}

		return (visible?: boolean) => setState(handleDraftChange(visible))
	}

export const handleLayoutAnimatedFinished =
	({onUnmount, unmount}: HandleLayoutAnimatedFinishedOptions) =>
	(setState: Updater<LayoutAnimatedState>) =>
	(visible?: boolean) => {
		setState(draft => {
			draft.invisible = !visible

			if (unmount && !visible) {
				draft.nextUnmountEvent = onUnmount
				draft.status = COMPONENT_STATUS.IDLE
				draft.unmountLayout = true
			}
		})
	}

export const handleLayoutAnimatedStatus =
	({unmount, lazy}: HandleLayoutAnimatedStatusOptions) =>
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

export const handleLayoutAnimatedTiming =
	({animatedTiming, onAnimatedFinished, entry, exit}: HandleLayoutAnimatedTimingOptions) =>
	(containerSharedValue: SharedValue<number>) =>
	(visible?: boolean) =>
		typeof visible === 'boolean' &&
		animatedTiming({
			...(visible ? entry : exit),
			callback: (finished?: boolean) => finished && onAnimatedFinished?.(visible)
		})(containerSharedValue)(visible ? 1 : 0)
