import type {ViewStyle} from 'react-native'

import {useEffect, useMemo} from 'react'
import {cancelAnimation, interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'

import type {UseListAfterAffordanceAnimatedOptions} from './List-after-affordance.interface'

import {COMPONENT_STATUS} from '../../../constants'
import {useAnimatedTiming, useTheme} from '../../../hooks'
import {DENSITY_SIZE} from '../../../theme'
import {platformValue} from '../../../utils'
import {animateListAfterAffordance} from './List-after-affordance.handler'

export const useListAfterAffordanceAnimated = ({phase, status}: UseListAfterAffordanceAnimatedOptions) => {
	const translateXSharedValue = useSharedValue(0)
	const {token} = useTheme()
	const {density} = token
	const animatedTiming = useAnimatedTiming()
	const dangerTranslateXOutputRanges = useMemo(
		() => [density.spacing[DENSITY_SIZE.NONE], -density.control[DENSITY_SIZE.XX_LARGE]],
		[density]
	)

	const dangerAnimatedStyle = useAnimatedStyle(
		() =>
			({
				transform: [
					{
						translateX: platformValue(
							interpolate(translateXSharedValue.value, [0, 1], dangerTranslateXOutputRanges)
						)
					}
				]
			}) as ViewStyle
	)

	const runTranslateXAnimate = useMemo(
		() => animateListAfterAffordance(translateXSharedValue, animatedTiming),
		[animatedTiming, translateXSharedValue]
	)

	useEffect(() => {
		if (status === COMPONENT_STATUS.SUCCEEDED) {
			runTranslateXAnimate(phase)
		}
	}, [phase, runTranslateXAnimate, status])

	useEffect(
		() => () => {
			cancelAnimation(translateXSharedValue)
		},
		[translateXSharedValue]
	)

	return {dangerAnimatedStyle}
}
