import {useEffect, useMemo} from 'react'
import type {ViewStyle} from 'react-native'
import Animated, {
	cancelAnimation,
	scrollTo,
	useAnimatedReaction,
	useAnimatedRef,
	useAnimatedStyle,
	useSharedValue
} from 'react-native-reanimated'

import {LAYOUT} from '../../constants'
import {useAnimatedTiming} from '../../hooks'
import {platformValue} from '../../utils'

import {animateVirtualList} from './Virtual-list.handler'
import type {UseVirtualListScrollAnimatedOptions} from './Virtual-list.interface'

export const useVirtualListAnimated = ({
	contentSize = 0,
	focusedIndex = 0,
	itemSize = 0,
	layoutType
}: UseVirtualListScrollAnimatedOptions) => {
	const animatedRef = useAnimatedRef<Animated.ScrollView>()
	const animatedTiming = useAnimatedTiming()
	const contentSharedValue = useSharedValue(contentSize)
	const lastScrollTo = useSharedValue(-1)
	const contentAnimatedStyle = useAnimatedStyle(() => ({
		...(layoutType === LAYOUT.VERTICAL && ({minHeight: platformValue(contentSharedValue.value)} as ViewStyle)),
		...(layoutType === LAYOUT.HORIZONTAL && ({minWidth: platformValue(contentSharedValue.value)} as ViewStyle))
	}))

	const runAnimate = useMemo(
		() => animateVirtualList(animatedTiming)(contentSharedValue),
		[animatedTiming, contentSharedValue]
	)

	useAnimatedReaction(
		() => ({focusedIndex, itemSize, layoutType}),
		({focusedIndex: nextFocusedIndex, itemSize: nextItemSize, layoutType: nextLayoutType}) => {
			if (!animatedRef.current) {
				return
			}

			const scrollToValue = nextFocusedIndex * nextItemSize

			if (lastScrollTo.value === scrollToValue) {
				return
			}

			lastScrollTo.value = scrollToValue

			if (nextLayoutType === LAYOUT.VERTICAL) {
				scrollTo(animatedRef, 0, scrollToValue, true)

				return
			}

			scrollTo(animatedRef, scrollToValue, 0, true)
		}
	)

	useEffect(() => {
		runAnimate(contentSize)
	}, [runAnimate, contentSize])

	useEffect(
		() => () => {
			cancelAnimation(contentSharedValue)
		},
		[contentSharedValue]
	)

	return {animatedRef, contentAnimatedStyle}
}
