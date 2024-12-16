import {useEffect, useMemo} from 'react'
import {InteractionManager} from 'react-native'
import {AnimatableValue, SharedValue, interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {AnimatedTiming, useAnimatedTiming} from '../../hooks'
import {UseCheckboxAnimatedOptions} from './Checkbox.interface'

const handleCheckboxIconAnimatedTiming =
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
        const animatedTiming = useAnimatedTiming({token: theme.token})
        const iconAnimatedStyle = useAnimatedStyle(() => ({
                transform: [{scale: interpolate(iconScaleSharedValue.value, [0, 1], [0, 1])}]
        }))

        const onCheckboxIconAnimatedTiming = useMemo(
                () => handleCheckboxIconAnimatedTiming(animatedTiming)(iconScaleSharedValue),
                [animatedTiming, iconScaleSharedValue]
        )

        useEffect(() => {
                InteractionManager.runAfterInteractions(() => onCheckboxIconAnimatedTiming(active))
        }, [active, onCheckboxIconAnimatedTiming])

        return {iconAnimatedStyle}
}
