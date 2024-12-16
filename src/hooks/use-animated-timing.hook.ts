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
import {AnimatedTimingOptions, HandleAnimatedTimingOptions, UseAnimatedTimingOptions} from './hooks.interface'

const handleAnimatedTiming = ({
        duration = 'medium1',
        easing = 'standard',
        repeat,
        token,
        ...config
}: HandleAnimatedTimingOptions) => {
        const {bezier, duration: transitionDuration} = token.handleTransition(easing)(duration)

        return (callback?: AnimationCallback) => (toValue: number) => {
                const animation = withTiming(
                        toValue,
                        {
                                duration: transitionDuration,
                                easing: Easing.bezier(bezier.x0, bezier.y0, bezier.x1, bezier.y1),
                                ...config
                        },
                        finished => {
                                'worklet'

                                if (callback) {
                                        runOnJS(callback)(finished)
                                }
                        }
                )

                return repeat !== undefined && typeof repeat === 'number' ? withRepeat(animation, repeat) : animation
        }
}

export const useAnimatedTiming = ({token, disabledAnimated = false}: UseAnimatedTimingOptions) => {
        const animatedTiming = useCallback(
                ({callback, ...options} = {} as AnimatedTimingOptions) =>
                        (sharedValue: SharedValue<AnimatableValue>) =>
                        (toValue: number) => {
                                if (sharedValue.value !== toValue) {
                                        sharedValue.value =
                                                disabledAnimated ? toValue : (
                                                        handleAnimatedTiming({...options, token})(callback)(toValue)
                                                )
                                }
                        },
                [disabledAnimated, token]
        )

        return animatedTiming
}
