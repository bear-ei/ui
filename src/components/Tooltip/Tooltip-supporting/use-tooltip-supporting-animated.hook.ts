import {useEffect, useMemo} from 'react'
import {interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../../hooks'
import {TOOLTIP_TYPE} from '../Tooltip.enum'
import {animateTooltipSupporting} from './Tooltip-supporting.handler'
import type {UseTooltipSupportingAnimatedOptions} from './Tooltip-supporting.interface'

export const useTooltipSupportingAnimated = ({
	height = 0,
	onClose,
	type = TOOLTIP_TYPE.MENU,
	visible
}: UseTooltipSupportingAnimatedOptions) => {
	const heightSharedValue = useSharedValue(visible ? 1 : 0)
	const opacitySharedValue = useSharedValue(visible ? 1 : 0)
	const transformSharedValue = useSharedValue(visible ? 1 : 0)
	const theme = useTheme()
	const animatedTiming = useAnimatedTiming({token: theme.token})
	const animateSharedValueTo = useMemo(() => animatedTiming(), [animatedTiming])
	const animateSharedValueToWithCallback = useMemo(
		() =>
			animatedTiming({
				callback: (finished?: boolean) => finished && !visible && onClose?.(true)
			}),
		[animatedTiming, onClose, visible]
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
				animateSharedValueTo,
				animateSharedValueToWithCallback,
				onClose,
				type
			})({
				heightSharedValue,
				opacitySharedValue,
				transformSharedValue
			}),
		[
			animateSharedValueTo,
			animateSharedValueToWithCallback,
			heightSharedValue,
			onClose,
			opacitySharedValue,
			transformSharedValue,
			type
		]
	)

	useEffect(() => {
		runAnimate(visible)
	}, [runAnimate, visible])

	return {contentAnimatedStyle}
}
