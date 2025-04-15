import {useEffect, useMemo} from 'react'
import {interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../../hooks'
import type {UseListAffordanceButtonAnimatedOptions} from './List-affordance-button.interface'
import {handleListAffordanceButtonAnimatedTiming} from './List-affordance-handle'

export const useListAffordanceButtonAnimated = ({disabled}: UseListAffordanceButtonAnimatedOptions) => {
	const theme = useTheme()
	const {palette, scheme, opacity} = theme.token
	const {hexToRGBA} = palette
	const animatedTiming = useAnimatedTiming({token: theme.token})
	const animatedValue = disabled ? 0 : 1
	const colorSharedValue = useSharedValue(animatedValue)
	const disabledBackgroundColor = hexToRGBA(scheme.onSurface)(opacity.level2)
	const disabledColor = hexToRGBA(scheme.onSurface)(opacity.level5)
	const backgroundColorOutputRanges = [disabledBackgroundColor, hexToRGBA(scheme.primary)(opacity.level0)]
	const colorOutputRanges = [disabledColor, hexToRGBA(scheme.onPrimary)(opacity.level10)]
	const backgroundUnderlayAnimatedStyle = useAnimatedStyle(() => ({
		backgroundColor: interpolateColor(colorSharedValue.value, [0, 1], backgroundColorOutputRanges)
	}))

	const labelTextAnimatedStyle = useAnimatedStyle(() => ({
		color: interpolateColor(colorSharedValue.value, [0, 1], colorOutputRanges)
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
