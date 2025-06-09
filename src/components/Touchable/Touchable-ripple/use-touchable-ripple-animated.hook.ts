import {useEffect, useMemo} from 'react'
import {cancelAnimation, interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../../hooks'
import {animateTouchableRipple} from './Touchable-ripple.handler'
import type {UseTouchableRippleAnimatedOptions} from './Touchable-ripple.interface'

export const useTouchableRippleAnimated = ({
	indexKey,
	onAnimateFinished,
	radius
}: UseTouchableRippleAnimatedOptions) => {
	const opacitySharedValue = useSharedValue(1)
	const scaleSharedValue = useSharedValue(0)
	const theme = useTheme()
	const animatedTiming = useAnimatedTiming({token: theme.token})
	const containerAnimatedStyle = useAnimatedStyle(() => ({
		opacity: interpolate(
			opacitySharedValue.value,
			[0, 1],
			[theme.token.opacity.level0, theme.token.opacity.level10]
		),
		transform: [
			{translateX: -radius},
			{translateY: -radius},
			{scale: interpolate(scaleSharedValue.value, [0, 1], [0, 1])}
		]
	}))

	const runAnimate = useMemo(
		() =>
			animateTouchableRipple({animatedTiming, onAnimateFinished})({
				opacitySharedValue,
				scaleSharedValue
			}),
		[animatedTiming, onAnimateFinished, opacitySharedValue, scaleSharedValue]
	)

	useEffect(() => {
		runAnimate(indexKey)
	}, [runAnimate, indexKey])

	useEffect(
		() => () => {
			cancelAnimation(opacitySharedValue)
			cancelAnimation(scaleSharedValue)
		},
		[opacitySharedValue, scaleSharedValue]
	)

	return {containerAnimatedStyle}
}
