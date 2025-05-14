import {useEffect, useMemo} from 'react'
import {interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../../hooks'
import {animateListAfterAffordanceTranslateX} from './List-after-affordance.handler'
import type {UseListAfterAffordanceAnimatedOptions} from './List-after-affordance.interface'

export const useListAfterAffordanceAnimated = ({doubleConfirmed}: UseListAfterAffordanceAnimatedOptions) => {
	const translateXSharedValue = useSharedValue(0)
	const theme = useTheme()
	const {spacing} = theme.token
	const animatedTiming = useAnimatedTiming({token: theme.token})
	const dangerTranslateXOutputRanges = useMemo(
		() => [theme.adaptSize(spacing.none), -(theme.adaptSize(spacing.extraSmall * 34) / 2)],
		[spacing.extraSmall, spacing.none, theme]
	)

	const dangerAnimatedStyle = useAnimatedStyle(() => ({
		transform: [
			{
				translateX: interpolate(
					translateXSharedValue.value,
					[0, 1],
					dangerTranslateXOutputRanges
				)
			}
		]
	}))

	const animateListAfterAffordanceTranslateXEffect = useMemo(
		() => animateListAfterAffordanceTranslateX(animatedTiming)(translateXSharedValue),
		[animatedTiming, translateXSharedValue]
	)

	useEffect(() => {
		animateListAfterAffordanceTranslateXEffect(doubleConfirmed)
	}, [doubleConfirmed, animateListAfterAffordanceTranslateXEffect])

	return {dangerAnimatedStyle}
}
