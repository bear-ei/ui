import {DURATION, EASING} from '@bearei/element-token'
import {useEffect, useMemo} from 'react'
import {cancelAnimation, interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../../hooks'
import {COMPONENT_STATUS} from '../../Common'
import {TOOLTIP_TYPE} from '../Tooltip.enum'
import {animateTooltipSupporting} from './Tooltip-supporting.handler'
import type {UseTooltipSupportingAnimatedOptions} from './Tooltip-supporting.interface'

export const useTooltipSupportingAnimated = ({
	height = 0,
	onClose,
	status,
	type = TOOLTIP_TYPE.PLAIN,
	visible
}: UseTooltipSupportingAnimatedOptions) => {
	const isVisible = visible && status === COMPONENT_STATUS.SUCCEEDED
	const heightSharedValue = useSharedValue(isVisible ? 1 : 0)
	const opacitySharedValue = useSharedValue(isVisible ? 1 : 0)
	const transformSharedValue = useSharedValue(isVisible ? 1 : 0)
	const theme = useTheme()
	const animatedTiming = useAnimatedTiming({token: theme.token})
	const createEntrySharedValueAnimator = useMemo(
		() => animatedTiming({duration: DURATION.MEDIUM_3, easing: EASING.EMPHASIZED_DECELERATE}),
		[animatedTiming]
	)

	const createExitSharedValueAnimator = useMemo(
		() =>
			animatedTiming({
				callback: (finished?: boolean) => finished && !isVisible && onClose?.(true),
				duration: DURATION.SHORT_3,
				easing: EASING.EMPHASIZED_ACCELERATE
			}),
		[animatedTiming, isVisible, onClose]
	)

	const contentAnimatedStyle = useAnimatedStyle(() => ({
		opacity: interpolate(
			opacitySharedValue.value,
			[0, 1],
			[theme.token.opacity.level0, theme.token.opacity.level10]
		),

		...(type === TOOLTIP_TYPE.MENU ?
			{height: interpolate(heightSharedValue.value, [0, 1], [0, height])}
		:	{transform: [{scale: interpolate(transformSharedValue.value, [0, 1], [0.8, 1])}]})
	}))

	const runAnimate = useMemo(
		() =>
			animateTooltipSupporting({
				createEntrySharedValueAnimator,
				createExitSharedValueAnimator,
				onClose,
				type
			})({
				heightSharedValue,
				opacitySharedValue,
				transformSharedValue
			}),
		[
			createEntrySharedValueAnimator,
			createExitSharedValueAnimator,
			heightSharedValue,
			onClose,
			opacitySharedValue,
			transformSharedValue,
			type
		]
	)

	useEffect(() => {
		runAnimate(isVisible)
	}, [runAnimate, isVisible])

	useEffect(
		() => () => {
			cancelAnimation(heightSharedValue)
			cancelAnimation(opacitySharedValue)
			cancelAnimation(transformSharedValue)
		},
		[heightSharedValue, opacitySharedValue, transformSharedValue]
	)

	return {contentAnimatedStyle}
}
