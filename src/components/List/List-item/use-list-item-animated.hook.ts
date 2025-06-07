import {hexToRGBA} from '@bearei/material-token'
import {useEffect, useMemo} from 'react'
import {interpolate, interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../../hooks'
import {animateListItemActiveState, animateListItemAffordanceVisibility} from './List-item.handler'
import type {UseListItemAnimatedOptions} from './List-item.interface'

export const useListItemAnimated = ({
	active,
	afterAffordanceVisible,
	onAfterAffordanceVisibilityFinished
}: UseListItemAnimatedOptions) => {
	const theme = useTheme()
	const {spacing, scheme, opacity} = theme.token
	const animatedTiming = useAnimatedTiming({token: theme.token})
	const contentLeftSharedValue = useSharedValue(0)
	const headlineTextSharedValue = useSharedValue(active ? 1 : 0)
	const contentLeftOutputRanges = useMemo(
		() => [theme.adaptSize(spacing.none), -theme.adaptSize(spacing.extraSmall * 34)],
		[spacing.extraSmall, spacing.none, theme]
	)

	const contentAnimatedStyle = useAnimatedStyle(() => ({
		left: interpolate(contentLeftSharedValue.value, [0, 1], contentLeftOutputRanges)
	}))

	const headlineTextColorOutputRanges = useMemo(
		() => [
			hexToRGBA(scheme.onSurface)(opacity.level10),
			hexToRGBA(scheme.onSecondaryContainer)(opacity.level10)
		],
		[opacity.level10, scheme.onSecondaryContainer, scheme.onSurface]
	)

	const headlineTextAnimatedStyle = useAnimatedStyle(() => ({
		color: interpolateColor(headlineTextSharedValue.value, [0, 1], headlineTextColorOutputRanges)
	}))

	const runAnimateVisibility = useMemo(
		() =>
			animateListItemAffordanceVisibility({animatedTiming, onAfterAffordanceVisibilityFinished})(
				contentLeftSharedValue
			),
		[animatedTiming, contentLeftSharedValue, onAfterAffordanceVisibilityFinished]
	)

	const runAnimateActiveState = useMemo(
		() => animateListItemActiveState(animatedTiming)(headlineTextSharedValue),
		[animatedTiming, headlineTextSharedValue]
	)

	useEffect(() => {
		runAnimateVisibility(afterAffordanceVisible)
	}, [afterAffordanceVisible, runAnimateVisibility])

	useEffect(() => {
		runAnimateActiveState(active)
	}, [active, runAnimateActiveState])

	return {contentAnimatedStyle, headlineTextAnimatedStyle}
}
