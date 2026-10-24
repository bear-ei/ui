import {useCallback, useEffect, useMemo} from 'react'
import {cancelAnimation, interpolate, interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'

import type {UseTextInputAnimatedOptions} from './Text-input.interface'

import {COMPONENT_STATUS, INTERACTION_STATE} from '../../constants'
import {useAnimatedTiming, useTheme} from '../../hooks'
import {hexToRGBA} from '../../theme'
import {TEXT_INPUT_TYPE} from './Text-input.enum'
import {
	animateTextInput,
	animateTextInputDisabledState,
	animateTextInputEnabledState,
	animateTextInputErrorState,
	animateTextInputFocusedState
} from './Text-input.handler'

export const useTextInputAnimated = ({
	disabled,
	error,
	interactionState,
	status,
	type = TEXT_INPUT_TYPE.FILLED
}: UseTextInputAnimatedOptions) => {
	const {token} = useTheme()
	const {colors, opacity} = token
	const disabledAnimatedValue = disabled ? 0 : 1
	const defaultAnimatedValue = {activeIndicatorScaleYSharedValue: error ? 1 : 0, colorSharedValue: error ? 3 : 1}
	const activeIndicatorScaleYSharedValue = useSharedValue(
		disabled ? disabledAnimatedValue : defaultAnimatedValue.activeIndicatorScaleYSharedValue
	)

	const headerInnerBackgroundColorSharedValue = useSharedValue(disabledAnimatedValue)
	const colorSharedValue = useSharedValue(disabled ? disabledAnimatedValue : defaultAnimatedValue.colorSharedValue)
	const animatedTiming = useAnimatedTiming()
	const disabledBackgroundColor = hexToRGBA(colors.onSurface, opacity.level1)
	const disabledColor = hexToRGBA(colors.onSurface, opacity.level5)
	const backgroundColorType = useMemo(
		() => ({
			[TEXT_INPUT_TYPE.FILLED]: {
				inputRanges: [0, 1],
				outputRanges: [disabledBackgroundColor, hexToRGBA(colors.surfaceContainerHighest, opacity.level10)]
			},
			[TEXT_INPUT_TYPE.OUTLINED]: {
				inputRanges: [0, 1],
				outputRanges: [hexToRGBA(colors.surface, opacity.level0), hexToRGBA(colors.surface, opacity.level0)]
			}
		}),
		[disabledBackgroundColor, opacity, colors]
	)

	const headerAnimatedStyle = useAnimatedStyle(() => ({
		backgroundColor: interpolateColor(
			headerInnerBackgroundColorSharedValue.value,
			backgroundColorType[type].inputRanges,
			backgroundColorType[type].outputRanges
		)
	}))

	const inputColorOutputRanges = useMemo(
		() => [disabledColor, hexToRGBA(colors.onSurface, opacity.level10)],
		[disabledColor, opacity, colors]
	)
	const inputAnimatedStyle = useAnimatedStyle(() => ({
		color: interpolateColor(colorSharedValue.value, [0, 1], inputColorOutputRanges)
	}))

	const activeIndicatorBackgroundColorOutputRanges = useMemo(
		() => [
			disabledColor,
			hexToRGBA(colors.onSurfaceVariant, opacity.level10),
			hexToRGBA(colors.primary, opacity.level10),
			hexToRGBA(colors.error, opacity.level10)
		],
		[disabledColor, opacity, colors]
	)

	const activeIndicatorAnimatedStyle = useAnimatedStyle(() => ({
		backgroundColor: interpolateColor(
			colorSharedValue.value,
			[0, 1, 2, 3],
			activeIndicatorBackgroundColorOutputRanges
		),
		transform: [{scaleY: interpolate(activeIndicatorScaleYSharedValue.value, [0, 1], [0.5, 1])}]
	}))

	const runAnimateTextInputEnabledState = useCallback(
		() =>
			animateTextInputEnabledState(
				[activeIndicatorScaleYSharedValue, colorSharedValue, headerInnerBackgroundColorSharedValue],
				animatedTiming,
				error
			),
		[
			activeIndicatorScaleYSharedValue,
			animatedTiming,
			colorSharedValue,
			error,
			headerInnerBackgroundColorSharedValue
		]
	)

	const runAnimateTextInputDisabledState = useCallback(
		() =>
			animateTextInputDisabledState(
				[activeIndicatorScaleYSharedValue, colorSharedValue, headerInnerBackgroundColorSharedValue],
				animatedTiming
			),
		[activeIndicatorScaleYSharedValue, animatedTiming, colorSharedValue, headerInnerBackgroundColorSharedValue]
	)

	const runAnimateTextInputErrorState = useCallback(
		() =>
			animateTextInputErrorState(
				[activeIndicatorScaleYSharedValue, colorSharedValue, headerInnerBackgroundColorSharedValue],
				animatedTiming
			),
		[activeIndicatorScaleYSharedValue, animatedTiming, colorSharedValue, headerInnerBackgroundColorSharedValue]
	)

	const runAnimateTextInputFocusedState = useCallback(
		() =>
			animateTextInputFocusedState(
				[activeIndicatorScaleYSharedValue, colorSharedValue, headerInnerBackgroundColorSharedValue],
				animatedTiming,
				error
			),
		[
			activeIndicatorScaleYSharedValue,
			animatedTiming,
			colorSharedValue,
			error,
			headerInnerBackgroundColorSharedValue
		]
	)

	const runAnimateTextInput = useMemo(
		() =>
			animateTextInput(
				{
					[INTERACTION_STATE.DISABLED]: runAnimateTextInputDisabledState,
					[INTERACTION_STATE.ENABLED]: runAnimateTextInputEnabledState,
					[INTERACTION_STATE.ERROR]: runAnimateTextInputErrorState,
					[INTERACTION_STATE.FOCUSED]: runAnimateTextInputFocusedState
				},
				{disabled, error}
			),
		[
			runAnimateTextInputDisabledState,
			runAnimateTextInputEnabledState,
			runAnimateTextInputErrorState,
			runAnimateTextInputFocusedState,
			disabled,
			error
		]
	)

	useEffect(() => {
		if (status !== COMPONENT_STATUS.SUCCEEDED) {
			return
		}

		runAnimateTextInput(interactionState)
	}, [runAnimateTextInput, interactionState, status])

	useEffect(
		() => () => {
			cancelAnimation(activeIndicatorScaleYSharedValue)
			cancelAnimation(colorSharedValue)
			cancelAnimation(headerInnerBackgroundColorSharedValue)
		},
		[activeIndicatorScaleYSharedValue, colorSharedValue, headerInnerBackgroundColorSharedValue]
	)

	return {activeIndicatorAnimatedStyle, headerAnimatedStyle, inputAnimatedStyle}
}
