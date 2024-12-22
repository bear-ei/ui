import {useEffect, useMemo} from 'react'
import {SharedValue, cancelAnimation, interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../hooks'
import {HandleSkeletonAnimatedTimingOptions, UseSkeletonAnimatedOptions} from './Skeleton.interface'

const handleSkeletonAnimatedTiming =
        ({animatedTiming, enableAnimated}: HandleSkeletonAnimatedTimingOptions) =>
        (opacitySharedValue: SharedValue<number>) =>
        (skeletonVisible?: boolean) => {
                if (enableAnimated && skeletonVisible) {
                        animatedTiming({repeat: 0, duration: 2500})(opacitySharedValue)(2)
                } else {
                        cancelAnimation(opacitySharedValue)
                }
        }

export const useSkeletonAnimated = ({enableAnimated, skeletonVisible}: UseSkeletonAnimatedOptions) => {
        const opacitySharedValue = useSharedValue(0)
        const theme = useTheme()
        const animatedTiming = useAnimatedTiming({token: theme.token})
        const containerAnimatedStyle = useAnimatedStyle(() => ({
                opacity: interpolate(
                        opacitySharedValue.value,
                        [0, 1, 2],
                        [theme.token.opacity.level4, theme.token.opacity.level10, theme.token.opacity.level4]
                )
        }))

        const onSkeletonAnimatedTiming = useMemo(
                () => handleSkeletonAnimatedTiming({animatedTiming, enableAnimated})(opacitySharedValue),
                [animatedTiming, enableAnimated, opacitySharedValue]
        )

        useEffect(() => {
                onSkeletonAnimatedTiming(skeletonVisible)
        }, [skeletonVisible, onSkeletonAnimatedTiming])

        return {containerAnimatedStyle}
}
