import {useEffect, useMemo} from 'react'
import {
    AnimatableValue,
    Extrapolation,
    SharedValue,
    cancelAnimation,
    interpolate,
    useAnimatedStyle,
    useSharedValue
} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../hook'
import {ProcessSkeletonAnimatedTimingOptions, UseSkeletonAnimatedOptions} from './Skeleton.interface'

const processSkeletonAnimatedTiming =
    ({animatedTiming, enableAnimated}: ProcessSkeletonAnimatedTimingOptions) =>
    (opacitySharedValue: SharedValue<AnimatableValue>) =>
    (skeletonVisible?: boolean) =>
        enableAnimated && skeletonVisible ?
            animatedTiming({repeat: 0, duration: 2500})(opacitySharedValue)(2)
        :   cancelAnimation(opacitySharedValue)

export const useSkeletonAnimated = ({enableAnimated, skeletonVisible}: UseSkeletonAnimatedOptions) => {
    const opacitySharedValue = useSharedValue(0)
    const theme = useTheme()
    const animatedTiming = useAnimatedTiming(theme.token)
    const animatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(opacitySharedValue.value, [0, 1, 2], [0.24, 1, 0.24], Extrapolation.CLAMP)
    }))

    const onSkeletonAnimatedTiming = useMemo(
        () => processSkeletonAnimatedTiming({animatedTiming, enableAnimated})(opacitySharedValue),
        [animatedTiming, enableAnimated, opacitySharedValue]
    )

    useEffect(() => {
        onSkeletonAnimatedTiming(skeletonVisible)
    }, [skeletonVisible, onSkeletonAnimatedTiming])

    return animatedStyle
}
