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
import {LAYOUT} from '../../constants'
import {useAnimatedTiming, useTheme} from '../../hooks'
import {platformValue} from '../../theme'
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
	const contentSharedValue = useSharedValue(contentSize)
	const lastScrollTo = useSharedValue(-1)
	const scrollSharedValue = useSharedValue(0)
	const contentAnimatedStyle = useAnimatedStyle(() => ({
		...(layoutType === LAYOUT.VERTICAL && ({minHeight: platformValue(contentSharedValue.value)} as ViewStyle)),
		...(layoutType === LAYOUT.HORIZONTAL && ({minWidth: platformValue(contentSharedValue.value)} as ViewStyle))
	}))

	const runAnimate = useMemo(
		() => animateVirtualList(animatedTiming)(contentSharedValue),
		[animatedTiming, contentSharedValue]
	)

	useDerivedValue(() => {
		if (!animatedRef.current) {
			return
		}

		const scrollToValue = focusedIndex * itemSize

		if (lastScrollTo.value === scrollToValue) {
			return
		}

		lastScrollTo.value = scrollToValue

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
