import {EVENT_NAME, EventName} from '@/constants'
import {StateEvent} from '@/hooks'
import type {GestureResponderEvent} from 'react-native'
import type {Updater} from 'use-immer'
import type {AddTouchableRippleOptions, HandleTouchableStateChangeOptions, TouchableState} from './Touchable.interface'

export const handleTouchableStateChange =
        ({eventName, enableTouchableRipple, ref}: HandleTouchableStateChangeOptions) =>
        (setState: Updater<TouchableState>) => {
                const addTouchableRipple = ({touchableLocation, contentLayout}: AddTouchableRippleOptions) => {
                        const {width, height} = contentLayout

                        setState(draft => {
                                draft.contentLayout.height = height
                                draft.contentLayout.width = width
                                draft.rippleSequence[Date.now()] = touchableLocation
                        })
                }

                const createTouchablePressInHandler = (event: GestureResponderEvent) => {
                        ref.current?.focus()

                        const {locationX, locationY} = event.nativeEvent

                        if (enableTouchableRipple) {
                                ref?.current?.measure((x, y, width, height) =>
                                        addTouchableRipple({
                                                contentLayout: {width, height, x, y},
                                                touchableLocation: {locationX, locationY}
                                        })
                                )
                        }
                }

                return (event: StateEvent) => {
                        const nextEvent = {
                                [EVENT_NAME.PRESS_IN]: () =>
                                        createTouchablePressInHandler(event as GestureResponderEvent)
                        } as Record<EventName, () => void>

                        if (eventName) {
                                nextEvent[eventName]?.()
                        }
                }
        }

export const deleteTouchableRippleByIndex = (setState: Updater<TouchableState>) => (index?: string) =>
        index &&
        setState(draft => {
                if (draft.rippleSequence[index]) {
                        Reflect.deleteProperty(draft.rippleSequence, index)
                }
        })
