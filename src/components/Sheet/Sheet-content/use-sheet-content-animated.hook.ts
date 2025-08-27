import {hexToRGBA} from '@bearei/element-token'
import {useEffect, useMemo} from 'react'
import {cancelAnimation, interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../../hooks'
import {SIDE_SHEET_TYPE} from '../Sheet.enum'
import {animateSheetContent} from './Sheet-content.handler'
import type {UseSheetContentAnimatedOptions} from './Sheet-content.interface'

export const useSheetContentAnimated = ({type = SIDE_SHEET_TYPE.SIDEBAR, visible}: UseSheetContentAnimatedOptions) => {
	const animatedValue = visible ? 1 : 0
	const theme = useTheme()
	const {scheme, opacity} = theme.token
	const animatedTiming = useAnimatedTiming({token: theme.token})
	const animateSharedValueTo = useMemo(() => animatedTiming(), [animatedTiming])
	const backgroundColorSharedValue = useSharedValue(animatedValue)
	const containerBackgroundColorOutputRanges = useMemo(
		() => [
			hexToRGBA(scheme.scrim)(opacity.level0),
			type === SIDE_SHEET_TYPE.SIDEBAR ?
				hexToRGBA(scheme.scrim)(opacity.level0)
			:	hexToRGBA(scheme.scrim)(opacity.level4)
		],
		[opacity.level0, opacity.level4, scheme.scrim, type]
	)

	const containerAnimatedStyle = useAnimatedStyle(() => ({
		backgroundColor: interpolateColor(
			backgroundColorSharedValue.value,
			[0, 1],
			containerBackgroundColorOutputRanges
		)
	}))

	const runAnimate = useMemo(
		() => animateSheetContent(animateSharedValueTo)(backgroundColorSharedValue),
		[backgroundColorSharedValue, animateSharedValueTo]
	)

	useEffect(() => {
		runAnimate(visible)
	}, [runAnimate, visible])

	useEffect(() => () => cancelAnimation(backgroundColorSharedValue), [backgroundColorSharedValue])

	return {containerAnimatedStyle}
}
