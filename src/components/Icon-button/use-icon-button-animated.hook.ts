import type {ViewStyle} from 'react-native'

import {useEffect, useMemo} from 'react'
import {cancelAnimation, interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'

import type {UseIconButtonAnimatedOptions} from './Icon-button.interface'

import {useAnimatedTiming, useTheme} from '../../hooks'
import {BORDER_SIZE, hexToRGBA} from '../../theme'
import {toPlatformUnit} from '../../utils'
import {ICON_BUTTON_TYPE} from './Icon-button.enum'
import {animateIconButton} from './Icon-button.handler'

export const useIconButtonAnimated = ({disabled, type = ICON_BUTTON_TYPE.FILLED}: UseIconButtonAnimatedOptions) => {
	const {token} = useTheme()
	const {border, colors, opacity} = token
	const animatedValue = disabled ? 0 : 1
	const borderSharedValue = useSharedValue(animatedValue)
	const colorSharedValue = useSharedValue(animatedValue)
	const animatedTiming = useAnimatedTiming()
	const disabledBackgroundColor = hexToRGBA(colors.onSurface, opacity.level2)
	const backgroundColorType = useMemo(
		() => ({
			[ICON_BUTTON_TYPE.FILLED]: {
				inputRanges: [0, 1],
				outputRanges: [disabledBackgroundColor, hexToRGBA(colors.primary, opacity.level10)]
			},
			[ICON_BUTTON_TYPE.OUTLINED]: {
				inputRanges: [0, 1],
				outputRanges: [hexToRGBA(colors.primary, opacity.level0), hexToRGBA(colors.primary, opacity.level0)]
			},
			[ICON_BUTTON_TYPE.SELECTED]: {
				inputRanges: [0, 1],
				outputRanges: [hexToRGBA(colors.primary, opacity.level0), hexToRGBA(colors.primary, opacity.level0)]
			},
			[ICON_BUTTON_TYPE.STANDARD]: {
				inputRanges: [0, 1],
				outputRanges: [hexToRGBA(colors.primary, opacity.level0), hexToRGBA(colors.primary, opacity.level0)]
			},
			[ICON_BUTTON_TYPE.TONAL]: {
				inputRanges: [0, 1],
				outputRanges: [disabledBackgroundColor, hexToRGBA(colors.secondaryContainer, opacity.level10)]
			}
		}),
		[disabledBackgroundColor, opacity, colors]
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
					[disabledBackgroundColor, colors.outline]
				),
				borderStyle: 'solid',
				borderWidth: toPlatformUnit(border[BORDER_SIZE.SMALL])
			} as ViewStyle))
	}))

	const runAnimate = useMemo(
		() => animateIconButton([borderSharedValue, colorSharedValue], animatedTiming, {type}),
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
