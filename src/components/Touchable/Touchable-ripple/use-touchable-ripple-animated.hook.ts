import {useEffect, useMemo} from 'react'
import type {ViewStyle} from 'react-native'
import {cancelAnimation, interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {COMPONENT_STATUS} from '../../../constants'
import {useAnimatedTiming, useTheme} from '../../../hooks'
import {platformValue} from '../../../theme'
import {animateTouchableRipple} from './Touchable-ripple.handler'
import type {UseTouchableRippleAnimatedOptions} from './Touchable-ripple.interface'

export const useTouchableRippleAnimated = ({
	indexKey,
	onAnimateFinished,
	radius,
	status
}: UseTouchableRippleAnimatedOptions) => {
	const opacitySharedValue = useSharedValue(1)
	const scaleSharedValue = useSharedValue(0)
	const {token} = useTheme()
	const animatedTiming = useAnimatedTiming({token})
	const containerAnimatedStyle = useAnimatedStyle(
		() =>
			({
				opacity: interpolate(opacitySharedValue.value, [0, 1], [token.opacity.level0, token.opacity.level2]),
				transform: [
					{translateX: platformValue(-radius)},
					{translateY: platformValue(-radius)},
					{scale: interpolate(scaleSharedValue.value, [0, 1], [0, 1])}
				]
			}) as ViewStyle
	)

	const runAnimate = useMemo(
		() => animateTouchableRipple({animatedTiming, onAnimateFinished})({opacitySharedValue, scaleSharedValue}),
		[animatedTiming, onAnimateFinished, opacitySharedValue, scaleSharedValue]
	)

	useEffect(() => {
		if (status === COMPONENT_STATUS.SUCCEEDED) {
			runAnimate(indexKey)
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
