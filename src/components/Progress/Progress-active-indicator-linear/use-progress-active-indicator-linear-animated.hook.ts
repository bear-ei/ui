import {useEffect, useMemo} from 'react'
import {cancelAnimation, interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {COMPONENT_STATUS} from '../../../constants'
import {useAnimatedTiming, useTheme} from '../../../hooks'
import {debounce} from '../../../utils'
import {animateProgressActiveIndicatorLinear} from './Progress-active-indicator-linear.handler'
import type {UseProgressActiveIndicatorLinearAnimatedOptions} from './Progress-active-indicator-linear.interface'
import {DENSITY_SIZE, platformValue} from '../../../theme'
import type {ViewStyle} from 'react-native'

export const useProgressActiveIndicatorLinearAnimated = ({
	status,
	value = 0
}: UseProgressActiveIndicatorLinearAnimatedOptions) => {
	const {token} = useTheme()
	const widthSharedValue = useSharedValue(value)
	const translateXSharedValue = useSharedValue(value > 0 ? 1 : 0)
	const animatedTiming = useAnimatedTiming({token})
	const contentAnimatedStyle = useAnimatedStyle(() => ({width: `${widthSharedValue.value * 100}%`}))
	const trackAnimatedStyle = useAnimatedStyle(
		() =>
			({
				width: `${(1 - widthSharedValue.value) * 100}%`,
				transform: [
					{
						translateX: platformValue(
							interpolate(
								translateXSharedValue.value,
								[0, 1],
								[token.density.spacing[DENSITY_SIZE.NONE], token.density.spacing[DENSITY_SIZE.X_SMALL]]
							)
						)
					}
				]
			}) as ViewStyle
	)

	const runAnimate = useMemo(
		() =>
			debounce(animateProgressActiveIndicatorLinear(animatedTiming)({widthSharedValue, translateXSharedValue}))(
				30
			),
		[animatedTiming, widthSharedValue, translateXSharedValue]
	)

	useEffect(() => {
		if (status === COMPONENT_STATUS.SUCCEEDED) {
			runAnimate(value)
		}
	}, [runAnimate, status, value])

	useEffect(
		() => () => {
			cancelAnimation(widthSharedValue)
			cancelAnimation(translateXSharedValue)
		},
		[widthSharedValue, translateXSharedValue]
	)

	return {contentAnimatedStyle, trackAnimatedStyle}
}
