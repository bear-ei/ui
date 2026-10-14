import {useEffect, useMemo} from 'react'
import {cancelAnimation, interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useAnimatedTiming, useTheme} from '../../../hooks'
import {hexToRGBA} from '../../../theme'
import {SIDE_SHEET_TYPE} from '../Sheet.enum'
import {animateSheetContent} from './Sheet-content.handler'
import type {UseSheetContentAnimatedOptions} from './Sheet-content.interface'

export const useSheetContentAnimated = ({type = SIDE_SHEET_TYPE.SIDEBAR, visible}: UseSheetContentAnimatedOptions) => {
	const {token} = useTheme()
	const animatedTiming = useAnimatedTiming()
	const backgroundColorSharedValue = useSharedValue(visible ? 1 : 0)
	const containerBackgroundColorOutputRanges = useMemo(
		() => [
			hexToRGBA(token.scheme.scrim)(token.opacity.level0),
			type === SIDE_SHEET_TYPE.SIDEBAR ?
				hexToRGBA(token.scheme.scrim)(token.opacity.level0)
			:	hexToRGBA(token.scheme.scrim)(token.opacity.level4)
		],
		[token, type]
	)

	const containerAnimatedStyle = useAnimatedStyle(() => ({
		backgroundColor: interpolateColor(
			backgroundColorSharedValue.value,
			[0, 1],
			containerBackgroundColorOutputRanges
		)
	}))

	const runAnimate = useMemo(
		() => animateSheetContent(animatedTiming)(backgroundColorSharedValue),
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
