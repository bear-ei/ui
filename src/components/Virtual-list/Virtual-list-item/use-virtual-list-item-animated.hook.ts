import {useEffect, useMemo} from 'react'
import {cancelAnimation, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../../hooks'
import {COMPONENT_STATUS, LAYOUT} from '../../Common'
import {animateVirtualListItem} from './Virtual-list-item.handler'
import type {UseVirtualListItemAnimatedOptions} from './Virtual-list-item.interface'

export const useVirtualListItemAnimated = ({
	dragging,
	layout,
	offset = 0,
	status
}: UseVirtualListItemAnimatedOptions) => {
	const theme = useTheme()
	const animatedTiming = useAnimatedTiming({token: theme.token})
	const animateSharedValueTo = useMemo(() => animatedTiming(), [animatedTiming])
	const translateSharedValue = useSharedValue(offset)
	const containerAnimatedStyle = useAnimatedStyle(() => ({
		...(layout === LAYOUT.VERTICAL && {transform: [{translateY: translateSharedValue.value}]}),
		...(layout === LAYOUT.HORIZONTAL && {transform: [{translateX: translateSharedValue.value}]})
	}))

	const runAnimate = useMemo(
		() => animateVirtualListItem(animateSharedValueTo)(translateSharedValue),
		[animateSharedValueTo, translateSharedValue]
	)

	useEffect(() => {
		if (status === COMPONENT_STATUS.SUCCEEDED && !dragging) {
			runAnimate(offset)
		}
	}, [dragging, offset, runAnimate, status])

	useEffect(() => () => cancelAnimation(translateSharedValue), [translateSharedValue])

	return {containerAnimatedStyle}
}
