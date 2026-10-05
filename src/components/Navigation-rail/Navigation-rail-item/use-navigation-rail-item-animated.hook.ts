import {useEffect, useMemo} from 'react'
import type {ViewStyle} from 'react-native'
import {cancelAnimation, interpolate, interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {COMPONENT_STATUS} from '../../../constants'
import {useAnimatedTiming, useTheme} from '../../../hooks'
import {SIZE} from '../../../theme'
import {hexToRGBA, platformValue} from '../../../utils'
import {animateNavigationRailItem} from './Navigation-rail-item.handler'
import type {UseNavigationRailItemAnimatedOptions} from './Navigation-rail-item.interface'

export const useNavigationRailItemAnimated = ({active, type, status}: UseNavigationRailItemAnimatedOptions) => {
	const {token} = useTheme()
	const {scheme, opacity} = token
	const animatedTiming = useAnimatedTiming({token})
	const animateSharedValueTo = useMemo(() => animatedTiming(), [animatedTiming])
	const contentTranslateYSharedValue = useSharedValue(active ? 1 : 0)
	const labelTextSharedValue = useSharedValue(active ? 1 : 0)
	const labelTextColorOutputRanges = [
		hexToRGBA(scheme.onSurfaceVariant)(opacity.level10),
		hexToRGBA(scheme.onSurface)(opacity.level10)
	]

	const contentTranslateYOutputRanges = [
		token.density.spacing[SIZE.MEDIUM] + -1 * token.density.spacing[SIZE.EXTRA_SMALL],
		token.density.spacing[SIZE.NONE]
	]

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
		() =>
			animateNavigationRailItem({animateSharedValueTo, type})({
				contentTranslateYSharedValue,
				labelTextSharedValue
			}),
		[animateSharedValueTo, contentTranslateYSharedValue, labelTextSharedValue, type]
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

	return {labelTextAnimatedStyle, contentAnimatedStyle}
}
