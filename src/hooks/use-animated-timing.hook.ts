import {Duration, Easing} from '@bearei/material-token'
import {useCallback} from 'react'
import {
        AnimationCallback,
        Easing as ReanimatedEasing,
        runOnJS,
        SharedValue,
        withRepeat,
        withTiming
} from 'react-native-reanimated'
import {AnimatedTimingOptions, HandleAnimatedTimingOptions, UseAnimatedTimingOptions} from './hooks.interface'

const handleAnimatedTiming = ({
        duration = Duration.MEDIUM_1,
        easing = Easing.EMPHASIZED,
        repeat,
        token,
        ...config
}: HandleAnimatedTimingOptions) => {
        const {bezier, duration: transitionDuration} = token.animated(easing)(duration)

        return (callback?: AnimationCallback) => (toValue: number) => {
                const animation = withTiming(
                        toValue,
                        {
                                duration: transitionDuration,
                                easing: ReanimatedEasing.bezier(bezier.x0, bezier.y0, bezier.x1, bezier.y1),
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

export const useAnimatedTiming = ({token}: UseAnimatedTimingOptions) => {
        const animatedTiming = useCallback(
                ({callback, ...options} = {} as AnimatedTimingOptions) =>
                        (sharedValue: SharedValue<number>) =>
                        (toValue: number) => {
                                if (sharedValue.value === toValue) {
                                        return
                                }

                                sharedValue.value = handleAnimatedTiming({...options, token})(callback)(toValue)
                        },
                [token]
        )

        return animatedTiming
}
