import {useEffect, useMemo} from 'react'
import {cancelAnimation, interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'

import {useAnimatedTiming, useTheme} from '../../hooks'
import {hexToRGBA} from '../../theme'

import {FAB_TYPE} from './FAB.enum'
import {animateFAB} from './FAB.handler'
import type {UseFABAnimatedOptions} from './FAB.interface'

export const useFABAnimated = ({disabled, type = FAB_TYPE.PRIMARY}: UseFABAnimatedOptions) => {
	const colorSharedValue = useSharedValue(disabled ? 0 : 1)
	const {token} = useTheme()
	const animatedTiming = useAnimatedTiming()
	const disabledBackgroundColor = hexToRGBA(token.scheme.onSurface)(token.opacity.level2)
	const disabledColor = hexToRGBA(token.scheme.onSurface)(token.opacity.level5)
	const backgroundColorType = useMemo(
		() => ({
			[FAB_TYPE.SURFACE]: {
				inputRanges: [0, 1],
				outputRanges: [
					disabledBackgroundColor,
					hexToRGBA(token.scheme.surfaceContainerHigh)(token.opacity.level10)
				]
			},
			[FAB_TYPE.PRIMARY]: {
				inputRanges: [0, 1],
				outputRanges: [disabledBackgroundColor, hexToRGBA(token.scheme.primaryContainer)(token.opacity.level10)]
			},
			[FAB_TYPE.SECONDARY]: {
				inputRanges: [0, 1],
				outputRanges: [
					disabledBackgroundColor,
					hexToRGBA(token.scheme.secondaryContainer)(token.opacity.level10)
				]
			},
			[FAB_TYPE.TERTIARY]: {
				inputRanges: [0, 1],
				outputRanges: [
					disabledBackgroundColor,
					hexToRGBA(token.scheme.tertiaryContainer)(token.opacity.level10)
				]
			}
		}),
		[disabledBackgroundColor, token]
	)

	const colorType = useMemo(
		() => ({
			[FAB_TYPE.SURFACE]: {
				inputRanges: [0, 1],
				outputRanges: [disabledColor, hexToRGBA(token.scheme.primary)(token.opacity.level10)]
			},
			[FAB_TYPE.PRIMARY]: {
				inputRanges: [0, 1],
				outputRanges: [disabledColor, hexToRGBA(token.scheme.onPrimaryContainer)(token.opacity.level10)]
			},
			[FAB_TYPE.SECONDARY]: {
				inputRanges: [0, 1],
				outputRanges: [disabledColor, hexToRGBA(token.scheme.onSecondaryContainer)(token.opacity.level10)]
			},
			[FAB_TYPE.TERTIARY]: {
				inputRanges: [0, 1],
				outputRanges: [disabledColor, hexToRGBA(token.scheme.onTertiaryContainer)(token.opacity.level10)]
			}
		}),
		[disabledColor, token]
	)

	const backgroundUnderlayAnimatedStyle = useAnimatedStyle(() => ({
		backgroundColor: interpolateColor(
			colorSharedValue.value,
			backgroundColorType[type].inputRanges,
			backgroundColorType[type].outputRanges
		)
	}))

	const labelTextAnimatedStyle = useAnimatedStyle(() => ({
		color: interpolateColor(colorSharedValue.value, colorType[type].inputRanges, colorType[type].outputRanges)
	}))

	const runAnimate = useMemo(() => animateFAB(animatedTiming)(colorSharedValue), [animatedTiming, colorSharedValue])

	useEffect(() => {
		runAnimate(disabled)
	}, [runAnimate, disabled])

	useEffect(
		() => () => {
			cancelAnimation(colorSharedValue)
		},
		[colorSharedValue]
	)

	return {backgroundUnderlayAnimatedStyle, labelTextAnimatedStyle}
}
