import {nanoid} from 'nanoid'
import {GestureResponderEvent} from 'react-native'
import {Updater} from 'use-immer'
import {StateEvent} from '../../hooks'
import {EventName} from '../Common'
import {TouchableRipple} from './Touchable-ripple'
import {
        HandleAddTouchableRippleOptions,
        HandleTouchablePressInOptions,
        HandleTouchableRipplesOptions,
        HandleTouchableStateChangeOptions,
        TouchableRippleSequence,
        TouchableState
} from './Touchable.interface'

const handleAddTouchableRipple =
        (setState: Updater<TouchableState>) =>
        ({touchableLocation, contentLayout}: HandleAddTouchableRippleOptions) => {
                const {width, height} = contentLayout

                setState(draft => {
                        draft.contentLayout.height = height
                        draft.contentLayout.width = width
                        draft.rippleSequence[nanoid()] = touchableLocation
                })
        }

const handleTouchablePressIn =
        ({setState, ref}: HandleTouchablePressInOptions) =>
        (enableTouchableRipple?: boolean) =>
        (event: GestureResponderEvent) => {
                const {locationX, locationY} = event.nativeEvent

                if (enableTouchableRipple) {
                        ref?.current?.measure((x, y, width, height) =>
                                handleAddTouchableRipple(setState)({
                                        contentLayout: {width, height, x, y},
                                        touchableLocation: {locationX, locationY}
                                })
                        )
                }
        }

export const handleTouchableStateChange =
        ({eventName, enableTouchableRipple, ref}: HandleTouchableStateChangeOptions) =>
        (setState: Updater<TouchableState>) =>
        (event: StateEvent) => {
                const nextEvent = {
                        pressIn: () =>
                                handleTouchablePressIn({setState, ref})(enableTouchableRipple)(
                                        event as GestureResponderEvent
                                )
                } as Record<EventName, () => void>

                if (eventName) {
                        nextEvent[eventName]?.()
                }
        }

export const handleTouchableAnimatedFinished = (setState: Updater<TouchableState>) => (index: string) =>
        setState(draft => {
                if (draft.rippleSequence[index]) {
                        delete draft.rippleSequence[index]
                }
        })

export const handleTouchableRipples =
        ({centered, containerLayout, ...props}: HandleTouchableRipplesOptions) =>
        (rippleSequence: TouchableRippleSequence) =>
                Object.entries(rippleSequence).map(([indexKey, touchableLocation]) => {
                        const centeredTouchableRipple =
                                typeof centered === 'boolean' ? centered : !touchableLocation?.locationX

                        return (
                                <TouchableRipple
                                        {...props}
                                        centered={centeredTouchableRipple}
                                        containerLayout={containerLayout}
                                        indexKey={indexKey}
                                        key={indexKey}
                                        touchableLocation={touchableLocation}
                                />
                        )
                })
