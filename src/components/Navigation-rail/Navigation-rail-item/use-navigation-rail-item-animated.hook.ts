import type {ViewStyle} from 'react-native'

import {useEffect, useMemo} from 'react'
import {cancelAnimation, interpolate, interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'

import type {UseNavigationRailItemAnimatedOptions} from './Navigation-rail-item.interface'

import {COMPONENT_STATUS} from '../../../constants'
import {useAnimatedTiming, useTheme} from '../../../hooks'
import {DENSITY_SIZE, hexToRGBA} from '../../../theme'
import {platformValue} from '../../../utils'
import {animateNavigationRailItem} from './Navigation-rail-item.handler'

export const useNavigationRailItemAnimated = ({active, status, type}: UseNavigationRailItemAnimatedOptions) => {
	const {token} = useTheme()
	const {density, opacity, scheme} = token
	const animatedTiming = useAnimatedTiming()
	const contentTranslateYSharedValue = useSharedValue(active ? 1 : 0)
	const labelTextSharedValue = useSharedValue(active ? 1 : 0)
	const labelTextColorOutputRanges = useMemo(
		() => [hexToRGBA(scheme.onSurfaceVariant, opacity.level10), hexToRGBA(scheme.onSurface, opacity.level10)],
		[opacity, scheme]
	)

	const contentTranslateYOutputRanges = useMemo(
		() => [density.spacing[DENSITY_SIZE.MEDIUM], density.spacing[DENSITY_SIZE.NONE]],
		[density]
	)

	const labelTextAnimatedStyle = useAnimatedStyle(() => ({
		color: interpolateColor(labelTextSharedValue.value, [0, 1], labelTextColorOutputRanges),
		opacity: interpolate(labelTextSharedValue.value, [0, 1], [0, 1])
	}))

	const contentAnimatedStyle = useAnimatedStyle(
		() =>
			({
				transform: [
					{
						translateY: platformValue(
							interpolate(contentTranslateYSharedValue.value, [0, 1], contentTranslateYOutputRanges)
						)
					}
				]
			}) as ViewStyle
	)

	const runAnimate = useMemo(
		() => animateNavigationRailItem([contentTranslateYSharedValue, labelTextSharedValue], animatedTiming, {type}),
		[animatedTiming, contentTranslateYSharedValue, labelTextSharedValue, type]
	)

	useEffect(() => {
		if (status === COMPONENT_STATUS.SUCCEEDED) {
			runAnimate(active)
		}
	}, [active, runAnimate, status])

	useEffect(
		() => () => {
			cancelAnimation(contentTranslateYSharedValue)
			cancelAnimation(labelTextSharedValue)
		},
		[contentTranslateYSharedValue, labelTextSharedValue]
	)

	return {contentAnimatedStyle, labelTextAnimatedStyle}
}
