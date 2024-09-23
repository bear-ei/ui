import {useEffect, useMemo} from 'react'
import {Extrapolation, interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../../hook'
import {
    ProcessTouchableRippleAnimatedTimingOptions,
    ProcessTouchableRippleAnimatedTimingSharedValue,
    UseTouchableRippleAnimatedOptions
} from './Touchable-ripple.interface'

const handleAnimatedTimingCallback = (callback?: () => void) => (finished?: boolean) => finished && callback?.()
const handleTouchableRippleAnimatedTiming =
    ({animatedTiming, onAnimatedFinished}: ProcessTouchableRippleAnimatedTimingOptions) =>
    (sharedValue: ProcessTouchableRippleAnimatedTimingSharedValue) => {
        const createTouchableRippleAnimatedTiming =
            ({scaleSharedValue, opacitySharedValue}: ProcessTouchableRippleAnimatedTimingSharedValue) =>
            (toValue: number) =>
            (callback?: () => void) =>
                animatedTiming({
                    callback: handleAnimatedTimingCallback(callback),
                    duration: 'short3',
                    easing: 'emphasizedAccelerate'
                })(toValue === 1 ? scaleSharedValue : opacitySharedValue)(toValue)

        return (index: string) => {
            const entryAnimatedTiming = createTouchableRippleAnimatedTiming(sharedValue)(1)
            const exitAnimatedTiming = createTouchableRippleAnimatedTiming(sharedValue)(0)
            const exitAnimatedFinished = () => onAnimatedFinished?.(index)

            entryAnimatedTiming(() => exitAnimatedTiming(exitAnimatedFinished))
        }
    }

export const useTouchableRippleAnimated = ({radius, index, onAnimatedFinished}: UseTouchableRippleAnimatedOptions) => {
    const opacitySharedValue = useSharedValue(1)
    const scaleSharedValue = useSharedValue(0)
    const theme = useTheme()
    const animatedTiming = useAnimatedTiming(theme.token)
    const animatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(opacitySharedValue.value, [0, 1], [0, 1], Extrapolation.CLAMP),
        transform: [
            {translateX: -radius},
            {translateY: -radius},
            {scale: interpolate(scaleSharedValue.value, [0, 1], [0, 1], Extrapolation.CLAMP)}
        ]
    }))

    const onTouchableRippleAnimatedTiming = useMemo(
        () =>
            handleTouchableRippleAnimatedTiming({animatedTiming, onAnimatedFinished})({
                scaleSharedValue,
                opacitySharedValue
            }),
        [animatedTiming, onAnimatedFinished, opacitySharedValue, scaleSharedValue]
    )

    useEffect(() => {
        onTouchableRippleAnimatedTiming(index)
    }, [onTouchableRippleAnimatedTiming, index])

    return animatedStyle
}
