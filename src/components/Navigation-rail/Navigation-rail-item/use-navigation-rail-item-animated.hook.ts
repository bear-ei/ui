import {hexToRGBA} from '@bearei/material-token'
import {useEffect, useMemo} from 'react'
import {interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../../hooks'
import {animateNavigationRailItemLabel} from './Navigation-rail-item.handler'
import type {UseNavigationRailItemAnimatedOptions} from './Navigation-rail-item.interface'

export const useNavigationRailItemAnimated = ({active, type}: UseNavigationRailItemAnimatedOptions) => {
	const theme = useTheme()
	const {scheme, opacity} = theme.token
	const animatedTiming = useAnimatedTiming({token: theme.token})
	const labelTextColorSharedValue = useSharedValue(active ? 1 : 0)
	const labelTextColorOutputRanges = useMemo(
		() => [
			hexToRGBA(scheme.onSurfaceVariant)(opacity.level10),
			hexToRGBA(scheme.onSurface)(opacity.level10)
		],
		[opacity.level10, scheme.onSurface, scheme.onSurfaceVariant]
	)

	const labelTextAnimatedStyle = useAnimatedStyle(() => ({
		color: interpolateColor(labelTextColorSharedValue.value, [0, 1], labelTextColorOutputRanges)
	}))

	const runAnimateNavigationRailItemLabelEffect = useMemo(
		() => animateNavigationRailItemLabel({animatedTiming, type})(labelTextColorSharedValue),
		[animatedTiming, labelTextColorSharedValue, type]
	)

	useEffect(() => {
		runAnimateNavigationRailItemLabelEffect(active)
	}, [active, runAnimateNavigationRailItemLabelEffect])

	return {labelTextAnimatedStyle}
}
