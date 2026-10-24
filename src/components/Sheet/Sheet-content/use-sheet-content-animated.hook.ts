import {useEffect, useMemo} from 'react'
import {cancelAnimation, interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'

import type {UseSheetContentAnimatedOptions} from './Sheet-content.interface'

import {useAnimatedTiming, useTheme} from '../../../hooks'
import {hexToRGBA} from '../../../theme'
import {SHEET_TYPE} from '../Sheet.enum'
import {animateSheetContent} from './Sheet-content.handler'

export const useSheetContentAnimated = ({type = SHEET_TYPE.SIDEBAR, visible}: UseSheetContentAnimatedOptions) => {
	const {token} = useTheme()
	const {colors, opacity} = token
	const animatedTiming = useAnimatedTiming()
	const backgroundColorSharedValue = useSharedValue(visible ? 1 : 0)
	const containerBackgroundColorOutputRanges = useMemo(
		() => [
			hexToRGBA(colors.scrim, opacity.level0),
			type === SHEET_TYPE.SIDEBAR ?
				hexToRGBA(colors.scrim, opacity.level0)
			:	hexToRGBA(colors.scrim, opacity.level4)
		],
		[opacity, colors, type]
	)

	const containerAnimatedStyle = useAnimatedStyle(() => ({
		backgroundColor: interpolateColor(
			backgroundColorSharedValue.value,
			[0, 1],
			containerBackgroundColorOutputRanges
		)
	}))

	const runAnimate = useMemo(
		() => animateSheetContent(backgroundColorSharedValue, animatedTiming),
		[backgroundColorSharedValue, animatedTiming]
	)

	useEffect(() => {
		runAnimate(visible)
	}, [runAnimate, visible])

	useEffect(
		() => () => {
			cancelAnimation(backgroundColorSharedValue)
		},
		[backgroundColorSharedValue]
	)

	return {containerAnimatedStyle}
}
