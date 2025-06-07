import {useEffect, useMemo} from 'react'
import {interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../hooks'
import {animateSkeleton} from './Skeleton.handler'
import type {UseSkeletonAnimatedOptions} from './Skeleton.interface'

export const useSkeletonAnimated = ({enableAnimated, visible}: UseSkeletonAnimatedOptions) => {
	const opacitySharedValue = useSharedValue(0)
	const theme = useTheme()
	const animatedTiming = useAnimatedTiming({token: theme.token})
	const containerAnimatedStyle = useAnimatedStyle(() => ({
		opacity: interpolate(
			opacitySharedValue.value,
			[0, 1, 2],
			[theme.token.opacity.level4, theme.token.opacity.level10, theme.token.opacity.level4]
		)
	}))

	const runAnimate = useMemo(
		() => animateSkeleton({animatedTiming, enableAnimated})(opacitySharedValue),
		[animatedTiming, enableAnimated, opacitySharedValue]
	)

	useEffect(() => {
		runAnimate(visible)
	}, [runAnimate, visible])

	return {containerAnimatedStyle}
}
