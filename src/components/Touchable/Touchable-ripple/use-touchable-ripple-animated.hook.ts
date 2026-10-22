import type {ViewStyle} from 'react-native'

import {useEffect, useMemo} from 'react'
import {cancelAnimation, interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'

import type {UseTouchableRippleAnimatedOptions} from './Touchable-ripple.interface'

import {COMPONENT_STATUS} from '../../../constants'
import {useAnimatedTiming, useTheme} from '../../../hooks'
import {platformValue} from '../../../utils'
import {animateTouchableRipple} from './Touchable-ripple.handler'

export const useTouchableRippleAnimated = ({
	indexKey,
	onAnimateFinished,
	radius,
	status
}: UseTouchableRippleAnimatedOptions) => {
	const {token} = useTheme()
	const {opacity} = token
	const opacitySharedValue = useSharedValue(1)
	const scaleSharedValue = useSharedValue(0)
	const animatedTiming = useAnimatedTiming()
	const containerAnimatedStyle = useAnimatedStyle(
		() =>
			({
				opacity: interpolate(opacitySharedValue.value, [0, 1], [opacity.level0, opacity.level2]),
				transform: [
					{translateX: platformValue(-radius)},
					{translateY: platformValue(-radius)},
					{scale: interpolate(scaleSharedValue.value, [0, 1], [0, 1])}
				]
			}) as ViewStyle
	)

	const runAnimate = useMemo(
		() =>
			animateTouchableRipple([opacitySharedValue, scaleSharedValue], animatedTiming, {
				indexKey,
				onAnimateFinished
			}),
		[animatedTiming, onAnimateFinished, opacitySharedValue, scaleSharedValue, indexKey]
	)

	useEffect(() => {
		if (status === COMPONENT_STATUS.SUCCEEDED) {
			runAnimate()
		}
	}, [runAnimate, indexKey, status])

	useEffect(
		() => () => {
			cancelAnimation(opacitySharedValue)
			cancelAnimation(scaleSharedValue)
		},
		[opacitySharedValue, scaleSharedValue]
	)

	return {containerAnimatedStyle}
}
