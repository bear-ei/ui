import {useEffect, useMemo} from 'react'
import {cancelAnimation, interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../../hooks'
import {animateListAfterAffordance} from './List-after-affordance.handler'
import type {UseListAfterAffordanceAnimatedOptions} from './List-after-affordance.interface'

export const useListAfterAffordanceAnimated = ({doubleConfirmed}: UseListAfterAffordanceAnimatedOptions) => {
	const translateXSharedValue = useSharedValue(0)
	const theme = useTheme()
	const {spacing} = theme.token
	const animatedTiming = useAnimatedTiming({token: theme.token})
	const createSharedValueAnimator = useMemo(() => animatedTiming(), [animatedTiming])
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

	const runAnimate = useMemo(
		() => animateListAfterAffordance(createSharedValueAnimator)(translateXSharedValue),
		[createSharedValueAnimator, translateXSharedValue]
	)

	useEffect(() => {
		runAnimate(doubleConfirmed)
	}, [runAnimate, doubleConfirmed])

	useEffect(
		() => () => {
			cancelAnimation(translateXSharedValue)
		},
		[translateXSharedValue]
	)

	return {dangerAnimatedStyle}
}
