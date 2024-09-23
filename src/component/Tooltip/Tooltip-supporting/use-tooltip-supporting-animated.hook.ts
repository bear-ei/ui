import {useEffect, useMemo} from 'react'
import {
    AnimatableValue,
    Extrapolation,
    SharedValue,
    interpolate,
    useAnimatedStyle,
    useSharedValue
} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../../hook'
import {
    ProcessTooltipSupportingAnimatedTimingOptions,
    UseTooltipSupportingAnimatedOptions
} from './Tooltip-supporting.interface'

const handleTooltipSupportingAnimatedTiming =
    ({animatedTiming, onClose}: ProcessTooltipSupportingAnimatedTimingOptions) =>
    (transformSharedValue: SharedValue<AnimatableValue>) =>
    (visible?: boolean) =>
        typeof visible === 'boolean' &&
        animatedTiming({
            duration: visible ? 'medium0' : 'short3',
            easing: visible ? 'standardDecelerate' : 'standardAccelerate',
            callback: (finished?: boolean) => finished && !visible && onClose?.(true)
        })(transformSharedValue)(visible ? 1 : 0)

export const useTooltipSupportingAnimated = ({visible, onClose}: UseTooltipSupportingAnimatedOptions) => {
    const transformSharedValue = useSharedValue(visible ? 1 : 0)
    const theme = useTheme()
    const animatedTiming = useAnimatedTiming(theme.token)
    const animatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(transformSharedValue.value, [0, 1], [0, 1], Extrapolation.CLAMP),
        transform: [{scale: interpolate(transformSharedValue.value, [0, 1], [0.8, 1], Extrapolation.CLAMP)}]
    }))

    const onTooltipSupportingAnimatedTiming = useMemo(
        () => handleTooltipSupportingAnimatedTiming({animatedTiming, onClose})(transformSharedValue),
        [animatedTiming, onClose, transformSharedValue]
    )

    useEffect(() => {
        onTooltipSupportingAnimatedTiming(visible)
    }, [onTooltipSupportingAnimatedTiming, visible])

    return animatedStyle
}
