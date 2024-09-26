import React, {forwardRef, useId, useMemo} from 'react'
import {GestureResponderEvent, LayoutChangeEvent, LayoutRectangle, NativeTouchEvent, View} from 'react-native'
import {Updater, useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../hook'
import {generateRandomNumberString} from '../../util'
import {EventName, State} from '../Common'
import {TouchableRipple} from './Touchable-ripple'
import {
    HandleTouchableStateChangeOptions,
    InitialTouchableState,
    RenderTouchableRipplesOptions,
    TouchableBaseProps,
    TouchableRippleSequence
} from './Touchable.interface'

const handleTouchableContentLayout = (setState: Updater<InitialTouchableState>) => (event: LayoutChangeEvent) => {
    const nativeEventLayout = event.nativeEvent.layout

    setState(draft => {
        draft.contentLayout.width = nativeEventLayout.width
        draft.contentLayout.height = nativeEventLayout.height
    })
}

const handleAddTouchableRipple =
    (setState: Updater<InitialTouchableState>) =>
    (touchableLocation?: Pick<NativeTouchEvent, 'locationX' | 'locationY'>) =>
        setState(draft => {
            draft.rippleSequence[`${Date.now()}${generateRandomNumberString(4)}`] = {touchableLocation}
        })

const handleTouchablePressIn =
    (setState: Updater<InitialTouchableState>) =>
    (enableTouchableRipple?: boolean) =>
    (event: GestureResponderEvent) => {
        const {locationX, locationY} = event.nativeEvent

        enableTouchableRipple && handleAddTouchableRipple(setState)({locationX, locationY})
    }

const handleTouchableStateChange =
    ({eventName, enableTouchableRipple}: HandleTouchableStateChangeOptions) =>
    (setState: Updater<InitialTouchableState>) =>
    (event: StateEvent) => {
        const nextEvent = {
            layout: () => handleTouchableContentLayout(setState)(event as LayoutChangeEvent),
            pressIn: () => handleTouchablePressIn(setState)(enableTouchableRipple)(event as GestureResponderEvent)
        } as Record<EventName, () => void>

        eventName && nextEvent[eventName]?.()
    }

const handleTouchableAnimatedFinished = (setState: Updater<InitialTouchableState>) => (index: string) =>
    setState(draft => {
        draft.rippleSequence[index] && delete draft.rippleSequence[index]
    })

const renderTouchableRipples =
    ({centered, containerLayout, ...props}: RenderTouchableRipplesOptions) =>
    (rippleSequence: TouchableRippleSequence) =>
        containerLayout?.width ?
            Object.entries(rippleSequence).map(([index, {touchableLocation}]) => {
                const centeredTouchableRipple = typeof centered === 'boolean' ? centered : !touchableLocation?.locationX

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
        :   undefined

export const TouchableBase = forwardRef<View, TouchableBaseProps>(
    ({centered, disabled, render, underlayColor, enableTouchableRipple = true, ...renderProps}, ref) => {
        const [{rippleSequence, contentLayout}, setState] = useImmer<InitialTouchableState>({
            contentLayout: {} as LayoutRectangle,
            rippleSequence: {} as TouchableRippleSequence
        })

        const id = useId()
        const onTouchableAnimatedFinished = useMemo(() => handleTouchableAnimatedFinished(setState), [setState])
        const onStateEventChange = (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
            handleTouchableStateChange({...options, state, enableTouchableRipple})(setState)(event)

        const onStateEvent = useOnStateEvent({...renderProps, disabled, onStateEventChange})
        const rippleElements = renderTouchableRipples({
            centered,
            containerLayout: contentLayout,
            onAnimatedFinished: onTouchableAnimatedFinished,
            underlayColor
        })(rippleSequence)

        return render({...renderProps, id, onStateEvent, ref, rippleElements})
    }
)
