import {useEffect, useMemo} from 'react'
import {cancelAnimation, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {COMPONENT_STATUS} from '../../../constants'
import {useAnimatedTiming, useTheme} from '../../../hooks'
import {debounce} from '../../../utils'
import {animateProgressActiveIndicatorLinear} from './Progress-active-indicator-linear.handler'
import type {UseProgressActiveIndicatorLinearAnimatedOptions} from './Progress-active-indicator-linear.interface'

export const useProgressActiveIndicatorLinearAnimated = ({
	status,
	value = 0
}: UseProgressActiveIndicatorLinearAnimatedOptions) => {
	const {token} = useTheme()
	const widthSharedValue = useSharedValue(value)
	const animatedTiming = useAnimatedTiming({token})
	const contentAnimatedStyle = useAnimatedStyle(() => ({width: `${widthSharedValue.value * 100}%`}))
	const runAnimate = useMemo(
		() => debounce(animateProgressActiveIndicatorLinear(animatedTiming)({widthSharedValue}))(30),
		[animatedTiming, widthSharedValue]
	)

	useEffect(() => {
		if (status === COMPONENT_STATUS.SUCCEEDED) {
			runAnimate(value)
		}
	}, [runAnimate, status, value])

	useEffect(
		() => () => {
			cancelAnimation(widthSharedValue)
		},
		[widthSharedValue]
	)

	return {contentAnimatedStyle}
}
