import {DURATION} from '@bearei/element-token'
import {useEffect, useMemo} from 'react'
import {cancelAnimation, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../../hooks'
import {animateVirtualListItem} from './Virtual-list-item.handler'
import type {UseVirtualListItemAnimatedOptions} from './Virtual-list-item.interface'

export const useVirtualListItemAnimated = ({offsetY = 0}: UseVirtualListItemAnimatedOptions) => {
	const theme = useTheme()
	const animatedTiming = useAnimatedTiming({token: theme.token})
	const animateSharedValueTo = useMemo(() => animatedTiming({duration: DURATION.SHORT_2}), [animatedTiming])
	const translateYSharedValue = useSharedValue(offsetY)
	const containerAnimatedStyle = useAnimatedStyle(() => ({
		transform: [{translateY: translateYSharedValue.value}]
	}))

	const runAnimate = useMemo(
		() => animateVirtualListItem(animateSharedValueTo)(translateYSharedValue),
		[animateSharedValueTo, translateYSharedValue]
	)

	useEffect(() => {
		runAnimate(offsetY)
	}, [runAnimate, offsetY])

	useEffect(
		() => () => {
			cancelAnimation(translateYSharedValue)
		},
		[translateYSharedValue]
	)

	return {containerAnimatedStyle}
}
