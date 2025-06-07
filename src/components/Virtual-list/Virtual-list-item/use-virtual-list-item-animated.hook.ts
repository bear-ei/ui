import {useEffect, useMemo} from 'react'
import {useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../../hooks'
import {animateVirtualListItem} from './Virtual-list-item.handler'
import type {UseVirtualListItemAnimatedOptions} from './Virtual-list-item.interface'

export const useVirtualListItemAnimated = ({offsetY = 0}: UseVirtualListItemAnimatedOptions) => {
	const theme = useTheme()
	const animatedTiming = useAnimatedTiming({token: theme.token})
	const topSharedValue = useSharedValue(offsetY)
	const containerAnimatedStyle = useAnimatedStyle(() => ({top: topSharedValue.value}))
	const runAnimate = useMemo(
		() => animateVirtualListItem(animatedTiming)(topSharedValue),
		[animatedTiming, topSharedValue]
	)

	useEffect(() => {
		runAnimate(offsetY)
	}, [runAnimate, offsetY])

	return {containerAnimatedStyle}
}
