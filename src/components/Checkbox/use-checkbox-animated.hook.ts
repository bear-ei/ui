import {useEffect, useMemo} from 'react'
import {interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../hooks'
import {handleCheckboxIconAnimatedTiming} from './Checkbox-handle'
import {UseCheckboxAnimatedOptions} from './Checkbox.interface'

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
                onCheckboxIconAnimatedTiming(active)
        }, [active, onCheckboxIconAnimatedTiming])

        return {iconAnimatedStyle}
}
