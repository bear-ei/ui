import {LayoutChangeEvent, LayoutRectangle} from 'react-native'
import {Updater} from 'use-immer'
import {StateEventType} from '../../hooks'
import {EventName} from '../Common'
import {HandleProgressStateChangeOptions, ProgressState, ProgressType} from './Progress.interface'

export const handleProgressLayoutChange =
        (setState: Updater<ProgressState>) => (type?: ProgressType) => (layout: LayoutRectangle) => {
                if (type !== 'linear') {
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
        (event: StateEventType) => {
                const nextEvent = {
                        layout: () => onLayoutChange((event as LayoutChangeEvent).nativeEvent.layout)
                } as Record<EventName, () => void>

                if (eventName) {
                        nextEvent[eventName]?.()
                }
        }
