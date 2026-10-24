import type {ViewStyle} from 'react-native'

import {useEffect, useMemo} from 'react'
import Animated, {
	cancelAnimation,
	scrollTo,
	useAnimatedReaction,
	useAnimatedRef,
	useAnimatedStyle,
	useSharedValue
} from 'react-native-reanimated'

import type {UseVirtualListScrollAnimatedOptions} from './Virtual-list.interface'

import {ORIENTATION} from '../../constants'
import {useAnimatedTiming} from '../../hooks'
import {toPlatformUnit} from '../../utils'
import {animateVirtualList} from './Virtual-list.handler'

export const useVirtualListAnimated = ({
	contentSize = 0,
	focusedIndex = 0,
	itemSize = 0,
	orientation
}: UseVirtualListScrollAnimatedOptions) => {
	const animatedRef = useAnimatedRef<Animated.ScrollView>()
	const animatedTiming = useAnimatedTiming()
	const contentSharedValue = useSharedValue(contentSize)
	const lastScrollTo = useSharedValue(-1)
	const contentAnimatedStyle = useAnimatedStyle(() => ({
		...(orientation === ORIENTATION.VERTICAL &&
			({minHeight: toPlatformUnit(contentSharedValue.value)} as ViewStyle)),
		...(orientation === ORIENTATION.HORIZONTAL &&
			({minWidth: toPlatformUnit(contentSharedValue.value)} as ViewStyle))
	}))

	const runAnimate = useMemo(
		() => animateVirtualList(contentSharedValue, animatedTiming),
		[animatedTiming, contentSharedValue]
	)

	useAnimatedReaction(
		() => ({focusedIndex, itemSize, orientation}),
		({focusedIndex: nextFocusedIndex, itemSize: nextItemSize, orientation: nextOrientation}) => {
			if (!animatedRef.current) {
				return
			}

			const scrollToValue = nextFocusedIndex * nextItemSize

			if (lastScrollTo.value === scrollToValue) {
				return
			}

			lastScrollTo.value = scrollToValue

			if (nextOrientation === ORIENTATION.VERTICAL) {
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
