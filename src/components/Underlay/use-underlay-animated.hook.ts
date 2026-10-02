import {useEffect, useMemo} from 'react'
import {cancelAnimation, interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {COMPONENT_STATUS, EVENT_NAME, type EventName} from '../../constants'
import {useAnimatedTiming, useTheme} from '../../hooks'
import {debounce} from '../../utils'
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
	const {token} = useTheme()
	const {opacity} = token
	const opacities = useMemo(
		() => (rawOpacities?.length ? rawOpacities : [opacity.level0, opacity.level1, opacity.level2]),
		[opacity, rawOpacities]
	)

	const {x: scaleX = 1.2, y: scaleY = 1.2} = activeScale ?? {}
	const defaultScaleValue = active ? 1 : 0
	const activeValue = opacities.length === 3 ? opacities.length - 1 : 0
	const hoverLayerSharedValue = useSharedValue(0)
	const activeLayerSharedValue = useSharedValue(typeof active === 'boolean' ? defaultScaleValue : 0)
	const animatedTiming = useAnimatedTiming({token})
	const animateSharedValueTo = useMemo(() => animatedTiming(), [animatedTiming])
	const opacityInputRanges = useMemo(() => opacities.map((_value, index) => index), [opacities])
	const hoverLayerAnimatedStyle = useAnimatedStyle(() => ({
		opacity: interpolate(hoverLayerSharedValue.value, opacityInputRanges, opacities)
	}))

	const activeLayerFadeAnimatedStyle = useAnimatedStyle(() => ({
		opacity: interpolate(activeLayerSharedValue.value, [0, 1], [opacity.level0, opacity.level10])
	}))

	const activeLayerScaleXAnimatedStyle = useAnimatedStyle(() => ({
		transform: [{scaleX: interpolate(activeLayerSharedValue.value, [0, 1], [0, scaleX])}],
		opacity: interpolate(activeLayerSharedValue.value, [0, 1], [opacity.level0, opacity.level10])
	}))

	const activeLayerScaleYAnimatedStyle = useAnimatedStyle(() => ({
		transform: [{scaleY: interpolate(activeLayerSharedValue.value, [0, 1], [0, scaleY])}],
		opacity: interpolate(activeLayerSharedValue.value, [0, 1], [opacity.level0, opacity.level10])
	}))

	const activeLayerScaleAnimatedStyle = useAnimatedStyle(() => ({
		transform: [{scale: interpolate(activeLayerSharedValue.value, [0, 1], [0, scaleY])}],
		opacity: interpolate(activeLayerSharedValue.value, [0, 1], [opacity.level0, opacity.level10])
	}))

	const activeLayerAnimated = {
		[ACTIVE_ANIMATED.FADE]: activeLayerFadeAnimatedStyle,
		[ACTIVE_ANIMATED.SCALE_X]: activeLayerScaleXAnimatedStyle,
		[ACTIVE_ANIMATED.SCALE_Y]: activeLayerScaleYAnimatedStyle,
		[ACTIVE_ANIMATED.SCALE]: activeLayerScaleAnimatedStyle
	}

	const runDebounceAnimateHoverState = useMemo(
		() => debounce(animateUnderlayHoverState({activeValue, animateSharedValueTo})(hoverLayerSharedValue))(30),
		[animateSharedValueTo, activeValue, hoverLayerSharedValue]
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
		if (status !== COMPONENT_STATUS.SUCCEEDED) {
			return
		}

		const isDebounce =
			eventName && ([EVENT_NAME.HOVER_IN, EVENT_NAME.HOVER_OUT] as readonly EventName[]).includes(eventName)

		if (isDebounce) {
			runDebounceAnimateHoverState(eventName)

			return
		}

		runAnimateHoverState(eventName)
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

	return {hoverLayerAnimatedStyle, activeLayerAnimatedStyle: activeLayerAnimated[activeAnimatedType]}
}
