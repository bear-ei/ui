import {hexToRGBA} from '@bearei/material-token'
import {useEffect, useMemo} from 'react'
import {interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../../hooks'
import {SIDE_SHEET_TYPE} from '../Side-sheet.enum'
import {animateSideSheetContent} from './Side-sheet-content.handle'
import type {UseSideSheetContentAnimatedOptions} from './Side-sheet-content.interface'

export const useSideSheetContentAnimated = ({
	type = SIDE_SHEET_TYPE.STANDARD,
	visible
}: UseSideSheetContentAnimatedOptions) => {
	const animatedValue = visible ? 1 : 0
	const theme = useTheme()
	const {scheme, opacity} = theme.token
	const animatedTiming = useAnimatedTiming({token: theme.token})
	const backgroundColorSharedValue = useSharedValue(animatedValue)
	const sideSheetTypes = [SIDE_SHEET_TYPE.STANDARD, SIDE_SHEET_TYPE.SIDEBAR] as const
	const isStandard = sideSheetTypes.includes(type as (typeof sideSheetTypes)[number])
	const containerBackgroundColorOutputRanges = useMemo(
		() => [
			hexToRGBA(scheme.scrim)(opacity.level0),
			isStandard ? hexToRGBA(scheme.scrim)(opacity.level0) : hexToRGBA(scheme.scrim)(opacity.level4)
		],
		[isStandard, opacity.level0, opacity.level4, scheme.scrim]
	)

	const containerAnimatedStyle = useAnimatedStyle(() => ({
		backgroundColor: interpolateColor(
			backgroundColorSharedValue.value,
			[0, 1],
			containerBackgroundColorOutputRanges
		)
	}))

	const runAnimateSideSheetContentEffect = useMemo(
		() => animateSideSheetContent(animatedTiming)(backgroundColorSharedValue),
		[animatedTiming, backgroundColorSharedValue]
	)

	useEffect(() => {
		runAnimateSideSheetContentEffect(visible)
	}, [runAnimateSideSheetContentEffect, visible])

	return {containerAnimatedStyle}
}
