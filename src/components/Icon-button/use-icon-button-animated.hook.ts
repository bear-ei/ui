import {hexToRGBA} from '@bearei/material-token'
import {useEffect, useMemo} from 'react'
import {interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../hooks'
import {handleIconButtonAnimatedTiming} from './Icon-button-handle'
import {ICON_BUTTON_TYPE} from './Icon-button.enum'
import type {UseIconButtonAnimatedOptions} from './Icon-button.interface'

export const useIconButtonAnimated = ({disabled, type = ICON_BUTTON_TYPE.FILLED}: UseIconButtonAnimatedOptions) => {
	const animatedValue = disabled ? 0 : 1
	const borderSharedValue = useSharedValue(animatedValue)
	const colorSharedValue = useSharedValue(animatedValue)
	const theme = useTheme()
	const {scheme, opacity} = theme.token
	const animatedTiming = useAnimatedTiming({token: theme.token})
	const disabledBackgroundColor = hexToRGBA(scheme.onSurface)(opacity.level2)
	const backgroundColorType = {
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
			outputRanges: [disabledBackgroundColor, hexToRGBA(scheme.secondaryContainer)(opacity.level10)]
		},
		[ICON_BUTTON_TYPE.ACTIVE]: {
			inputRanges: [0, 1],
			outputRanges: [
				hexToRGBA(scheme.primary)(opacity.level0),
				hexToRGBA(scheme.primary)(opacity.level0)
			]
		}
	}

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

	const onIconButtonAnimatedTiming = useMemo(
		() =>
			handleIconButtonAnimatedTiming({animatedTiming, type})({
				borderSharedValue,
				colorSharedValue
			}),
		[animatedTiming, borderSharedValue, colorSharedValue, type]
	)

	useEffect(() => {
		onIconButtonAnimatedTiming(disabled)
	}, [disabled, onIconButtonAnimatedTiming, type])

	return {backgroundUnderlayAnimatedStyle}
}
