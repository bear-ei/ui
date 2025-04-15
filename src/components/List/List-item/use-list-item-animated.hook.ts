import {useEffect, useMemo} from 'react'
import {interpolate, interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../../hooks'
import {
	handleListItemActiveAnimatedTiming,
	handleListItemAfterAffordanceVisibleAnimatedTiming
} from './List-item-handle'
import type {UseListItemAnimatedOptions} from './List-item.interface'

export const useListItemAnimated = ({
	active,
	afterAffordanceVisible,
	onListItemAfterAffordanceVisibleFinished
}: UseListItemAnimatedOptions) => {
	const theme = useTheme()
	const {spacing, palette, scheme, opacity} = theme.token
	const animatedTiming = useAnimatedTiming({token: theme.token})
	const contentLeftSharedValue = useSharedValue(0)
	const headlineTextSharedValue = useSharedValue(active ? 1 : 0)
	const contentLeftOutputRanges = [theme.adaptSize(spacing.none), -theme.adaptSize(spacing.extraSmall * 34)]
	const contentAnimatedStyle = useAnimatedStyle(() => ({
		left: interpolate(contentLeftSharedValue.value, [0, 1], contentLeftOutputRanges)
	}))

	const headlineTextColorOutputRanges = [
		palette.hexToRGBA(scheme.onSurface)(opacity.level10),
		palette.hexToRGBA(scheme.onSecondaryContainer)(opacity.level10)
	]

	const headlineTextAnimatedStyle = useAnimatedStyle(() => ({
		color: interpolateColor(headlineTextSharedValue.value, [0, 1], headlineTextColorOutputRanges)
	}))

	const onListItemAfterAffordanceVisibleAnimatedTiming = useMemo(
		() =>
			handleListItemAfterAffordanceVisibleAnimatedTiming({
				animatedTiming,
				onListItemAfterAffordanceVisibleFinished
			})(contentLeftSharedValue),
		[animatedTiming, contentLeftSharedValue, onListItemAfterAffordanceVisibleFinished]
	)

	const onListItemActiveAnimatedTiming = useMemo(
		() => handleListItemActiveAnimatedTiming(animatedTiming)(headlineTextSharedValue),
		[animatedTiming, headlineTextSharedValue]
	)

	useEffect(() => {
		onListItemAfterAffordanceVisibleAnimatedTiming(afterAffordanceVisible)
	}, [afterAffordanceVisible, onListItemAfterAffordanceVisibleAnimatedTiming])

	useEffect(() => {
		onListItemActiveAnimatedTiming(active)
	}, [active, onListItemActiveAnimatedTiming])

	return {contentAnimatedStyle, headlineTextAnimatedStyle}
}
