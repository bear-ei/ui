import {useEffect, useMemo} from 'react'
import {Platform} from 'react-native'
import {cancelAnimation, interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useAnimatedTiming, useTheme} from '../../hooks'
import {ELEVATION_VALUE} from './Elevation.enum'
import {animateElevation, getWebBoxShadow} from './Elevation.handler'
import type {UseElevationAnimatedOptions} from './Elevation.interface'
import {COMPONENT_STATUS} from '../../constants'
import {ELEVATION_LEVEL, hexToRGBA} from '../../theme'

const INPUT_RANGES = [0, 1, 2, 3, 4, 5]
export const useElevationAnimated = ({
	level = ELEVATION_VALUE.LEVEL_0,
	onAnimationFinished,
	status
}: UseElevationAnimatedOptions) => {
	const shadowSharedValue = useSharedValue<number>(level)
	const {token} = useTheme()
	const {elevation} = token
	const animatedTiming = useAnimatedTiming({token})
	const shadow = token.scheme.shadow
	const shadowOpacityOutputRanges = [
		elevation[ELEVATION_LEVEL.LEVEL_0].shadowOpacity,
		elevation[ELEVATION_LEVEL.LEVEL_1].shadowOpacity,
		elevation[ELEVATION_LEVEL.LEVEL_2].shadowOpacity,
		elevation[ELEVATION_LEVEL.LEVEL_3].shadowOpacity,
		elevation[ELEVATION_LEVEL.LEVEL_4].shadowOpacity,
		elevation[ELEVATION_LEVEL.LEVEL_5].shadowOpacity
	]

	const elevationOutputRanges = [
		elevation[ELEVATION_LEVEL.LEVEL_0].elevation,
		elevation[ELEVATION_LEVEL.LEVEL_1].elevation,
		elevation[ELEVATION_LEVEL.LEVEL_2].elevation,
		elevation[ELEVATION_LEVEL.LEVEL_3].elevation,
		elevation[ELEVATION_LEVEL.LEVEL_4].elevation,
		elevation[ELEVATION_LEVEL.LEVEL_5].elevation
	]

	const shadowRadiusOutputRanges = [
		elevation[ELEVATION_LEVEL.LEVEL_0].shadowRadius,
		elevation[ELEVATION_LEVEL.LEVEL_1].shadowRadius,
		elevation[ELEVATION_LEVEL.LEVEL_2].shadowRadius,
		elevation[ELEVATION_LEVEL.LEVEL_3].shadowRadius,
		elevation[ELEVATION_LEVEL.LEVEL_4].shadowRadius,
		elevation[ELEVATION_LEVEL.LEVEL_5].shadowRadius
	]

	const shadowOffsetXOutputRanges = [
		elevation[ELEVATION_LEVEL.LEVEL_0].shadowOffset.width,
		elevation[ELEVATION_LEVEL.LEVEL_1].shadowOffset.width,
		elevation[ELEVATION_LEVEL.LEVEL_2].shadowOffset.width,
		elevation[ELEVATION_LEVEL.LEVEL_3].shadowOffset.width,
		elevation[ELEVATION_LEVEL.LEVEL_4].shadowOffset.width,
		elevation[ELEVATION_LEVEL.LEVEL_5].shadowOffset.width
	]

	const shadowOffsetYOutputRanges = [
		elevation[ELEVATION_LEVEL.LEVEL_0].shadowOffset.height,
		elevation[ELEVATION_LEVEL.LEVEL_1].shadowOffset.height,
		elevation[ELEVATION_LEVEL.LEVEL_2].shadowOffset.height,
		elevation[ELEVATION_LEVEL.LEVEL_3].shadowOffset.height,
		elevation[ELEVATION_LEVEL.LEVEL_4].shadowOffset.height,
		elevation[ELEVATION_LEVEL.LEVEL_5].shadowOffset.height
	]

	const shadowAnimatedStyle = useAnimatedStyle(() => {
		const shadowOffsetX = interpolate(shadowSharedValue.value, INPUT_RANGES, shadowOffsetXOutputRanges)
		const shadowOffsetY = interpolate(shadowSharedValue.value, INPUT_RANGES, shadowOffsetYOutputRanges)
		const shadowOpacity = interpolate(shadowSharedValue.value, INPUT_RANGES, shadowOpacityOutputRanges)
		const shadowRadius = interpolate(shadowSharedValue.value, INPUT_RANGES, shadowRadiusOutputRanges)
		const shadowColor = Platform.select({
			web: hexToRGBA(shadow)(shadowOpacity),
			default: shadow
		})

		return Platform.select({
			default: {
				elevation: interpolate(shadowSharedValue.value, INPUT_RANGES, elevationOutputRanges),
				shadowColor: shadowColor,
				shadowOffset: {height: shadowOffsetY, width: shadowOffsetX},
				shadowOpacity: shadowOpacity,
				shadowRadius: shadowRadius
			},
			web: {
				boxShadow: getWebBoxShadow({
					blurRadius: shadowRadius,
					color: shadow,
					offsetX: shadowOffsetX,
					offsetY: shadowOffsetY,
					opacity: shadowOpacity
				})
			}
		})
	})

	const runAnimate = useMemo(
		() => animateElevation({animatedTiming, onAnimationFinished})(shadowSharedValue),
		[animatedTiming, onAnimationFinished, shadowSharedValue]
	)

	useEffect(() => {
		if (status === COMPONENT_STATUS.SUCCEEDED) {
			runAnimate(level)
		}
	}, [runAnimate, level, status])

	useEffect(
		() => () => {
			cancelAnimation(shadowSharedValue)
		},
		[shadowSharedValue]
	)

	return {shadowAnimatedStyle}
}
