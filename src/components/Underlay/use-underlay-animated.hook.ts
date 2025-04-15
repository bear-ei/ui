import {useEffect, useMemo} from 'react'
import {cancelAnimation, interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../hooks'
import {debounce} from '../../utils'
import {handleUnderlayActiveAnimatedTiming, handleUnderlayHoveredAnimatedTiming} from './Underlay-handle'
import {ActiveAnimatedType} from './Underlay.enum'
import {UseUnderlayAnimatedOptions} from './Underlay.interface'

export const useUnderlayAnimated = ({
	active,
	activeAnimatedType = ActiveAnimatedType.SCALE,
	activeScale,
	eventName,
	opacities: rawOpacities
}: UseUnderlayAnimatedOptions) => {
	const theme = useTheme()
	const opacities = useMemo(
		() =>
			rawOpacities?.length ? rawOpacities : (
				[theme.token.opacity.level0, theme.token.opacity.level1, theme.token.opacity.level2]
			),
		[rawOpacities, theme.token.opacity.level0, theme.token.opacity.level1, theme.token.opacity.level2]
	)

	const {x: scaleX = 1.2, y: scaleY = 1.2} = activeScale ?? {}
	const defaultScaleValue = active ? 1 : 0
	const activeValue = useMemo(() => (opacities.length === 3 ? opacities.length - 1 : 0), [opacities.length])
	const hoverLayerSharedValue = useSharedValue(0)
	const activeLayerSharedValue = useSharedValue(typeof active === 'boolean' ? defaultScaleValue : 0)
	const animatedTiming = useAnimatedTiming({token: theme.token})
	const opacityInputRanges = opacities.map((_value, index) => index)
	const hoverLayerAnimatedStyle = useAnimatedStyle(() => ({
		opacity: interpolate(hoverLayerSharedValue.value, opacityInputRanges, opacities)
	}))

	const activeLayerFadeAnimatedStyle = useAnimatedStyle(() => ({
		opacity: interpolate(
			activeLayerSharedValue.value,
			[0, 1],
			[theme.token.opacity.level0, theme.token.opacity.level10]
		)
	}))

	const activeLayerScaleXAnimatedStyle = useAnimatedStyle(() => ({
		transform: [{scaleX: interpolate(activeLayerSharedValue.value, [0.3, 1], [0, scaleX])}],
		opacity: interpolate(
			activeLayerSharedValue.value,
			[0, 1],
			[theme.token.opacity.level0, theme.token.opacity.level10]
		)
	}))

	const activeLayerScaleYAnimatedStyle = useAnimatedStyle(() => ({
		transform: [{scaleY: interpolate(activeLayerSharedValue.value, [0.3, 1], [0, scaleY])}],
		opacity: interpolate(
			activeLayerSharedValue.value,
			[0, 1],
			[theme.token.opacity.level0, theme.token.opacity.level10]
		)
	}))

	const activeLayerScaleAnimatedStyle = useAnimatedStyle(() => ({
		transform: [{scale: interpolate(activeLayerSharedValue.value, [0.3, 1], [0, scaleY])}],
		opacity: interpolate(
			activeLayerSharedValue.value,
			[0, 1],
			[theme.token.opacity.level0, theme.token.opacity.level10]
		)
	}))

	const activeLayerAnimated = {
		[ActiveAnimatedType.FADE]: activeLayerFadeAnimatedStyle,
		[ActiveAnimatedType.SCALE_X]: activeLayerScaleXAnimatedStyle,
		[ActiveAnimatedType.SCALE_Y]: activeLayerScaleYAnimatedStyle,
		[ActiveAnimatedType.SCALE]: activeLayerScaleAnimatedStyle
	}

	const onUnderlayHoveredAnimatedTiming = useMemo(
		() =>
			debounce(
				handleUnderlayHoveredAnimatedTiming({activeValue, animatedTiming})(
					hoverLayerSharedValue
				)
			)(50),
		[animatedTiming, activeValue, hoverLayerSharedValue]
	)

	const onUnderlayActiveAnimatedTiming = useMemo(
		() => handleUnderlayActiveAnimatedTiming(animatedTiming)(activeLayerSharedValue),
		[animatedTiming, activeLayerSharedValue]
	)

	useEffect(() => {
		cancelAnimation(hoverLayerSharedValue)
		onUnderlayHoveredAnimatedTiming(eventName)
	}, [eventName, hoverLayerSharedValue, onUnderlayHoveredAnimatedTiming])

	useEffect(() => {
		onUnderlayActiveAnimatedTiming(active)
	}, [active, onUnderlayActiveAnimatedTiming])

	return {hoverLayerAnimatedStyle, activeLayerAnimatedStyle: activeLayerAnimated[activeAnimatedType]}
}
