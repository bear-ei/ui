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
import {LAYOUT} from '../Common'
import {animateVirtualList} from './Virtual-list.handler'
import type {UseVirtualListScrollAnimatedOptions} from './Virtual-list.interface'

export const useVirtualListAnimated = ({
	contentSize = 0,
	focusedIndex = 0,
	itemSize = 0,
	layoutType
}: UseVirtualListScrollAnimatedOptions) => {
	const theme = useTheme()
	const animatedRef = useAnimatedRef<Animated.ScrollView>()
	const animatedTiming = useAnimatedTiming({token: theme.token})
	const animateSharedValueTo = useMemo(() => animatedTiming({duration: DURATION.SHORT_2}), [animatedTiming])
	const contentSharedValue = useSharedValue(contentSize)
	const scrollSharedValue = useSharedValue(0)
	const contentAnimatedStyle = useAnimatedStyle(() => ({
		...(layoutType === LAYOUT.VERTICAL && {minHeight: contentSharedValue.value}),
		...(layoutType === LAYOUT.HORIZONTAL && {minWidth: contentSharedValue.value})
	}))

	const runAnimate = useMemo(
		() => animateVirtualList(animateSharedValueTo)(contentSharedValue),
		[animateSharedValueTo, contentSharedValue]
	)

	useDerivedValue(() => {
		const scrollToValue = focusedIndex * itemSize

		if (layoutType === LAYOUT.VERTICAL) {
			scrollTo(animatedRef, 0, scrollToValue, true)

			return
		}

		scrollTo(animatedRef, scrollToValue, 0, true)
	})

	useEffect(() => {
		runAnimate(contentSize)
	}, [runAnimate, contentSize])

	useEffect(
		() => () => {
			cancelAnimation(contentSharedValue)
			cancelAnimation(scrollSharedValue)
		},
		[contentSharedValue, scrollSharedValue]
	)

	return {animatedRef, contentAnimatedStyle}
}
