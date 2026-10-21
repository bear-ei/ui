import {useEffect, useMemo} from 'react'
import type {ViewStyle} from 'react-native'
import {cancelAnimation, interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'

import {useAnimatedTiming, useTheme} from '../../hooks'
import {BORDER_SIZE, hexToRGBA} from '../../theme'
import {platformValue} from '../../utils'

import {BUTTON_TYPE} from './Button.enum'
import {animateButton} from './Button.handler'
import type {ButtonType, UseButtonAnimatedOptions} from './Button.interface'

export const useButtonAnimated = ({
	disabled,
	error,
	eventName,
	linkColor,
	type = BUTTON_TYPE.FILLED
}: UseButtonAnimatedOptions) => {
	const {token} = useTheme()
	const animatedTiming = useAnimatedTiming()
	const animatedValue = disabled ? 0 : 1
	const borderSharedValue = useSharedValue(animatedValue)
	const colorSharedValue = useSharedValue(animatedValue)
	const disabledBackgroundColor = hexToRGBA(token.scheme.onSurface)(token.opacity.level2)
	const disabledColor = hexToRGBA(token.scheme.onSurface)(token.opacity.level5)
	const backgroundColorType = useMemo(
		() => ({
			[BUTTON_TYPE.ELEVATED]: {
				inputRanges: [0, 1],
				outputRanges: [
					disabledBackgroundColor,
					hexToRGBA(token.scheme.surfaceContainerLow)(token.opacity.level10)
				]
			},
			[BUTTON_TYPE.FILLED]: {
				inputRanges: [0, 1],
				outputRanges: [
					disabledBackgroundColor,
					error ?
						hexToRGBA(token.scheme.error)(token.opacity.level10)
					:	hexToRGBA(token.scheme.primary)(token.opacity.level10)
				]
			},
			[BUTTON_TYPE.OUTLINED]: {
				inputRanges: [0, 1],
				outputRanges: [
					hexToRGBA(token.scheme.primary)(token.opacity.level0),
					hexToRGBA(token.scheme.primary)(token.opacity.level0)
				]
			},
			[BUTTON_TYPE.TEXT]: {
				inputRanges: [0, 1],
				outputRanges: [
					hexToRGBA(token.scheme.primary)(token.opacity.level0),
					hexToRGBA(token.scheme.primary)(token.opacity.level0)
				]
			},
			[BUTTON_TYPE.LINK]: {
				inputRanges: [0, 1],
				outputRanges: [
					hexToRGBA(token.scheme.primary)(token.opacity.level0),
					hexToRGBA(token.scheme.primary)(token.opacity.level0)
				]
			},
			[BUTTON_TYPE.TONAL]: {
				inputRanges: [0, 1],
				outputRanges: [
					disabledBackgroundColor,
					error ?
						hexToRGBA(token.scheme.errorContainer)(token.opacity.level10)
					:	hexToRGBA(token.scheme.secondaryContainer)(token.opacity.level10)
				]
			}
		}),
		[disabledBackgroundColor, token, error]
	)

	const colorType = useMemo(
		() => ({
			[BUTTON_TYPE.ELEVATED]: {
				inputRanges: [0, 1],
				outputRanges: [
					disabledColor,
					error ?
						hexToRGBA(token.scheme.error)(token.opacity.level10)
					:	hexToRGBA(token.scheme.primary)(token.opacity.level10)
				]
			},
			[BUTTON_TYPE.FILLED]: {
				inputRanges: [0, 1],
				outputRanges: [
					disabledColor,
					error ?
						hexToRGBA(token.scheme.onError)(token.opacity.level10)
					:	hexToRGBA(token.scheme.onPrimary)(token.opacity.level10)
				]
			},
			[BUTTON_TYPE.OUTLINED]: {
				inputRanges: [0, 1],
				outputRanges: [
					disabledColor,
					error ?
						hexToRGBA(token.scheme.error)(token.opacity.level10)
					:	hexToRGBA(token.scheme.primary)(token.opacity.level10)
				]
			},
			[BUTTON_TYPE.TEXT]: {
				inputRanges: [0, 1],
				outputRanges: [
					disabledColor,
					error ?
						hexToRGBA(token.scheme.error)(token.opacity.level10)
					:	hexToRGBA(token.scheme.primary)(token.opacity.level10)
				]
			},
			[BUTTON_TYPE.LINK]: {
				inputRanges: [0, 1],
				outputRanges: [
					disabledColor,
					error ?
						hexToRGBA(token.scheme.error)(token.opacity.level10)
					:	hexToRGBA(linkColor ?? token.scheme.primary)(token.opacity.level10)
				]
			},
			[BUTTON_TYPE.TONAL]: {
				inputRanges: [0, 1],
				outputRanges: [
					disabledColor,
					error ?
						hexToRGBA(token.scheme.onErrorContainer)(token.opacity.level10)
					:	hexToRGBA(token.scheme.onSecondaryContainer)(token.opacity.level10)
				]
			}
		}),
		[disabledColor, error, token, linkColor]
	)

	const borderColorInputRanges = useMemo(() => [0, 1, 2], [])
	const borderColorOutputRanges = useMemo(
		() => [
			disabledBackgroundColor,
			hexToRGBA(token.scheme.outline)(token.opacity.level10),
			hexToRGBA(token.scheme.primary)(token.opacity.level10)
		],
		[disabledBackgroundColor, token]
	)

	const isBackgroundColorApplied = !([BUTTON_TYPE.TEXT, BUTTON_TYPE.LINK] as readonly ButtonType[]).includes(type)
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
				borderColor: interpolateColor(borderSharedValue.value, borderColorInputRanges, borderColorOutputRanges),
				borderStyle: 'solid',
				borderWidth: platformValue(token.border[BORDER_SIZE.SMALL])
			} as ViewStyle))
	}))

	const labelTextAnimatedStyle = useAnimatedStyle(() => ({
		color: interpolateColor(colorSharedValue.value, colorType[type].inputRanges, colorType[type].outputRanges)
	}))

	const runAnimate = useMemo(
		() =>
			animateButton({animatedTiming, borderColorInputRanges, type, disabled})({
				borderSharedValue,
				colorSharedValue
			}),
		[borderColorInputRanges, borderSharedValue, colorSharedValue, animatedTiming, disabled, type]
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
