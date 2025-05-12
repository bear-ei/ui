import type {LayoutChangeEvent, LayoutRectangle} from 'react-native'
import type {Updater} from 'use-immer'
import type {StateEvent} from '../../hooks'
import {EVENT_NAME, type EventName} from '../Common'
import {PROGRESS_TYPE} from './Progress.enum'
import type {HandleProgressStateChangeOptions, ProgressState, ProgressType} from './Progress.interface'

export const handleProgressLayoutChange =
	(type?: ProgressType) => (setState: Updater<ProgressState>) => (layout: LayoutRectangle) => {
		if (type !== PROGRESS_TYPE.LINEAR) {
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
			[EVENT_NAME.LAYOUT]: () => onLayoutChange((event as LayoutChangeEvent).nativeEvent.layout)
		} as Record<EventName, () => void>

		if (eventName) {
			nextEvent[eventName]?.()
		}
	}
