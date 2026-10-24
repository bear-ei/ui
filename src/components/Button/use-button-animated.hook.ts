import type {ViewStyle} from 'react-native'

import {useEffect, useMemo} from 'react'
import {cancelAnimation, interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'

import type {UseButtonAnimatedOptions} from './Button.interface'

import {useAnimatedTiming, useTheme} from '../../hooks'
import {BORDER_SIZE, hexToRGBA} from '../../theme'
import {toPlatformUnit} from '../../utils'
import {BUTTON_TYPE} from './Button.enum'
import {animateButton} from './Button.handler'

const BORDER_COLOR_INPUT_RANGES = [0, 1, 2]

export const useButtonAnimated = ({
	disabled,
	error,
	eventName,
	linkColor,
	type = BUTTON_TYPE.FILLED
}: UseButtonAnimatedOptions) => {
	const {token} = useTheme()
	const {border, colors, opacity} = token
	const animatedTiming = useAnimatedTiming()
	const animatedValue = disabled ? 0 : 1
	const borderSharedValue = useSharedValue(animatedValue)
	const colorSharedValue = useSharedValue(animatedValue)
	const disabledBackgroundColor = hexToRGBA(colors.onSurface, opacity.level2)
	const disabledColor = hexToRGBA(colors.onSurface, opacity.level5)
	const backgroundColorType = useMemo(
		() => ({
			[BUTTON_TYPE.ELEVATED]: {
				inputRanges: [0, 1],
				outputRanges: [disabledBackgroundColor, hexToRGBA(colors.surfaceContainerLow, opacity.level10)]
			},
			[BUTTON_TYPE.FILLED]: {
				inputRanges: [0, 1],
				outputRanges: [
					disabledBackgroundColor,
					error ? hexToRGBA(colors.error, opacity.level10) : hexToRGBA(colors.primary, opacity.level10)
				]
			},
			[BUTTON_TYPE.LINK]: {
				inputRanges: [0, 1],
				outputRanges: [hexToRGBA(colors.primary, opacity.level0), hexToRGBA(colors.primary, opacity.level0)]
			},
			[BUTTON_TYPE.OUTLINED]: {
				inputRanges: [0, 1],
				outputRanges: [hexToRGBA(colors.primary, opacity.level0), hexToRGBA(colors.primary, opacity.level0)]
			},
			[BUTTON_TYPE.TEXT]: {
				inputRanges: [0, 1],
				outputRanges: [hexToRGBA(colors.primary, opacity.level0), hexToRGBA(colors.primary, opacity.level0)]
			},
			[BUTTON_TYPE.TONAL]: {
				inputRanges: [0, 1],
				outputRanges: [
					disabledBackgroundColor,
					error ?
						hexToRGBA(colors.errorContainer, opacity.level10)
					:	hexToRGBA(colors.secondaryContainer, opacity.level10)
				]
			}
		}),
		[disabledBackgroundColor, opacity, colors, error]
	)

	const colorType = useMemo(
		() => ({
			[BUTTON_TYPE.ELEVATED]: {
				inputRanges: [0, 1],
				outputRanges: [
					disabledColor,
					error ? hexToRGBA(colors.error, opacity.level10) : hexToRGBA(colors.primary, opacity.level10)
				]
			},
			[BUTTON_TYPE.FILLED]: {
				inputRanges: [0, 1],
				outputRanges: [
					disabledColor,
					error ? hexToRGBA(colors.onError, opacity.level10) : hexToRGBA(colors.onPrimary, opacity.level10)
				]
			},
			[BUTTON_TYPE.LINK]: {
				inputRanges: [0, 1],
				outputRanges: [
					disabledColor,
					error ?
						hexToRGBA(colors.error, opacity.level10)
					:	hexToRGBA(linkColor ?? colors.primary, opacity.level10)
				]
			},
			[BUTTON_TYPE.OUTLINED]: {
				inputRanges: [0, 1],
				outputRanges: [
					disabledColor,
					error ? hexToRGBA(colors.error, opacity.level10) : hexToRGBA(colors.primary, opacity.level10)
				]
			},
			[BUTTON_TYPE.TEXT]: {
				inputRanges: [0, 1],
				outputRanges: [
					disabledColor,
					error ? hexToRGBA(colors.error, opacity.level10) : hexToRGBA(colors.primary, opacity.level10)
				]
			},
			[BUTTON_TYPE.TONAL]: {
				inputRanges: [0, 1],
				outputRanges: [
					disabledColor,
					error ?
						hexToRGBA(colors.onErrorContainer, opacity.level10)
					:	hexToRGBA(colors.onSecondaryContainer, opacity.level10)
				]
			}
		}),
		[disabledColor, error, opacity, linkColor, colors]
	)

	const borderColorOutputRanges = useMemo(
		() => [
			disabledBackgroundColor,
			hexToRGBA(colors.outline, opacity.level10),
			hexToRGBA(colors.primary, opacity.level10)
		],
		[disabledBackgroundColor, opacity, colors]
	)

	const isBackgroundColorApplied = !(type === BUTTON_TYPE.TEXT || type === BUTTON_TYPE.LINK)
	const isBorderColorApplied = type === BUTTON_TYPE.OUTLINED
	const backgroundUnderlayAnimatedStyle = useAnimatedStyle(() => ({
		...(isBackgroundColorApplied && {
			backgroundColor: interpolateColor(
				colorSharedValue.value,
				backgroundColorType[type].inputRanges,
				backgroundColorType[type].outputRanges
			)
		}),
		...(isBorderColorApplied &&
			({
				borderColor: interpolateColor(
					borderSharedValue.value,
					BORDER_COLOR_INPUT_RANGES,
					borderColorOutputRanges
				),
				borderStyle: 'solid',
				borderWidth: toPlatformUnit(border[BORDER_SIZE.SMALL])
			} as ViewStyle))
	}))

	const labelTextAnimatedStyle = useAnimatedStyle(() => ({
		color: interpolateColor(colorSharedValue.value, colorType[type].inputRanges, colorType[type].outputRanges)
	}))

	const runAnimate = useMemo(
		() =>
			animateButton([borderSharedValue, colorSharedValue], animatedTiming, {
				borderColorInputRanges: BORDER_COLOR_INPUT_RANGES,
				disabled,
				type
			}),
		[borderSharedValue, colorSharedValue, animatedTiming, disabled, type]
	)

	useEffect(() => {
		runAnimate(eventName)
	}, [runAnimate, eventName])

	useEffect(
		() => () => {
			cancelAnimation(borderSharedValue)
			cancelAnimation(colorSharedValue)
		},
		[borderSharedValue, colorSharedValue]
	)

	return {backgroundUnderlayAnimatedStyle, labelTextAnimatedStyle}
}
