import {useEffect, useMemo} from 'react'
import {cancelAnimation, interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../../hooks'
import {COMPONENT_STATUS} from '../../Common'
import {animateListAfterAffordance} from './List-after-affordance.handler'
import type {UseListAfterAffordanceAnimatedOptions} from './List-after-affordance.interface'

export const useListAfterAffordanceAnimated = ({doubleConfirmed, status}: UseListAfterAffordanceAnimatedOptions) => {
	const translateXSharedValue = useSharedValue(0)
	const theme = useTheme()
	const {spacing} = theme.token
	const animatedTiming = useAnimatedTiming({token: theme.token})
	const animateSharedValueTo = useMemo(() => animatedTiming(), [animatedTiming])
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
		() => animateListAfterAffordance(animateSharedValueTo)(translateXSharedValue),
		[animateSharedValueTo, translateXSharedValue]
	)

	useEffect(() => {
		if (status === COMPONENT_STATUS.SUCCEEDED) {
			runAnimate(doubleConfirmed)
		}
	}, [runAnimate, doubleConfirmed, status])

	useEffect(() => () => cancelAnimation(translateXSharedValue), [translateXSharedValue])

	return {dangerAnimatedStyle}
}
