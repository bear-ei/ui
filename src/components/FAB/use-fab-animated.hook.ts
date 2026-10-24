import {useEffect, useMemo} from 'react'
import {cancelAnimation, interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'

import type {UseFABAnimatedOptions} from './FAB.interface'

import {useAnimatedTiming, useTheme} from '../../hooks'
import {hexToRGBA} from '../../theme'
import {FAB_TYPE} from './FAB.enum'
import {animateFAB} from './FAB.handler'

export const useFABAnimated = ({disabled, type = FAB_TYPE.PRIMARY}: UseFABAnimatedOptions) => {
	const colorSharedValue = useSharedValue(disabled ? 0 : 1)
	const {token} = useTheme()
	const {colors, opacity} = token
	const animatedTiming = useAnimatedTiming()
	const disabledBackgroundColor = hexToRGBA(colors.onSurface, opacity.level2)
	const disabledColor = hexToRGBA(colors.onSurface, opacity.level5)
	const backgroundColorType = useMemo(
		() => ({
			[FAB_TYPE.PRIMARY]: {
				inputRanges: [0, 1],
				outputRanges: [disabledBackgroundColor, hexToRGBA(colors.primaryContainer, opacity.level10)]
			},
			[FAB_TYPE.SECONDARY]: {
				inputRanges: [0, 1],
				outputRanges: [disabledBackgroundColor, hexToRGBA(colors.secondaryContainer, opacity.level10)]
			},
			[FAB_TYPE.SURFACE]: {
				inputRanges: [0, 1],
				outputRanges: [disabledBackgroundColor, hexToRGBA(colors.surfaceContainerHigh, opacity.level10)]
			},
			[FAB_TYPE.TERTIARY]: {
				inputRanges: [0, 1],
				outputRanges: [disabledBackgroundColor, hexToRGBA(colors.tertiaryContainer, opacity.level10)]
			}
		}),
		[disabledBackgroundColor, colors, opacity]
	)

	const colorType = useMemo(
		() => ({
			[FAB_TYPE.PRIMARY]: {
				inputRanges: [0, 1],
				outputRanges: [disabledColor, hexToRGBA(colors.onPrimaryContainer, opacity.level10)]
			},
			[FAB_TYPE.SECONDARY]: {
				inputRanges: [0, 1],
				outputRanges: [disabledColor, hexToRGBA(colors.onSecondaryContainer, opacity.level10)]
			},
			[FAB_TYPE.SURFACE]: {
				inputRanges: [0, 1],
				outputRanges: [disabledColor, hexToRGBA(colors.primary, opacity.level10)]
			},
			[FAB_TYPE.TERTIARY]: {
				inputRanges: [0, 1],
				outputRanges: [disabledColor, hexToRGBA(colors.onTertiaryContainer, opacity.level10)]
			}
		}),
		[disabledColor, colors, opacity]
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

	const runAnimate = useMemo(() => animateFAB(colorSharedValue, animatedTiming), [animatedTiming, colorSharedValue])

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
