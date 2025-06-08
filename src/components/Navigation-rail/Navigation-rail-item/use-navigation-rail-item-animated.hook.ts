import {hexToRGBA} from '@bearei/material-token'
import {useEffect, useMemo} from 'react'
import {interpolate, interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../../hooks'
import {animateNavigationRailItem} from './Navigation-rail-item.handler'
import type {UseNavigationRailItemAnimatedOptions} from './Navigation-rail-item.interface'

export const useNavigationRailItemAnimated = ({active, type}: UseNavigationRailItemAnimatedOptions) => {
	const theme = useTheme()
	const {scheme, opacity} = theme.token
	const animatedTiming = useAnimatedTiming({token: theme.token})
	const contentTranslateYSharedValue = useSharedValue(active ? 1 : 0)
	const labelTextSharedValue = useSharedValue(active ? 1 : 0)
	const labelTextColorOutputRanges = useMemo(
		() => [
			hexToRGBA(scheme.onSurfaceVariant)(opacity.level10),
			hexToRGBA(scheme.onSurface)(opacity.level10)
		],
		[opacity.level10, scheme.onSurface, scheme.onSurfaceVariant]
	)

	const contentTranslateYOutputRanges = useMemo(() => [12, theme.adaptSize(theme.token.spacing.none)], [theme])
	const labelTextAnimatedStyle = useAnimatedStyle(() => ({
		color: interpolateColor(labelTextSharedValue.value, [0, 1], labelTextColorOutputRanges),
		opacity: interpolate(labelTextSharedValue.value, [0, 1], [0, 1])
	}))

	const contentAnimatedStyle = useAnimatedStyle(() => ({
		transform: [
			{
				translateY: interpolate(
					contentTranslateYSharedValue.value,
					[0, 1],
					contentTranslateYOutputRanges
				)
			}
		]
	}))

	const runAnimate = useMemo(
		() =>
			animateNavigationRailItem({animatedTiming, type})({
				contentTranslateYSharedValue,
				labelTextSharedValue
			}),
		[animatedTiming, contentTranslateYSharedValue, labelTextSharedValue, type]
	)

	useEffect(() => {
		runAnimate(active)
	}, [active, runAnimate])

	return {labelTextAnimatedStyle, contentAnimatedStyle}
}
