import {useEffect, useMemo} from 'react'
import {interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../../hooks'
import {
        HandleTouchableRippleAnimatedTimingOptions,
        HandleTouchableRippleAnimatedTimingSharedValue,
        UseTouchableRippleAnimatedOptions
} from './Touchable-ripple.interface'

const handleTouchableRippleAnimatedTiming = ({
        animatedTiming,
        onAnimatedFinished,
        containerLayout
}: HandleTouchableRippleAnimatedTimingOptions) => {
        const handleAnimatedTimingCallback = (callback?: () => void) => (finished?: boolean) => {
                if (finished) {
                        callback?.()
                }
        }

        const createTouchableRippleAnimatedTiming =
                ({opacitySharedValue, scaleSharedValue}: HandleTouchableRippleAnimatedTimingSharedValue) =>
                (toValue: number) =>
                (callback?: () => void) =>
                        animatedTiming({
                                callback: handleAnimatedTimingCallback(callback),
                                duration: Math.max(300, (containerLayout?.width ?? 300) / 2),
                                easing: 'emphasizedAccelerate'
                        })(toValue === 1 ? scaleSharedValue : opacitySharedValue)(toValue)

        return (sharedValue: HandleTouchableRippleAnimatedTimingSharedValue) => (index: string) => {
                const entryAnimatedTiming = createTouchableRippleAnimatedTiming(sharedValue)(1)
                const exitAnimatedTiming = createTouchableRippleAnimatedTiming(sharedValue)(0)
                const exitAnimatedFinished = () => onAnimatedFinished?.(index)

                entryAnimatedTiming(() => exitAnimatedTiming(exitAnimatedFinished))
        }
}

export const useTouchableRippleAnimated = ({
        containerLayout,
        index,
        onAnimatedFinished,
        radius
}: UseTouchableRippleAnimatedOptions) => {
        const opacitySharedValue = useSharedValue(1)
        const scaleSharedValue = useSharedValue(0)
        const theme = useTheme()
        const animatedTiming = useAnimatedTiming({token: theme.token})
        const containerAnimatedStyle = useAnimatedStyle(() => ({
                opacity: interpolate(opacitySharedValue.value, [0, 1], [0, 1]),
                transform: [
                        {translateX: -radius},
                        {translateY: -radius},
                        {scale: interpolate(scaleSharedValue.value, [0, 1], [0, 1])}
                ]
        }))

        const onTouchableRippleAnimatedTiming = useMemo(
                () =>
                        handleTouchableRippleAnimatedTiming({
                                animatedTiming,
                                containerLayout,
                                onAnimatedFinished
                        })({
                                scaleSharedValue,
                                opacitySharedValue
                        }),
                [animatedTiming, containerLayout, onAnimatedFinished, opacitySharedValue, scaleSharedValue]
        )

        useEffect(() => {
                onTouchableRippleAnimatedTiming(index)
        }, [onTouchableRippleAnimatedTiming, index])

        return {containerAnimatedStyle}
}
