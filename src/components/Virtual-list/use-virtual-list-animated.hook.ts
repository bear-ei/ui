import {DURATION} from '@bearei/element-token'
import {useEffect, useMemo} from 'react'
import Animated, {
	cancelAnimation,
	scrollTo,
	useAnimatedRef,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue
} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../hooks'
import {animateVirtualList} from './Virtual-list.handler'
import type {UseVirtualListScrollAnimatedOptions} from './Virtual-list.interface'

export const useVirtualListAnimated = ({
	contentSize = 0,
	focusedIndex = 0,
	itemSize = 0
}: UseVirtualListScrollAnimatedOptions) => {
	const theme = useTheme()
	const animatedRef = useAnimatedRef<Animated.ScrollView>()
	const animatedTiming = useAnimatedTiming({token: theme.token})
	const animateSharedValueTo = useMemo(() => animatedTiming({duration: DURATION.SHORT_2}), [animatedTiming])
	const contentHeightSharedValue = useSharedValue(contentSize)
	const scrollYSharedValue = useSharedValue(0)
	const contentAnimatedStyle = useAnimatedStyle(() => ({minHeight: contentHeightSharedValue.value}))
	const runAnimate = useMemo(
		() => animateVirtualList(animateSharedValueTo)(contentHeightSharedValue),
		[contentHeightSharedValue, animateSharedValueTo]
	)

	useDerivedValue(() => scrollTo(animatedRef, focusedIndex * itemSize, scrollYSharedValue.value, true))

	useEffect(() => {
		runAnimate(contentSize)
	}, [runAnimate, contentSize])

	useEffect(
		() => () => {
			cancelAnimation(contentHeightSharedValue)
			cancelAnimation(scrollYSharedValue)
		},
		[contentHeightSharedValue, scrollYSharedValue]
	)

	return {animatedRef, contentAnimatedStyle}
}
