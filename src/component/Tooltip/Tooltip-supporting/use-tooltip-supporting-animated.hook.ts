import {useEffect, useMemo} from 'react'
import {AnimatableValue, SharedValue, interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../../hook'
import {
    HandleTooltipSupportingAnimatedTimingOptions,
    UseTooltipSupportingAnimatedOptions
} from './Tooltip-supporting.interface'

const handleTooltipSupportingAnimatedTiming =
    ({animatedTiming, onClose}: HandleTooltipSupportingAnimatedTimingOptions) =>
    (transformSharedValue: SharedValue<AnimatableValue>) =>
    (visible?: boolean) => {
        if (typeof visible === 'boolean') {
            animatedTiming({
                duration: visible ? 'medium0' : 'short3',
                easing: visible ? 'standardDecelerate' : 'standardAccelerate',
                callback: (finished?: boolean) => {
                    if (finished && !visible) {
                        onClose?.(true)
                    }
                }
            })(transformSharedValue)(visible ? 1 : 0)
        }
    }

export const useTooltipSupportingAnimated = ({visible, onClose}: UseTooltipSupportingAnimatedOptions) => {
    const transformSharedValue = useSharedValue(visible ? 1 : 0)
    const theme = useTheme()
    const animatedTiming = useAnimatedTiming(theme.token)
    const contentAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(transformSharedValue.value, [0, 1], [0, 1]),
        transform: [{scale: interpolate(transformSharedValue.value, [0, 1], [0.8, 1])}]
    }))

    const onTooltipSupportingAnimatedTiming = useMemo(
        () => handleTooltipSupportingAnimatedTiming({animatedTiming, onClose})(transformSharedValue),
        [animatedTiming, onClose, transformSharedValue]
    )

    useEffect(() => {
        onTooltipSupportingAnimatedTiming(visible)
    }, [onTooltipSupportingAnimatedTiming, visible])

    return {contentAnimatedStyle}
}
