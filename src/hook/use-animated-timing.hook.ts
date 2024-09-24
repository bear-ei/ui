import {Token} from '@bearei/material-token'
import {useCallback} from 'react'
import {
    AnimatableValue,
    AnimationCallback,
    Easing,
    SharedValue,
    runOnJS,
    withRepeat,
    withTiming
} from 'react-native-reanimated'
import {AnimatedTimingOptions, HandleAnimatedTimingOptions} from './hook.interface'

const handleAnimatedTiming =
    ({duration = 'medium1', easing = 'standard', repeat, token, ...config}: HandleAnimatedTimingOptions) =>
    (callback?: AnimationCallback) =>
    (toValue: number) => {
        const {bezier, duration: transitionDuration} = token.handleTransition(easing)(duration)
        const animation = withTiming(
            toValue,
            {
                duration: transitionDuration,
                easing: Easing.bezier(bezier.x0, bezier.y0, bezier.x1, bezier.y1),
                ...config
            },
            finished => {
                'worklet'
                callback && runOnJS(callback)(finished)
            }
        )

        return repeat !== undefined && typeof repeat === 'number' ? withRepeat(animation, repeat) : animation
    }

export const useAnimatedTiming = (token: Token) => {
    const animatedTiming = useCallback(
        ({callback, ...options} = {} as AnimatedTimingOptions) =>
            (sharedValue: SharedValue<AnimatableValue>) =>
            (toValue: number) =>
                sharedValue.value !== toValue &&
                (sharedValue.value = handleAnimatedTiming({...options, token})(callback)(toValue)),
        [token]
    )

    return animatedTiming
}
