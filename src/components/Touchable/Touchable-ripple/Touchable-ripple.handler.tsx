import {COMPONENT_STATUS, EVENT_NAME} from '@/constants'
import {HandleStateEventChangeOptions, StateEvent} from '@/hooks'
import type {Updater} from 'use-immer'
import type {
        AnimateTouchableRippleOptions,
        AnimateTouchableRippleSharedValues,
        TouchableRippleProps,
        TouchableRippleState
} from './Touchable-ripple.interface'

export const compareTouchableRippleProps = (prevProps: TouchableRippleProps) => {
        const {indexKey: prevIndexKey} = prevProps

        return (nextProps: TouchableRippleProps) => {
                const {indexKey: nextIndexKey} = nextProps

                return ![prevIndexKey !== nextIndexKey].some(Boolean)
        }
}

export const handleTouchableRippleStateChange =
        ({eventName}: HandleStateEventChangeOptions) =>
        (setState: Updater<TouchableRippleState>) =>
        (_event: StateEvent) =>
                setState(draft => {
                        if (eventName === EVENT_NAME.LAYOUT && draft.status !== COMPONENT_STATUS.SUCCEEDED) {
                                draft.status = COMPONENT_STATUS.SUCCEEDED
                        }
                })

export const animateTouchableRipple = ({animatedTiming, onAnimateFinished}: AnimateTouchableRippleOptions) => {
        const createAnimatedTimingCallback = (callback?: () => void) => (finished?: boolean) => finished && callback?.()
        const createRippleAnimatedTiming =
                ({opacitySharedValue, scaleSharedValue}: AnimateTouchableRippleSharedValues) =>
                (toValue: number) =>
                (callback?: () => void) =>
                        animatedTiming({callback: createAnimatedTimingCallback(callback)})({
                                sharedValue: toValue === 1 ? scaleSharedValue : opacitySharedValue
                        })(toValue)

        return (sharedValues: AnimateTouchableRippleSharedValues) => (index?: string) => {
                const entryAnimatedTiming = createRippleAnimatedTiming(sharedValues)(1)
                const exitAnimatedTiming = createRippleAnimatedTiming(sharedValues)(0)
                const exitAnimatedFinished = () => index && onAnimateFinished?.(index)

                entryAnimatedTiming(() => exitAnimatedTiming(exitAnimatedFinished))
        }
}
