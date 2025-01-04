import {useEffect, useMemo} from 'react'
import {interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../../hooks'
import {UseListAffordanceButtonAnimatedOptions} from './List-affordance-button.interface'
import {handleListAffordanceButtonAnimatedTiming} from './List-affordance-handle'

export const useListAffordanceButtonAnimated = ({disabled}: UseListAffordanceButtonAnimatedOptions) => {
        const theme = useTheme()
        const {palette, scheme, opacity} = theme.token
        const {convertHexToRGBA} = palette
        const animatedTiming = useAnimatedTiming({token: theme.token})
        const animatedValue = disabled ? 0 : 1
        const colorSharedValue = useSharedValue(animatedValue)
        const disabledBackgroundColor = convertHexToRGBA(scheme.onSurface)(opacity.level2)
        const disabledColor = convertHexToRGBA(scheme.onSurface)(opacity.level5)
        const backgroundColorOutputRange = [disabledBackgroundColor, convertHexToRGBA(scheme.primary)(opacity.level0)]
        const colorOutputRange = [disabledColor, convertHexToRGBA(scheme.onPrimary)(opacity.level10)]
        const backgroundUnderlayAnimatedStyle = useAnimatedStyle(() => ({
                backgroundColor: interpolateColor(colorSharedValue.value, [0, 1], backgroundColorOutputRange)
        }))

        const labelTextAnimatedStyle = useAnimatedStyle(() => ({
                color: interpolateColor(colorSharedValue.value, [0, 1], colorOutputRange)
        }))

        const onListAffordanceButtonAnimatedTiming = useMemo(
                () => handleListAffordanceButtonAnimatedTiming(animatedTiming)(colorSharedValue),
                [animatedTiming, colorSharedValue]
        )

        useEffect(() => {
                onListAffordanceButtonAnimatedTiming(disabled)
        }, [animatedTiming, disabled, onListAffordanceButtonAnimatedTiming])

        return {backgroundUnderlayAnimatedStyle, labelTextAnimatedStyle}
}
