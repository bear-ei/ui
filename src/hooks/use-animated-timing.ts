import {Token} from '@bearei/ui-token'
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
import {AnimatedTimingOptions, ProcessAnimatedTimingOptions} from './hooks.interface'

const processAnimatedTiming =
    ({duration = 'medium1', easing = 'standard', repeat, token, ...config}: ProcessAnimatedTimingOptions) =>
    (callback?: AnimationCallback) =>
    (toValue: number) => {
        const {bezier, duration: transitionDuration} = token.processTransition(easing)(duration)
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
                (sharedValue.value = processAnimatedTiming({...options, token})(callback)(toValue)),
        [token]
    )

    return animatedTiming
}
