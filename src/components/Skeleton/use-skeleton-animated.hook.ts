import {useEffect, useMemo} from 'react'
import {cancelAnimation, interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'

import type {UseSkeletonAnimatedOptions} from './Skeleton.interface'

import {useAnimatedTiming, useTheme} from '../../hooks'
import {animateSkeleton} from './Skeleton.handler'

export const useSkeletonAnimated = ({enableAnimated, visible}: UseSkeletonAnimatedOptions) => {
	const {token} = useTheme()
	const {opacity} = token
	const opacitySharedValue = useSharedValue(0)
	const animatedTiming = useAnimatedTiming()
	const containerAnimatedStyle = useAnimatedStyle(() => ({
		opacity: interpolate(opacitySharedValue.value, [0, 1, 2], [opacity.level4, opacity.level7, opacity.level4])
	}))

	const runAnimate = useMemo(
		() => animateSkeleton(opacitySharedValue, animatedTiming, {enableAnimated}),
		[animatedTiming, enableAnimated, opacitySharedValue]
	)

	useEffect(() => {
		runAnimate(visible)
	}, [runAnimate, visible])

	useEffect(
		() => () => {
			cancelAnimation(opacitySharedValue)
		},
		[opacitySharedValue]
	)

	return {containerAnimatedStyle}
}
