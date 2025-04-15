import type {WritableDraft} from 'immer'
import type {LayoutChangeEvent, LayoutRectangle} from 'react-native'
import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import type {StateEvent} from '../../hooks'
import type {EventName} from '../Common'
import type {
	HandleLayoutAnimatedFinishedOptions,
	HandleLayoutAnimatedLayoutVisibleOptions,
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

			if (draft.status !== 'succeeded') {
				draft.status = 'succeeded'
			}
		})
	}

export const handleLayoutAnimatedStateChange =
	({eventName, onLayoutChange}: HandleLayoutAnimatedStateChangeOptions) =>
	(event: StateEvent) => {
		const nextEvent = {
			layout: () => onLayoutChange((event as LayoutChangeEvent).nativeEvent.layout)
		} as Record<EventName, () => void>

		if (!eventName) {
			return
		}

		nextEvent[eventName]?.()
	}

export const handleLayoutAnimatedLayoutVisible = ({onVisible, setState}: HandleLayoutAnimatedLayoutVisibleOptions) => {
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
				draft.status = 'idle'
				draft.unmountLayout = true
			}
		})
	}

export const handleLayoutAnimatedStatus =
	({unmount, lazy}: HandleLayoutAnimatedStatusOptions) =>
	(setState: Updater<LayoutAnimatedState>) =>
	(visible?: boolean) =>
		setState(draft => {
			if (draft.status === 'succeeded') {
				return
			}

			if (unmount) {
				draft.unmountLayout = !visible
			}

			draft.status = lazy && !visible ? 'idle' : 'loading'
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
