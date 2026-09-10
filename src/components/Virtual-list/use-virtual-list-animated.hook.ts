import {LAYOUT} from '@/constants'
import {useAnimatedTiming, useTheme} from '@/hooks'
import {platformValue} from '@/utils'
import {DURATION} from '@bearei/theme-token'
import {useEffect, useMemo} from 'react'
import type {ViewStyle} from 'react-native'
import Animated, {
	cancelAnimation,
	scrollTo,
	useAnimatedRef,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue
} from 'react-native-reanimated'
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
		...(layoutType === LAYOUT.VERTICAL && ({minHeight: platformValue(contentSharedValue.value)} as ViewStyle)),
		...(layoutType === LAYOUT.HORIZONTAL && ({minWidth: platformValue(contentSharedValue.value)} as ViewStyle))
	}))

	const runAnimate = useMemo(
		() => animateVirtualList(animateSharedValueTo)(contentSharedValue),
		[animateSharedValueTo, contentSharedValue]
	)

	useDerivedValue(() => {
		if (!animatedRef.current) {
			return
		}

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
