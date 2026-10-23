import type {ViewStyle} from 'react-native'

import {useEffect, useMemo} from 'react'
import {cancelAnimation, interpolate, interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'

import type {UseListItemAnimatedOptions} from './List-item.interface'

import {COMPONENT_STATUS} from '../../../constants'
import {useAnimatedTiming, useTheme} from '../../../hooks'
import {DENSITY_SIZE, hexToRGBA} from '../../../theme'
import {platformValue} from '../../../utils'
import {animateListItemActiveState, animateListItemAffordanceVisible} from './List-item.handler'

export const useListItemAnimated = ({active, afterAffordanceVisible, status}: UseListItemAnimatedOptions) => {
	const {token} = useTheme()
	const {density, opacity, scheme} = token
	const animatedTiming = useAnimatedTiming()
	const contentTransformXSharedValue = useSharedValue(0)
	const headlineTextSharedValue = useSharedValue(active ? 1 : 0)
	const contentTranslateXOutputRanges = useMemo(
		() => [density.spacing[DENSITY_SIZE.NONE], -density.control[DENSITY_SIZE.XX_LARGE] * 2],
		[density]
	)

	const contentAnimatedStyle = useAnimatedStyle(
		() =>
			({
				transform: [
					{
						translateX: platformValue(
							interpolate(contentTransformXSharedValue.value, [0, 1], contentTranslateXOutputRanges)
						)
					}
				]
			}) as ViewStyle
	)

	const headlineTextColorOutputRanges = useMemo(
		() => [hexToRGBA(scheme.onSurface, opacity.level10), hexToRGBA(scheme.onSecondaryContainer, opacity.level10)],
		[scheme, opacity]
	)

	const headlineTextAnimatedStyle = useAnimatedStyle(() => ({
		color: interpolateColor(headlineTextSharedValue.value, [0, 1], headlineTextColorOutputRanges)
	}))

	const runAnimateVisible = useMemo(
		() => animateListItemAffordanceVisible(contentTransformXSharedValue, animatedTiming),
		[animatedTiming, contentTransformXSharedValue]
	)

	const runAnimateActiveState = useMemo(
		() => animateListItemActiveState(headlineTextSharedValue, animatedTiming),
		[animatedTiming, headlineTextSharedValue]
	)

	useEffect(() => {
		if (status === COMPONENT_STATUS.SUCCEEDED) {
			runAnimateVisible(afterAffordanceVisible)
		}
	}, [afterAffordanceVisible, runAnimateVisible, status])

	useEffect(() => {
		if (status === COMPONENT_STATUS.SUCCEEDED) {
			runAnimateActiveState(active)
		}
	}, [active, runAnimateActiveState, status])

	useEffect(
		() => () => {
			cancelAnimation(contentTransformXSharedValue)
			cancelAnimation(headlineTextSharedValue)
		},
		[contentTransformXSharedValue, headlineTextSharedValue]
	)

	return {contentAnimatedStyle, headlineTextAnimatedStyle}
}
