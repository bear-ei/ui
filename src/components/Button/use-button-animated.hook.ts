import {hexToRGBA} from '@bearei/material-token'
import {useEffect, useMemo} from 'react'
import {interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../hooks'
import {BUTTON_TYPE} from './Button.enum'
import {animateButtonColorAndBorder} from './Button.handler'
import type {UseButtonAnimatedOptions} from './Button.interface'

export const useButtonAnimated = ({
	disabled,
	eventName,
	type = BUTTON_TYPE.FILLED,
	error
}: UseButtonAnimatedOptions) => {
	const theme = useTheme()
	const {scheme, spacing, opacity} = theme.token
	const animatedTiming = useAnimatedTiming({token: theme.token})
	const animatedValue = disabled ? 0 : 1
	const borderSharedValue = useSharedValue(animatedValue)
	const colorSharedValue = useSharedValue(animatedValue)
	const disabledBackgroundColor = hexToRGBA(scheme.onSurface)(opacity.level2)
	const disabledColor = hexToRGBA(scheme.onSurface)(opacity.level5)
	const backgroundColorType = useMemo(
		() => ({
			[BUTTON_TYPE.ELEVATED]: {
				inputRanges: [0, 1],
				outputRanges: [
					disabledBackgroundColor,
					hexToRGBA(scheme.surfaceContainerLow)(opacity.level10)
				]
			},
			[BUTTON_TYPE.FILLED]: {
				inputRanges: [0, 1],
				outputRanges: [
					disabledBackgroundColor,
					error ?
						hexToRGBA(scheme.error)(opacity.level10)
					:	hexToRGBA(scheme.primary)(opacity.level10)
				]
			},
			[BUTTON_TYPE.OUTLINED]: {
				inputRanges: [0, 1],
				outputRanges: [
					hexToRGBA(scheme.primary)(opacity.level0),
					hexToRGBA(scheme.primary)(opacity.level0)
				]
			},
			[BUTTON_TYPE.TEXT]: {
				inputRanges: [0, 1],
				outputRanges: [
					hexToRGBA(scheme.primary)(opacity.level0),
					hexToRGBA(scheme.primary)(opacity.level0)
				]
			},
			[BUTTON_TYPE.LINK]: {
				inputRanges: [0, 1],
				outputRanges: [
					hexToRGBA(scheme.primary)(opacity.level0),
					hexToRGBA(scheme.primary)(opacity.level0)
				]
			},
			[BUTTON_TYPE.TONAL]: {
				inputRanges: [0, 1],
				outputRanges: [
					disabledBackgroundColor,
					error ?
						hexToRGBA(scheme.errorContainer)(opacity.level10)
					:	hexToRGBA(scheme.secondaryContainer)(opacity.level10)
				]
			}
		}),
		[
			disabledBackgroundColor,
			error,
			opacity.level0,
			opacity.level10,
			scheme.error,
			scheme.errorContainer,
			scheme.primary,
			scheme.secondaryContainer,
			scheme.surfaceContainerLow
		]
	)

	const colorType = useMemo(
		() => ({
			[BUTTON_TYPE.ELEVATED]: {
				inputRanges: [0, 1],
				outputRanges: [
					disabledColor,
					error ?
						hexToRGBA(scheme.error)(opacity.level10)
					:	hexToRGBA(scheme.primary)(opacity.level10)
				]
			},
			[BUTTON_TYPE.FILLED]: {
				inputRanges: [0, 1],
				outputRanges: [
					disabledColor,
					error ?
						hexToRGBA(scheme.onError)(opacity.level10)
					:	hexToRGBA(scheme.onPrimary)(opacity.level10)
				]
			},
			[BUTTON_TYPE.OUTLINED]: {
				inputRanges: [0, 1],
				outputRanges: [
					disabledColor,
					error ?
						hexToRGBA(scheme.error)(opacity.level10)
					:	hexToRGBA(scheme.primary)(opacity.level10)
				]
			},
			[BUTTON_TYPE.TEXT]: {
				inputRanges: [0, 1],
				outputRanges: [
					disabledColor,
					error ?
						hexToRGBA(scheme.error)(opacity.level10)
					:	hexToRGBA(scheme.primary)(opacity.level10)
				]
			},
			[BUTTON_TYPE.LINK]: {
				inputRanges: [0, 1],
				outputRanges: [
					disabledColor,
					error ?
						hexToRGBA(scheme.error)(opacity.level10)
					:	hexToRGBA(scheme.primary)(opacity.level10)
				]
			},
			[BUTTON_TYPE.TONAL]: {
				inputRanges: [0, 1],
				outputRanges: [
					disabledColor,
					error ?
						hexToRGBA(scheme.onErrorContainer)(opacity.level10)
					:	hexToRGBA(scheme.onSecondaryContainer)(opacity.level10)
				]
			}
		}),
		[
			disabledColor,
			error,
			opacity.level10,
			scheme.error,
			scheme.onError,
			scheme.onErrorContainer,
			scheme.onPrimary,
			scheme.onSecondaryContainer,
			scheme.primary
		]
	)

	const borderColorInputRanges = useMemo(() => [0, 1, 2], [])
	const borderColorOutputRanges = useMemo(
		() => [
			disabledBackgroundColor,
			hexToRGBA(scheme.outline)(opacity.level10),
			hexToRGBA(scheme.primary)(opacity.level10)
		],
		[disabledBackgroundColor, opacity.level10, scheme.outline, scheme.primary]
	)

	const notBackgroundColorTypes = [BUTTON_TYPE.TEXT, BUTTON_TYPE.LINK] as const
	const isNotBackgroundColor = notBackgroundColorTypes.includes(type as (typeof notBackgroundColorTypes)[number])
	const isNotBorderColor = type !== BUTTON_TYPE.OUTLINED
	const borderWidth = theme.adaptSize(spacing.extraSmall / 4)
	const backgroundUnderlayAnimatedStyle = useAnimatedStyle(() => ({
		...(!isNotBackgroundColor && {
			backgroundColor: interpolateColor(
				colorSharedValue.value,
				backgroundColorType[type].inputRanges,
				backgroundColorType[type].outputRanges
			)
		}),
		...(!isNotBorderColor && {
			borderColor: interpolateColor(
				borderSharedValue.value,
				borderColorInputRanges,
				borderColorOutputRanges
			),
			borderStyle: 'solid',
			borderWidth
		})
	}))

	const labelTextAnimatedStyle = useAnimatedStyle(() => ({
		color: interpolateColor(
			colorSharedValue.value,
			colorType[type].inputRanges,
			colorType[type].outputRanges
		)
	}))

	const animateButtonColorAndBorderEffect = useMemo(
		() =>
			animateButtonColorAndBorder({animatedTiming, borderColorInputRanges, type, disabled})({
				borderSharedValue,
				colorSharedValue
			}),
		[animatedTiming, borderColorInputRanges, borderSharedValue, colorSharedValue, disabled, type]
	)

	useEffect(() => {
		animateButtonColorAndBorderEffect(eventName)
	}, [animateButtonColorAndBorderEffect, eventName])

	return {backgroundUnderlayAnimatedStyle, labelTextAnimatedStyle}
}
