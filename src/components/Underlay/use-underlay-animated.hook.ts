import {useEffect, useMemo} from 'react'
import {cancelAnimation, interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'

import type {UseUnderlayAnimatedOptions} from './Underlay.interface'

import {COMPONENT_STATUS, EVENT_NAME, type EventName} from '../../constants'
import {useAnimatedTiming, useTheme} from '../../hooks'
import {debounce} from '../../utils'
import {ACTIVE_ANIMATED} from './Underlay.enum'
import {animateUnderlayActiveState, animateUnderlayHoverState} from './Underlay.handler'

export const useUnderlayAnimated = ({
	active,
	activeAnimatedType = ACTIVE_ANIMATED.SCALE,
	activeScale,
	eventName,
	opacities: rawOpacities,
	status
}: UseUnderlayAnimatedOptions) => {
	const {token} = useTheme()
	const {opacity} = token
	const opacities = useMemo(
		() => rawOpacities ?? [opacity.level0, opacity.level1, opacity.level2],
		[rawOpacities, opacity]
	)

	const {scale = 1.2, scaleX = 1.2, scaleY = 1.2} = activeScale ?? {}
	const defaultScaleValue = active ? 1 : 0
	const activeValue = opacities.length - 1
	const hoverLayerSharedValue = useSharedValue(0)
	const activeLayerSharedValue = useSharedValue(typeof active === 'boolean' ? defaultScaleValue : 0)
	const animatedTiming = useAnimatedTiming()
	const opacityInputRanges = useMemo(() => opacities.map((_value, index) => index), [opacities])
	const hoverLayerAnimatedStyle = useAnimatedStyle(() => ({
		opacity: interpolate(hoverLayerSharedValue.value, opacityInputRanges, opacities)
	}))

	const activeLayerFadeAnimatedStyle = useAnimatedStyle(() => ({
		opacity: interpolate(activeLayerSharedValue.value, [0, 1], [opacity.level0, opacity.level10])
	}))

	const activeLayerScaleXAnimatedStyle = useAnimatedStyle(() => ({
		opacity: interpolate(activeLayerSharedValue.value, [0, 1], [opacity.level0, opacity.level10]),
		transform: [{scaleX: interpolate(activeLayerSharedValue.value, [0, 1], [0, scaleX])}]
	}))

	const activeLayerScaleYAnimatedStyle = useAnimatedStyle(() => ({
		opacity: interpolate(activeLayerSharedValue.value, [0, 1], [opacity.level0, opacity.level10]),
		transform: [{scaleY: interpolate(activeLayerSharedValue.value, [0, 1], [0, scaleY])}]
	}))

	const activeLayerScaleAnimatedStyle = useAnimatedStyle(() => ({
		opacity: interpolate(activeLayerSharedValue.value, [0, 1], [opacity.level0, opacity.level10]),
		transform: [{scale: interpolate(activeLayerSharedValue.value, [0, 1], [0, scale])}]
	}))

	const activeLayerAnimated = useMemo(
		() => ({
			[ACTIVE_ANIMATED.FADE]: activeLayerFadeAnimatedStyle,
			[ACTIVE_ANIMATED.SCALE]: activeLayerScaleAnimatedStyle,
			[ACTIVE_ANIMATED.SCALE_X]: activeLayerScaleXAnimatedStyle,
			[ACTIVE_ANIMATED.SCALE_Y]: activeLayerScaleYAnimatedStyle
		}),
		[
			activeLayerFadeAnimatedStyle,
			activeLayerScaleAnimatedStyle,
			activeLayerScaleXAnimatedStyle,
			activeLayerScaleYAnimatedStyle
		]
	)

	const runDebounceAnimateHoverState = useMemo(
		() => debounce(animateUnderlayHoverState({activeValue, animatedTiming})(hoverLayerSharedValue), 30),
		[animatedTiming, activeValue, hoverLayerSharedValue]
	)

	const runAnimateHoverState = useMemo(
		() => animateUnderlayHoverState({activeValue, animatedTiming})(hoverLayerSharedValue),
		[animatedTiming, activeValue, hoverLayerSharedValue]
	)

	const runAnimateActiveState = useMemo(
		() => animateUnderlayActiveState(animatedTiming)(activeLayerSharedValue),
		[animatedTiming, activeLayerSharedValue]
	)

	useEffect(() => {
		if (status !== COMPONENT_STATUS.SUCCEEDED) {
			return
		}

		const isDebounce =
			eventName && ([EVENT_NAME.HOVER_IN, EVENT_NAME.HOVER_OUT] as readonly EventName[]).includes(eventName)

		if (!isDebounce) {
			runAnimateHoverState(eventName)

			return
		}

		runDebounceAnimateHoverState(eventName)

		return () => runDebounceAnimateHoverState.cancel()
	}, [eventName, runAnimateHoverState, status, runDebounceAnimateHoverState])

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

	return {activeLayerAnimatedStyle: activeLayerAnimated[activeAnimatedType], hoverLayerAnimatedStyle}
}
