import {hexToRGBA} from '@bearei/material-token'
import {useEffect, useMemo} from 'react'
import {cancelAnimation, interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../hooks'
import {ICON_BUTTON_TYPE} from './Icon-button.enum'
import {animateIconButton} from './Icon-button.handler'
import type {UseIconButtonAnimatedOptions} from './Icon-button.interface'

export const useIconButtonAnimated = ({disabled, type = ICON_BUTTON_TYPE.FILLED}: UseIconButtonAnimatedOptions) => {
	const animatedValue = disabled ? 0 : 1
	const borderSharedValue = useSharedValue(animatedValue)
	const colorSharedValue = useSharedValue(animatedValue)
	const theme = useTheme()
	const {scheme, opacity} = theme.token
	const animatedTiming = useAnimatedTiming({token: theme.token})
	const animateSharedValueTo = useMemo(() => animatedTiming(), [animatedTiming])
	const disabledBackgroundColor = hexToRGBA(scheme.onSurface)(opacity.level2)
	const backgroundColorType = useMemo(
		() => ({
			[ICON_BUTTON_TYPE.FILLED]: {
				inputRanges: [0, 1],
				outputRanges: [disabledBackgroundColor, hexToRGBA(scheme.primary)(opacity.level10)]
			},
			[ICON_BUTTON_TYPE.OUTLINED]: {
				inputRanges: [0, 1],
				outputRanges: [
					hexToRGBA(scheme.primary)(opacity.level0),
					hexToRGBA(scheme.primary)(opacity.level0)
				]
			},
			[ICON_BUTTON_TYPE.STANDARD]: {
				inputRanges: [0, 1],
				outputRanges: [
					hexToRGBA(scheme.primary)(opacity.level0),
					hexToRGBA(scheme.primary)(opacity.level0)
				]
			},
			[ICON_BUTTON_TYPE.TONAL]: {
				inputRanges: [0, 1],
				outputRanges: [
					disabledBackgroundColor,
					hexToRGBA(scheme.secondaryContainer)(opacity.level10)
				]
			},
			[ICON_BUTTON_TYPE.ACTIVE]: {
				inputRanges: [0, 1],
				outputRanges: [
					hexToRGBA(scheme.primary)(opacity.level0),
					hexToRGBA(scheme.primary)(opacity.level0)
				]
			}
		}),
		[disabledBackgroundColor, opacity.level0, opacity.level10, scheme.primary, scheme.secondaryContainer]
	)

	const borderWidth = theme.adaptSize(theme.token.spacing.extraSmall / 4)
	const backgroundUnderlayAnimatedStyle = useAnimatedStyle(() => ({
		backgroundColor: interpolateColor(
			colorSharedValue.value,
			backgroundColorType[type].inputRanges,
			backgroundColorType[type].outputRanges
		),
		...(type === ICON_BUTTON_TYPE.OUTLINED && {
			borderColor: interpolateColor(
				borderSharedValue.value,
				[0, 1],
				[disabledBackgroundColor, scheme.outline]
			),
			borderStyle: 'solid',
			borderWidth
		})
	}))

	const runAnimate = useMemo(
		() => animateIconButton({animateSharedValueTo, type})({borderSharedValue, colorSharedValue}),
		[animateSharedValueTo, borderSharedValue, colorSharedValue, type]
	)

	useEffect(() => {
		runAnimate(disabled)
	}, [runAnimate, disabled])

	useEffect(
		() => () => {
			cancelAnimation(borderSharedValue)
			cancelAnimation(colorSharedValue)
		},
		[borderSharedValue, colorSharedValue]
	)

	return {backgroundUnderlayAnimatedStyle}
}
