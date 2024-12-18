import {nanoid} from 'nanoid'
import {forwardRef, useId, useImperativeHandle, useMemo, useRef} from 'react'
import {GestureResponderEvent, LayoutChangeEvent, LayoutRectangle, NativeTouchEvent, View} from 'react-native'
import {Updater, useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../hooks'
import {debounce} from '../../utils'
import {EventName, State} from '../Common'
import {TouchableRipple} from './Touchable-ripple'
import {
        HandleTouchablePressInOptions,
        HandleTouchableStateChangeOptions,
        RenderTouchableRipplesOptions,
        TouchableBaseProps,
        TouchableRippleSequence,
        TouchableState
} from './Touchable.interface'

const handleTouchableContentLayoutChanged = (setState: Updater<TouchableState>) => (layout: LayoutRectangle) => {
        const {width, height} = layout

        setState(draft => {
                draft.contentLayout.height = height
                draft.contentLayout.width = width
        })
}

const handleAddTouchableRipple =
        (setState: Updater<TouchableState>) =>
        (touchableLocation?: Pick<NativeTouchEvent, 'locationX' | 'locationY'>) =>
                setState(draft => {
                        draft.rippleSequence[nanoid()] = {touchableLocation}
                })

const handleTouchablePressIn =
        ({setState, ref}: HandleTouchablePressInOptions) =>
        (enableTouchableRipple?: boolean) =>
        (event: GestureResponderEvent) => {
                const {locationX, locationY} = event.nativeEvent

                if (enableTouchableRipple) {
                        handleAddTouchableRipple(setState)({locationX, locationY})
                }

                ref?.current?.focus()
        }

const handleTouchableStateChange =
        ({eventName, enableTouchableRipple, ref, onLayoutChanged}: HandleTouchableStateChangeOptions) =>
        (setState: Updater<TouchableState>) =>
        (event: StateEvent) => {
                const nextEvent = {
                        layout: () => onLayoutChanged((event as LayoutChangeEvent).nativeEvent.layout),
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
                containerLayout?.width ?
                        Object.entries(rippleSequence).map(([index, {touchableLocation}]) => {
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
                :       undefined

export const TouchableBase = forwardRef<View, TouchableBaseProps>(
        ({centered, disabled, render, underlayColor, enableTouchableRipple = true, ...renderProps}, ref) => {
                const [{rippleSequence, contentLayout}, setState] = useImmer<TouchableState>({
                        contentLayout: {} as LayoutRectangle,
                        rippleSequence: {} as TouchableRippleSequence
                })

                const touchableRef = useRef<View>(null)
                const id = useId()
                const onTouchableLayoutChanged = useMemo(
                        () => debounce(handleTouchableContentLayoutChanged(setState))(50),
                        [setState]
                )

                const onTouchableAnimatedFinished = useMemo(() => handleTouchableAnimatedFinished(setState), [setState])
                const onStateEventChange =
                        (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
                                handleTouchableStateChange({
                                        ...options,
                                        enableTouchableRipple,
                                        onLayoutChanged: onTouchableLayoutChanged,
                                        ref: touchableRef,
                                        state
                                })(setState)(event)

                const onStateEvent = useOnStateEvent({
                        ...renderProps,
                        disabled,
                        onStateEventChange
                })

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
