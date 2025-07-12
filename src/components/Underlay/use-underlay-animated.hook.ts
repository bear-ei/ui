import {useEffect, useMemo} from 'react'
import {cancelAnimation, interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../hooks'
import {COMPONENT_STATUS} from '../Common'
import {ACTIVE_ANIMATED} from './Underlay.enum'
import {animateUnderlayActiveState, animateUnderlayHoverState} from './Underlay.handler'
import type {UseUnderlayAnimatedOptions} from './Underlay.interface'

export const useUnderlayAnimated = ({
	active,
	activeAnimatedType = ACTIVE_ANIMATED.SCALE,
	activeScale,
	eventName,
	opacities: rawOpacities,
	status
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
	const activeValue = opacities.length === 3 ? opacities.length - 1 : 0
	const hoverLayerSharedValue = useSharedValue(0)
	const activeLayerSharedValue = useSharedValue(typeof active === 'boolean' ? defaultScaleValue : 0)
	const animatedTiming = useAnimatedTiming({token: theme.token})
	const animateSharedValueTo = useMemo(() => animatedTiming(), [animatedTiming])
	const opacityInputRanges = useMemo(() => opacities.map((_value, index) => index), [opacities])
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

	const activeLayerAnimated = useMemo(
		() => ({
			[ACTIVE_ANIMATED.FADE]: activeLayerFadeAnimatedStyle,
			[ACTIVE_ANIMATED.SCALE_X]: activeLayerScaleXAnimatedStyle,
			[ACTIVE_ANIMATED.SCALE_Y]: activeLayerScaleYAnimatedStyle,
			[ACTIVE_ANIMATED.SCALE]: activeLayerScaleAnimatedStyle
		}),
		[
			activeLayerFadeAnimatedStyle,
			activeLayerScaleAnimatedStyle,
			activeLayerScaleXAnimatedStyle,
			activeLayerScaleYAnimatedStyle
		]
	)

	const runAnimateHoverState = useMemo(
		() => animateUnderlayHoverState({activeValue, animateSharedValueTo})(hoverLayerSharedValue),
		[animateSharedValueTo, activeValue, hoverLayerSharedValue]
	)

	const runAnimateActiveState = useMemo(
		() => animateUnderlayActiveState(animateSharedValueTo)(activeLayerSharedValue),
		[animateSharedValueTo, activeLayerSharedValue]
	)

	useEffect(() => {
		if (status === COMPONENT_STATUS.SUCCEEDED) {
			runAnimateHoverState(eventName)
		}
	}, [eventName, runAnimateHoverState, status])

	useEffect(() => {
		if (status === COMPONENT_STATUS.SUCCEEDED) {
			runAnimateActiveState(active)
		}
	}, [active, runAnimateActiveState, status])

	useEffect(
		() => () => {
			cancelAnimation(activeLayerSharedValue)
			cancelAnimation(hoverLayerSharedValue)
		},
		[activeLayerSharedValue, hoverLayerSharedValue]
	)

	return {hoverLayerAnimatedStyle, activeLayerAnimatedStyle: activeLayerAnimated[activeAnimatedType]}
}
