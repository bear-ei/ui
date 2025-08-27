import {hexToRGBA} from '@bearei/element-token'
import {useEffect, useMemo} from 'react'
import {Platform} from 'react-native'
import {cancelAnimation, interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import type {DefaultStyle} from 'react-native-reanimated/lib/typescript/hook/commonTypes'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../hooks'
import {ELEVATION} from './Elevation.enum'
import {animateElevation, getWebBoxShadow} from './Elevation.handler'
import type {UseElevationAnimatedOptions} from './Elevation.interface'

export const useElevationAnimated = ({level = ELEVATION.LEVEL_0}: UseElevationAnimatedOptions) => {
	const shadowSharedValue = useSharedValue<number>(level)
	const theme = useTheme()
	const {elevation} = theme.token
	const animatedTiming = useAnimatedTiming({token: theme.token})
	const animateSharedValueTo = useMemo(() => animatedTiming(), [animatedTiming])
	const inputRanges = useMemo(() => [0, 1, 2, 3, 4, 5], [])
	const shadowOpacityOutputRanges = useMemo(
		() => [
			elevation.level0.shadowOpacity,
			elevation.level1.shadowOpacity,
			elevation.level2.shadowOpacity,
			elevation.level3.shadowOpacity,
			elevation.level4.shadowOpacity,
			elevation.level5.shadowOpacity
		],
		[
			elevation.level0.shadowOpacity,
			elevation.level1.shadowOpacity,
			elevation.level2.shadowOpacity,
			elevation.level3.shadowOpacity,
			elevation.level4.shadowOpacity,
			elevation.level5.shadowOpacity
		]
	)

	const elevationOutputRanges = useMemo(
		() => [
			elevation.level0.elevation,
			elevation.level1.elevation,
			elevation.level2.elevation,
			elevation.level3.elevation,
			elevation.level4.elevation,
			elevation.level5.elevation
		],
		[
			elevation.level0.elevation,
			elevation.level1.elevation,
			elevation.level2.elevation,
			elevation.level3.elevation,
			elevation.level4.elevation,
			elevation.level5.elevation
		]
	)

	const shadowRadiusOutputRanges = useMemo(
		() => [
			theme.adaptSize(elevation.level0.shadowRadius),
			theme.adaptSize(elevation.level1.shadowRadius),
			theme.adaptSize(elevation.level2.shadowRadius),
			theme.adaptSize(elevation.level3.shadowRadius),
			theme.adaptSize(elevation.level4.shadowRadius),
			theme.adaptSize(elevation.level5.shadowRadius)
		],
		[
			elevation.level0.shadowRadius,
			elevation.level1.shadowRadius,
			elevation.level2.shadowRadius,
			elevation.level3.shadowRadius,
			elevation.level4.shadowRadius,
			elevation.level5.shadowRadius,
			theme
		]
	)

	const shadowOffsetXOutputRanges = useMemo(
		() => [
			theme.adaptSize(elevation.level0.shadowOffset.width),
			theme.adaptSize(elevation.level1.shadowOffset.width),
			theme.adaptSize(elevation.level2.shadowOffset.width),
			theme.adaptSize(elevation.level3.shadowOffset.width),
			theme.adaptSize(elevation.level4.shadowOffset.width),
			theme.adaptSize(elevation.level5.shadowOffset.width)
		],
		[
			elevation.level0.shadowOffset.width,
			elevation.level1.shadowOffset.width,
			elevation.level2.shadowOffset.width,
			elevation.level3.shadowOffset.width,
			elevation.level4.shadowOffset.width,
			elevation.level5.shadowOffset.width,
			theme
		]
	)

	const shadowOffsetYOutputRanges = useMemo(
		() => [
			theme.adaptSize(elevation.level0.shadowOffset.height),
			theme.adaptSize(elevation.level1.shadowOffset.height),
			theme.adaptSize(elevation.level2.shadowOffset.height),
			theme.adaptSize(elevation.level3.shadowOffset.height),
			theme.adaptSize(elevation.level4.shadowOffset.height),
			theme.adaptSize(elevation.level5.shadowOffset.height)
		],
		[
			elevation.level0.shadowOffset.height,
			elevation.level1.shadowOffset.height,
			elevation.level2.shadowOffset.height,
			elevation.level3.shadowOffset.height,
			elevation.level4.shadowOffset.height,
			elevation.level5.shadowOffset.height,
			theme
		]
	)

	const shadowAnimatedStyle = useAnimatedStyle(() => {
		const shadowOffsetX = interpolate(shadowSharedValue.value, inputRanges, shadowOffsetXOutputRanges)
		const shadowOffsetY = interpolate(shadowSharedValue.value, inputRanges, shadowOffsetYOutputRanges)
		const shadowOpacity = interpolate(shadowSharedValue.value, inputRanges, shadowOpacityOutputRanges)
		const shadowRadius = interpolate(shadowSharedValue.value, inputRanges, shadowRadiusOutputRanges)
		const shadowColor =
			Platform.OS === 'web' ?
				/** Running in JS thread*/
				hexToRGBA(elevation.shadowColor)(shadowOpacity)
			:	elevation.shadowColor

		return (
			Platform.OS === 'web' ?
				{
					boxShadow: getWebBoxShadow({
						color: elevation.shadowColor,
						offsetX: shadowOffsetX,
						offsetY: shadowOffsetY,
						opacity: shadowOpacity,
						radius: shadowRadius
					})
				}
			:	{
					elevation: interpolate(
						shadowSharedValue.value,
						inputRanges,
						elevationOutputRanges
					),
					shadowColor: shadowColor,
					shadowOffset: {height: shadowOffsetY, width: shadowOffsetX},
					shadowOpacity: shadowOpacity,
					shadowRadius: shadowRadius
				}) as DefaultStyle
	})

	const runAnimate = useMemo(
		() => animateElevation(animateSharedValueTo)(shadowSharedValue),
		[animateSharedValueTo, shadowSharedValue]
	)

	useEffect(() => {
		runAnimate(level)
	}, [runAnimate, level])

	useEffect(() => () => cancelAnimation(shadowSharedValue), [shadowSharedValue])

	return {shadowAnimatedStyle}
}
