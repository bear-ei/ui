import type {ViewStyle} from 'react-native'

import {useEffect, useMemo} from 'react'
import {cancelAnimation, interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'

import type {ButtonType, UseButtonAnimatedOptions} from './Button.interface'

import {useAnimatedTiming, useTheme} from '../../hooks'
import {BORDER_SIZE, hexToRGBA} from '../../theme'
import {platformValue} from '../../utils'
import {BUTTON_TYPE} from './Button.enum'
import {animateButton} from './Button.handler'

export const useButtonAnimated = ({
	disabled,
	error,
	eventName,
	linkColor,
	type = BUTTON_TYPE.FILLED
}: UseButtonAnimatedOptions) => {
	const {token} = useTheme()
	const {border, opacity, scheme} = token
	const animatedTiming = useAnimatedTiming()
	const animatedValue = disabled ? 0 : 1
	const borderSharedValue = useSharedValue(animatedValue)
	const colorSharedValue = useSharedValue(animatedValue)
	const disabledBackgroundColor = hexToRGBA(scheme.onSurface, opacity.level2)
	const disabledColor = hexToRGBA(scheme.onSurface, opacity.level5)
	const backgroundColorType = useMemo(
		() => ({
			[BUTTON_TYPE.ELEVATED]: {
				inputRanges: [0, 1],
				outputRanges: [disabledBackgroundColor, hexToRGBA(scheme.surfaceContainerLow, opacity.level10)]
			},
			[BUTTON_TYPE.FILLED]: {
				inputRanges: [0, 1],
				outputRanges: [
					disabledBackgroundColor,
					error ? hexToRGBA(scheme.error, opacity.level10) : hexToRGBA(scheme.primary, opacity.level10)
				]
			},
			[BUTTON_TYPE.LINK]: {
				inputRanges: [0, 1],
				outputRanges: [hexToRGBA(scheme.primary, opacity.level0), hexToRGBA(scheme.primary, opacity.level0)]
			},
			[BUTTON_TYPE.OUTLINED]: {
				inputRanges: [0, 1],
				outputRanges: [hexToRGBA(scheme.primary, opacity.level0), hexToRGBA(scheme.primary, opacity.level0)]
			},
			[BUTTON_TYPE.TEXT]: {
				inputRanges: [0, 1],
				outputRanges: [hexToRGBA(scheme.primary, opacity.level0), hexToRGBA(scheme.primary, opacity.level0)]
			},
			[BUTTON_TYPE.TONAL]: {
				inputRanges: [0, 1],
				outputRanges: [
					disabledBackgroundColor,
					error ?
						hexToRGBA(scheme.errorContainer, opacity.level10)
					:	hexToRGBA(scheme.secondaryContainer, opacity.level10)
				]
			}
		}),
		[disabledBackgroundColor, opacity, scheme, error]
	)

	const colorType = useMemo(
		() => ({
			[BUTTON_TYPE.ELEVATED]: {
				inputRanges: [0, 1],
				outputRanges: [
					disabledColor,
					error ? hexToRGBA(scheme.error, opacity.level10) : hexToRGBA(scheme.primary, opacity.level10)
				]
			},
			[BUTTON_TYPE.FILLED]: {
				inputRanges: [0, 1],
				outputRanges: [
					disabledColor,
					error ? hexToRGBA(scheme.onError, opacity.level10) : hexToRGBA(scheme.onPrimary, opacity.level10)
				]
			},
			[BUTTON_TYPE.LINK]: {
				inputRanges: [0, 1],
				outputRanges: [
					disabledColor,
					error ?
						hexToRGBA(scheme.error, opacity.level10)
					:	hexToRGBA(linkColor ?? scheme.primary, opacity.level10)
				]
			},
			[BUTTON_TYPE.OUTLINED]: {
				inputRanges: [0, 1],
				outputRanges: [
					disabledColor,
					error ? hexToRGBA(scheme.error, opacity.level10) : hexToRGBA(scheme.primary, opacity.level10)
				]
			},
			[BUTTON_TYPE.TEXT]: {
				inputRanges: [0, 1],
				outputRanges: [
					disabledColor,
					error ? hexToRGBA(scheme.error, opacity.level10) : hexToRGBA(scheme.primary, opacity.level10)
				]
			},
			[BUTTON_TYPE.TONAL]: {
				inputRanges: [0, 1],
				outputRanges: [
					disabledColor,
					error ?
						hexToRGBA(scheme.onErrorContainer, opacity.level10)
					:	hexToRGBA(scheme.onSecondaryContainer, opacity.level10)
				]
			}
		}),
		[disabledColor, error, opacity, linkColor, scheme]
	)

	const borderColorInputRanges = useMemo(() => [0, 1, 2], [])
	const borderColorOutputRanges = useMemo(
		() => [
			disabledBackgroundColor,
			hexToRGBA(scheme.outline, opacity.level10),
			hexToRGBA(scheme.primary, opacity.level10)
		],
		[disabledBackgroundColor, opacity, scheme]
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
				borderWidth: platformValue(border[BORDER_SIZE.SMALL])
			} as ViewStyle))
	}))

	const labelTextAnimatedStyle = useAnimatedStyle(() => ({
		color: interpolateColor(colorSharedValue.value, colorType[type].inputRanges, colorType[type].outputRanges)
	}))

	const runAnimate = useMemo(
		() =>
			animateButton([borderSharedValue, colorSharedValue], animatedTiming, {
				borderColorInputRanges,
				disabled,
				type
			}),
		[borderSharedValue, colorSharedValue, animatedTiming, disabled, type, borderColorInputRanges]
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
