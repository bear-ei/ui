import {LayoutChangeEvent, LayoutRectangle} from 'react-native'
import {Updater} from 'use-immer'
import {StateEvent} from '../../hooks'
import {EventName} from '../Common'
import {ProgressType} from './Progress.enum'
import {HandleProgressStateChangeOptions, ProgressState} from './Progress.interface'

export const handleProgressLayoutChange =
	(setState: Updater<ProgressState>) => (type?: ProgressType) => (layout: LayoutRectangle) => {
		if (type !== ProgressType.LINEAR) {
			return
		}

		const {width, height} = layout

		setState(draft => {
			const {width: prevWidth, height: prevHeight} = draft.layout

			if (prevWidth !== width || prevHeight !== height) {
				draft.layout.height = height
				draft.layout.width = width
			}
		})
	}

export const handleTouchableStateChange =
	({eventName, onLayoutChange}: HandleProgressStateChangeOptions) =>
	(event: StateEvent) => {
		const nextEvent = {
			layout: () => onLayoutChange((event as LayoutChangeEvent).nativeEvent.layout)
		} as Record<EventName, () => void>

		if (eventName) {
			nextEvent[eventName]?.()
		}
	}
