import {useEffect, useMemo} from 'react'
import type {ViewStyle} from 'react-native'
import {cancelAnimation, interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'

import {useAnimatedTiming, useTheme} from '../../hooks'
import {BORDER_SIZE, hexToRGBA} from '../../theme'
import {platformValue} from '../../utils'

import {ICON_BUTTON_TYPE} from './Icon-button.enum'
import {animateIconButton} from './Icon-button.handler'
import type {UseIconButtonAnimatedOptions} from './Icon-button.interface'

export const useIconButtonAnimated = ({disabled, type = ICON_BUTTON_TYPE.FILLED}: UseIconButtonAnimatedOptions) => {
	const {token} = useTheme()
	const animatedValue = disabled ? 0 : 1
	const borderSharedValue = useSharedValue(animatedValue)
	const colorSharedValue = useSharedValue(animatedValue)
	const animatedTiming = useAnimatedTiming()
	const disabledBackgroundColor = hexToRGBA(token.scheme.onSurface)(token.opacity.level2)
	const backgroundColorType = useMemo(
		() => ({
			[ICON_BUTTON_TYPE.FILLED]: {
				inputRanges: [0, 1],
				outputRanges: [disabledBackgroundColor, hexToRGBA(token.scheme.primary)(token.opacity.level10)]
			},
			[ICON_BUTTON_TYPE.OUTLINED]: {
				inputRanges: [0, 1],
				outputRanges: [
					hexToRGBA(token.scheme.primary)(token.opacity.level0),
					hexToRGBA(token.scheme.primary)(token.opacity.level0)
				]
			},
			[ICON_BUTTON_TYPE.STANDARD]: {
				inputRanges: [0, 1],
				outputRanges: [
					hexToRGBA(token.scheme.primary)(token.opacity.level0),
					hexToRGBA(token.scheme.primary)(token.opacity.level0)
				]
			},
			[ICON_BUTTON_TYPE.TONAL]: {
				inputRanges: [0, 1],
				outputRanges: [
					disabledBackgroundColor,
					hexToRGBA(token.scheme.secondaryContainer)(token.opacity.level10)
				]
			},
			[ICON_BUTTON_TYPE.ACTIVE]: {
				inputRanges: [0, 1],
				outputRanges: [
					hexToRGBA(token.scheme.primary)(token.opacity.level0),
					hexToRGBA(token.scheme.primary)(token.opacity.level0)
				]
			}
		}),
		[disabledBackgroundColor, token]
	)

	const backgroundUnderlayAnimatedStyle = useAnimatedStyle(() => ({
		backgroundColor: interpolateColor(
			colorSharedValue.value,
			backgroundColorType[type].inputRanges,
			backgroundColorType[type].outputRanges
		),
		...(type === ICON_BUTTON_TYPE.OUTLINED &&
			({
				borderColor: interpolateColor(
					borderSharedValue.value,
					[0, 1],
					[disabledBackgroundColor, token.scheme.outline]
				),
				borderStyle: 'solid',
				borderWidth: platformValue(token.border[BORDER_SIZE.SMALL])
			} as ViewStyle))
	}))

	const runAnimate = useMemo(
		() => animateIconButton({animatedTiming, type})({borderSharedValue, colorSharedValue}),
		[animatedTiming, borderSharedValue, colorSharedValue, type]
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
