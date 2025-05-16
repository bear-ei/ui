import {hexToRGBA} from '@bearei/material-token'
import {useEffect, useMemo} from 'react'
import {interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../../hooks'
import {animateListAffordanceButton} from './List-affordance-button.handler'
import type {UseListAffordanceButtonAnimatedOptions} from './List-affordance-button.interface'

export const useListAffordanceButtonAnimated = ({disabled}: UseListAffordanceButtonAnimatedOptions) => {
	const theme = useTheme()
	const {scheme, opacity} = theme.token
	const animatedTiming = useAnimatedTiming({token: theme.token})
	const animatedValue = disabled ? 0 : 1
	const colorSharedValue = useSharedValue(animatedValue)
	const disabledBackgroundColor = hexToRGBA(scheme.onSurface)(opacity.level2)
	const disabledColor = hexToRGBA(scheme.onSurface)(opacity.level5)
	const backgroundColorOutputRanges = useMemo(
		() => [disabledBackgroundColor, hexToRGBA(scheme.primary)(opacity.level0)],
		[disabledBackgroundColor, opacity.level0, scheme.primary]
	)

	const colorOutputRanges = useMemo(
		() => [disabledColor, hexToRGBA(scheme.onPrimary)(opacity.level10)],
		[disabledColor, opacity.level10, scheme.onPrimary]
	)

	const backgroundUnderlayAnimatedStyle = useAnimatedStyle(() => ({
		backgroundColor: interpolateColor(colorSharedValue.value, [0, 1], backgroundColorOutputRanges)
	}))

	const labelTextAnimatedStyle = useAnimatedStyle(() => ({
		color: interpolateColor(colorSharedValue.value, [0, 1], colorOutputRanges)
	}))

	const animateListAffordanceButtonEffect = useMemo(
		() => animateListAffordanceButton(animatedTiming)(colorSharedValue),
		[animatedTiming, colorSharedValue]
	)

	useEffect(() => {
		animateListAffordanceButtonEffect(disabled)
	}, [animateListAffordanceButtonEffect, disabled])

	return {backgroundUnderlayAnimatedStyle, labelTextAnimatedStyle}
}
