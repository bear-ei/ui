import {useEffect, useMemo} from 'react'
import {cancelAnimation, interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useAnimatedTiming, useTheme} from '../../hooks'
import {hexToRGBA} from '../../theme'
import {animateSupportingText} from './Supporting-text.handler'
import type {UseSupportingTextOptions} from './Supporting-text.interface'

export const useSupportingTextAnimated = ({disabled, error}: UseSupportingTextOptions) => {
	const {token} = useTheme()
	const {scheme, opacity} = token
	const defaultAnimatedValue = error ? 2 : 1
	const value =
		disabled ?
			disabled ? 0
			:	1
		:	defaultAnimatedValue

	const supportingTextSharedValue = useSharedValue(value)
	const animatedTiming = useAnimatedTiming({token})
	const disabledColor = hexToRGBA(scheme.onSurface)(opacity.level5)
	const supportingTextSharedValueColorOutputRanges = [
		disabledColor,
		hexToRGBA(scheme.onSurfaceVariant)(opacity.level10),
		hexToRGBA(scheme.error)(opacity.level10)
	]

	const textAnimatedStyle = useAnimatedStyle(() => ({
		color: interpolateColor(supportingTextSharedValue.value, [0, 1, 2], supportingTextSharedValueColorOutputRanges)
	}))

	const runAnimate = useMemo(
		() => animateSupportingText(animatedTiming)(supportingTextSharedValue),
		[animatedTiming, supportingTextSharedValue]
	)

	useEffect(() => {
		runAnimate(value)
	}, [runAnimate, value])

	useEffect(
		() => () => {
			cancelAnimation(supportingTextSharedValue)
		},
		[supportingTextSharedValue]
	)

	return {textAnimatedStyle}
}
