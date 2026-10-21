import {useEffect, useMemo} from 'react'
import type {ViewStyle} from 'react-native'
import {cancelAnimation, interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'

import {COMPONENT_STATUS} from '../../../constants'
import {useAnimatedTiming, useTheme} from '../../../hooks'
import {DENSITY_SIZE} from '../../../theme'
import {platformValue} from '../../../utils'

import {animateListAfterAffordance} from './List-after-affordance.handler'
import type {UseListAfterAffordanceAnimatedOptions} from './List-after-affordance.interface'

export const useListAfterAffordanceAnimated = ({phase, status}: UseListAfterAffordanceAnimatedOptions) => {
	const translateXSharedValue = useSharedValue(0)
	const {token} = useTheme()
	const animatedTiming = useAnimatedTiming()
	const dangerTranslateXOutputRanges = useMemo(
		() => [token.density.spacing[DENSITY_SIZE.NONE], -token.density.control[DENSITY_SIZE.XX_LARGE]],
		[token]
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
		() => animateListAfterAffordance(animatedTiming)(translateXSharedValue),
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
