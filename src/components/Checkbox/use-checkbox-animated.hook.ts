import {useEffect, useMemo} from 'react'
import {
    AnimatableValue,
    SharedValue,
    interpolate,
    useAnimatedStyle,
    useSharedValue
} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {AnimatedTiming, useAnimatedTiming} from '../../hooks'
import {UseCheckboxAnimatedOptions} from './Checkbox.interface'

const handleCheckboxIconAnimated =
    (animatedTiming: AnimatedTiming) =>
    (iconScaleSharedValue: SharedValue<AnimatableValue>) =>
    (value?: boolean) => {
        const toValue = value ? 1 : 0

        if (typeof value === 'boolean') {
            animatedTiming({
                duration: toValue === 1 ? 'short2' : 'short1'
            })(iconScaleSharedValue)(toValue)
        }
    }

export const useCheckboxAnimated = ({active}: UseCheckboxAnimatedOptions) => {
    const iconScaleSharedValue = useSharedValue(active ? 1 : 0)
    const theme = useTheme()
    const animatedTiming = useAnimatedTiming(theme.token)
    const iconAnimatedStyle = useAnimatedStyle(() => ({
        transform: [
            {scale: interpolate(iconScaleSharedValue.value, [0, 1], [0, 1])}
        ]
    }))

    const onCheckboxIconAnimated = useMemo(
        () => handleCheckboxIconAnimated(animatedTiming)(iconScaleSharedValue),
        [animatedTiming, iconScaleSharedValue]
    )

    useEffect(() => {
        onCheckboxIconAnimated(active)
    }, [active, onCheckboxIconAnimated])

    return {iconAnimatedStyle}
}
