import {useEffect, useMemo} from 'react'
import {Platform} from 'react-native'
import {cancelAnimation, interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useAnimatedTiming, useTheme} from '../../hooks'
import {ELEVATION, ELEVATION_ACTION} from './Elevation.enum'
import {animateElevation, getWebBoxShadow} from './Elevation.handler'
import type {UseElevationAnimatedOptions} from './Elevation.interface'
import {hexToRGBA} from '../../utils'
import {COMPONENT_STATUS} from '../../constants'

const INPUT_RANGES = [0, 1, 2, 3, 4, 5]
export const useElevationAnimated = ({
	action = ELEVATION_ACTION.LIFT,
	level = ELEVATION.LEVEL_0,
	onAnimationFinished,
	status
}: UseElevationAnimatedOptions) => {
	console.info()
	const shadowSharedValue = useSharedValue<number>(level)
	const {token} = useTheme()
	const {elevation} = token
	const animatedTiming = useAnimatedTiming({token})
	const shadowOpacityOutputRanges = [
		elevation.level0.shadowOpacity,
		elevation.level1.shadowOpacity,
		elevation.level2.shadowOpacity,
		elevation.level3.shadowOpacity,
		elevation.level4.shadowOpacity,
		elevation.level5.shadowOpacity
	]

	const elevationOutputRanges = [
		elevation.level0.elevation,
		elevation.level1.elevation,
		elevation.level2.elevation,
		elevation.level3.elevation,
		elevation.level4.elevation,
		elevation.level5.elevation
	]

	const shadowRadiusOutputRanges = [
		elevation.level0.shadowRadius,
		elevation.level1.shadowRadius,
		elevation.level2.shadowRadius,
		elevation.level3.shadowRadius,
		elevation.level4.shadowRadius,
		elevation.level5.shadowRadius
	]

	const shadowOffsetXOutputRanges = [
		elevation.level0.shadowOffset.width,
		elevation.level1.shadowOffset.width,
		elevation.level2.shadowOffset.width,
		elevation.level3.shadowOffset.width,
		elevation.level4.shadowOffset.width,
		elevation.level5.shadowOffset.width
	]

	const shadowOffsetYOutputRanges = [
		elevation.level0.shadowOffset.height,
		elevation.level1.shadowOffset.height,
		elevation.level2.shadowOffset.height,
		elevation.level3.shadowOffset.height,
		elevation.level4.shadowOffset.height,
		elevation.level5.shadowOffset.height
	]

	const shadowAnimatedStyle = useAnimatedStyle(() => {
		const shadowOffsetX = interpolate(shadowSharedValue.value, INPUT_RANGES, shadowOffsetXOutputRanges)
		const shadowOffsetY = interpolate(shadowSharedValue.value, INPUT_RANGES, shadowOffsetYOutputRanges)
		const shadowOpacity = interpolate(shadowSharedValue.value, INPUT_RANGES, shadowOpacityOutputRanges)
		const shadowRadius = interpolate(shadowSharedValue.value, INPUT_RANGES, shadowRadiusOutputRanges)
		const shadowColor = Platform.select({
			web: hexToRGBA(elevation.shadowColor)(shadowOpacity),
			default: elevation.shadowColor
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
					color: elevation.shadowColor,
					offsetX: shadowOffsetX,
					offsetY: shadowOffsetY,
					opacity: shadowOpacity,
					radius: shadowRadius
				})
			}
		})
	})

	const runAnimate = useMemo(
		() => animateElevation({animatedTiming, onAnimationFinished, action})(shadowSharedValue),
		[animatedTiming, onAnimationFinished, shadowSharedValue, action]
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
