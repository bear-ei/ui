import {useEffect, useMemo} from 'react'
import {interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../hooks'
import {handleIconAnimatedTiming} from './Icon-handle'
import type {UseIconAnimatedOptions} from './Icon.interface'

export const useIconAnimated = ({eventName}: UseIconAnimatedOptions) => {
	const scaleSharedValue = useSharedValue(1)
	const theme = useTheme()
	const animatedTiming = useAnimatedTiming({token: theme.token})
	const containerAnimatedStyle = useAnimatedStyle(() => ({
		transform: [{scale: interpolate(scaleSharedValue.value, [0, 1, 2], [0.96, 1, 1.04])}]
	}))

	const onIconAnimatedTiming = useMemo(
		() => handleIconAnimatedTiming(animatedTiming)(scaleSharedValue),
		[animatedTiming, scaleSharedValue]
	)

	useEffect(() => {
		onIconAnimatedTiming(eventName)
	}, [eventName, onIconAnimatedTiming])

	return {containerAnimatedStyle}
}
