import {hexToRGBA} from '@bearei/element-token'
import {useEffect, useMemo} from 'react'
import {cancelAnimation, interpolate, interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../../hooks'
import {COMPONENT_STATUS} from '../../Common'
import {animateListItemActiveState, animateListItemAffordanceVisibility} from './List-item.handler'
import type {UseListItemAnimatedOptions} from './List-item.interface'

export const useListItemAnimated = ({active, afterAffordanceVisible, status}: UseListItemAnimatedOptions) => {
	const theme = useTheme()
	const {spacing, scheme, opacity} = theme.token
	const animatedTiming = useAnimatedTiming({token: theme.token})
	const animateSharedValueTo = useMemo(() => animatedTiming(), [animatedTiming])
	const contentTransformSharedValue = useSharedValue(0)
	const headlineTextSharedValue = useSharedValue(active ? 1 : 0)
	const contentTranslateXOutputRanges = useMemo(
		() => [theme.adaptSize(spacing.none), -theme.adaptSize(spacing.extraSmall * 34)],
		[spacing.extraSmall, spacing.none, theme]
	)

	const contentAnimatedStyle = useAnimatedStyle(() => ({
		transform: [
			{
				translateX: interpolate(
					contentTransformSharedValue.value,
					[0, 1],
					contentTranslateXOutputRanges
				)
			}
		]
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
		() => animateListItemAffordanceVisibility(animateSharedValueTo)(contentTransformSharedValue),
		[animateSharedValueTo, contentTransformSharedValue]
	)

	const runAnimateActiveState = useMemo(
		() => animateListItemActiveState(animateSharedValueTo)(headlineTextSharedValue),
		[animateSharedValueTo, headlineTextSharedValue]
	)

	useEffect(() => {
		if (status === COMPONENT_STATUS.SUCCEEDED) {
			runAnimateVisibility(afterAffordanceVisible)
		}
	}, [afterAffordanceVisible, runAnimateVisibility, status])

	useEffect(() => {
		if (status === COMPONENT_STATUS.SUCCEEDED) {
			runAnimateActiveState(active)
		}
	}, [active, runAnimateActiveState, status])

	useEffect(
		() => () => {
			cancelAnimation(contentTransformSharedValue)
			cancelAnimation(headlineTextSharedValue)
		},
		[contentTransformSharedValue, headlineTextSharedValue]
	)

	return {contentAnimatedStyle, headlineTextAnimatedStyle}
}
