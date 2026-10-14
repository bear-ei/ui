import {useEffect, useMemo} from 'react'
import {cancelAnimation, interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useAnimatedTiming, useTheme} from '../../hooks'
import {animateSkeleton} from './Skeleton.handler'
import type {UseSkeletonAnimatedOptions} from './Skeleton.interface'

export const useSkeletonAnimated = ({enableAnimated, visible}: UseSkeletonAnimatedOptions) => {
	const opacitySharedValue = useSharedValue(0)
	const {token} = useTheme()
	const animatedTiming = useAnimatedTiming()
	const containerAnimatedStyle = useAnimatedStyle(() => ({
		opacity: interpolate(
			opacitySharedValue.value,
			[0, 1, 2],
			[token.opacity.level4, token.opacity.level7, token.opacity.level4]
		)
	}))

	const runAnimate = useMemo(
		() => animateSkeleton({animatedTiming, enableAnimated})(opacitySharedValue),
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
