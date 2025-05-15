import {useEffect, useMemo} from 'react'
import {useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../../hooks'
import {createStableHandler} from '../../../utils'
import {animateVirtualListItem} from './Virtual-list-item.handle'
import type {UseVirtualListItemAnimatedOptions} from './Virtual-list-item.interface'

export const useVirtualListItemAnimated = ({offsetY = 0}: UseVirtualListItemAnimatedOptions) => {
	const theme = useTheme()
	const animatedTiming = useAnimatedTiming({token: theme.token})
	const topSharedValue = useSharedValue(offsetY)
	const containerAnimatedStyle = useAnimatedStyle(() => ({top: topSharedValue.value}))
	const animateVirtualListItemEffect = useMemo(
		() => createStableHandler(animateVirtualListItem(animatedTiming)(topSharedValue))(),
		[animatedTiming, topSharedValue]
	)

	useEffect(() => {
		animateVirtualListItemEffect(offsetY)
	}, [offsetY, animateVirtualListItemEffect])

	return {containerAnimatedStyle}
}
