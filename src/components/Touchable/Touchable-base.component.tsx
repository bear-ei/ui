import {nanoid} from 'nanoid'
import {forwardRef, useId, useImperativeHandle, useMemo, useRef} from 'react'
import {GestureResponderEvent, LayoutRectangle, View} from 'react-native'
import {Updater, useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../hooks'
import {EventName, State} from '../Common'
import {TouchableRipple} from './Touchable-ripple'
import {
        HandleAddTouchableRippleOptions,
        HandleTouchablePressInOptions,
        HandleTouchableStateChangeOptions,
        RenderTouchableRipplesOptions,
        TouchableBaseProps,
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

const handleTouchableStateChange =
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

const handleTouchableAnimatedFinished = (setState: Updater<TouchableState>) => (index: string) =>
        setState(draft => {
                if (draft.rippleSequence[index]) {
                        delete draft.rippleSequence[index]
                }
        })

const renderTouchableRipples =
        ({centered, containerLayout, ...props}: RenderTouchableRipplesOptions) =>
        (rippleSequence: TouchableRippleSequence) =>
                Object.entries(rippleSequence).map(([index, touchableLocation]) => {
                        const centeredTouchableRipple =
                                typeof centered === 'boolean' ? centered : !touchableLocation?.locationX

                        return (
                                <TouchableRipple
                                        {...props}
                                        centered={centeredTouchableRipple}
                                        containerLayout={containerLayout}
                                        index={index}
                                        key={index}
                                        touchableLocation={touchableLocation}
                                />
                        )
                })

export const TouchableBase = forwardRef<View, TouchableBaseProps>(
        (
                {
                        centered,
                        disabled,

                        enableTouchableRipple = true,
                        render,
                        underlayColor,
                        ...renderProps
                },
                ref
        ) => {
                const [{rippleSequence, contentLayout}, setState] = useImmer<TouchableState>({
                        contentLayout: {} as LayoutRectangle,
                        rippleSequence: {} as TouchableRippleSequence
                })

                const touchableRef = useRef<View>(null)
                const id = useId()
                const onTouchableAnimatedFinished = useMemo(() => handleTouchableAnimatedFinished(setState), [setState])
                const onStateEventChange =
                        (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
                                handleTouchableStateChange({
                                        ...options,
                                        enableTouchableRipple,
                                        ref: touchableRef,
                                        state
                                })(setState)(event)

                const onStateEvent = useOnStateEvent({...renderProps, disabled, onStateEventChange})
                const rippleElements = renderTouchableRipples({
                        centered,
                        containerLayout: contentLayout,
                        onAnimatedFinished: onTouchableAnimatedFinished,
                        underlayColor
                })(rippleSequence)

                useImperativeHandle(ref, () => (touchableRef?.current ? touchableRef?.current : {}) as View, [])

                return render({...renderProps, id, onStateEvent, ref: touchableRef, rippleElements})
        }
)
