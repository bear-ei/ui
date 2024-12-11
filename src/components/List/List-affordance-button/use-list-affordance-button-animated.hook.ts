import {useEffect, useMemo} from 'react'
import {InteractionManager} from 'react-native'
import {AnimatableValue, SharedValue, interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {AnimatedTiming, useAnimatedTiming} from '../../../hooks'
import {UseListAffordanceButtonAnimatedOptions} from './List-affordance-button.interface'

const handleListAffordanceButtonAnimatedTiming =
        (animatedTiming: AnimatedTiming) => (colorSharedValue: SharedValue<AnimatableValue>) => (disabled?: boolean) =>
                animatedTiming()(colorSharedValue)(disabled ? 0 : 1)

export const useListAffordanceButtonAnimated = ({disabled}: UseListAffordanceButtonAnimatedOptions) => {
        const theme = useTheme()
        const {palette, scheme} = theme.token
        const {convertHexToRGBA} = palette
        const animatedTiming = useAnimatedTiming(theme.token)
        const animatedValue = disabled ? 0 : 1
        const colorSharedValue = useSharedValue(animatedValue)
        const disabledBackgroundColor = convertHexToRGBA(scheme.onSurface)(0.12)
        const disabledColor = convertHexToRGBA(scheme.onSurface)(0.38)
        const backgroundColorOutputRange = [disabledBackgroundColor, convertHexToRGBA(scheme.primary)(0)]
        const colorOutputRange = [disabledColor, convertHexToRGBA(scheme.onPrimary)(1)]
        const contentUnderlayAnimatedStyle = useAnimatedStyle(() => ({
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
                InteractionManager.runAfterInteractions(() => onListAffordanceButtonAnimatedTiming(disabled))
        }, [animatedTiming, disabled, onListAffordanceButtonAnimatedTiming])

        return {contentUnderlayAnimatedStyle, labelTextAnimatedStyle}
}
