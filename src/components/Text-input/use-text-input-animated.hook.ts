import {useCallback, useEffect, useMemo} from 'react'
import {cancelAnimation, interpolate, interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'

import type {UseTextInputAnimatedOptions} from './Text-input.interface'

import {COMPONENT_STATUS, STATE} from '../../constants'
import {useAnimatedTiming, useTheme} from '../../hooks'
import {hexToRGBA} from '../../theme'
import {TEXT_INPUT_TYPE} from './Text-input.enum'
import {
	animateTextInput,
	createAnimateTextInputDisabledState,
	createAnimateTextInputEnabledState,
	createAnimateTextInputErrorState,
	createAnimateTextInputFocusedState
} from './Text-input.handler'

export const useTextInputAnimated = ({
	disabled,
	error,
	state,
	status,
	type = TEXT_INPUT_TYPE.FILLED
}: UseTextInputAnimatedOptions) => {
	const {token} = useTheme()
	const {opacity, scheme} = token
	const disabledAnimatedValue = disabled ? 0 : 1
	const defaultAnimatedValue = {activeIndicatorScaleYSharedValue: error ? 1 : 0, colorSharedValue: error ? 3 : 1}
	const activeIndicatorScaleYSharedValue = useSharedValue(
		disabled ? disabledAnimatedValue : defaultAnimatedValue.activeIndicatorScaleYSharedValue
	)

	const headerInnerBackgroundColorSharedValue = useSharedValue(disabledAnimatedValue)
	const colorSharedValue = useSharedValue(disabled ? disabledAnimatedValue : defaultAnimatedValue.colorSharedValue)
	const animatedTiming = useAnimatedTiming()
	const disabledBackgroundColor = hexToRGBA(scheme.onSurface, opacity.level1)
	const disabledColor = hexToRGBA(scheme.onSurface, opacity.level5)
	const backgroundColorType = useMemo(
		() => ({
			[TEXT_INPUT_TYPE.FILLED]: {
				inputRanges: [0, 1],
				outputRanges: [disabledBackgroundColor, hexToRGBA(scheme.surfaceContainerHighest, opacity.level10)]
			},
			[TEXT_INPUT_TYPE.OUTLINED]: {
				inputRanges: [0, 1],
				outputRanges: [hexToRGBA(scheme.surface, opacity.level0), hexToRGBA(scheme.surface, opacity.level0)]
			}
		}),
		[disabledBackgroundColor, opacity, scheme]
	)

	const headerAnimatedStyle = useAnimatedStyle(() => ({
		backgroundColor: interpolateColor(
			headerInnerBackgroundColorSharedValue.value,
			backgroundColorType[type].inputRanges,
			backgroundColorType[type].outputRanges
		)
	}))

	const inputColorOutputRanges = useMemo(
		() => [disabledColor, hexToRGBA(scheme.onSurface, opacity.level10)],
		[disabledColor, opacity, scheme]
	)
	const inputAnimatedStyle = useAnimatedStyle(() => ({
		color: interpolateColor(colorSharedValue.value, [0, 1], inputColorOutputRanges)
	}))

	const activeIndicatorBackgroundColorOutputRanges = useMemo(
		() => [
			disabledColor,
			hexToRGBA(scheme.onSurfaceVariant, opacity.level10),
			hexToRGBA(scheme.primary, opacity.level10),
			hexToRGBA(scheme.error, opacity.level10)
		],
		[disabledColor, opacity, scheme]
	)

	const activeIndicatorAnimatedStyle = useAnimatedStyle(() => ({
		backgroundColor: interpolateColor(
			colorSharedValue.value,
			[0, 1, 2, 3],
			activeIndicatorBackgroundColorOutputRanges
		),
		transform: [{scaleY: interpolate(activeIndicatorScaleYSharedValue.value, [0, 1], [0.5, 1])}]
	}))

	const animateTextInputEnabledState = useCallback(
		() =>
			createAnimateTextInputEnabledState(
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

	const animateTextInputDisabledState = useCallback(
		() =>
			createAnimateTextInputDisabledState(
				[activeIndicatorScaleYSharedValue, colorSharedValue, headerInnerBackgroundColorSharedValue],
				animatedTiming
			),
		[activeIndicatorScaleYSharedValue, animatedTiming, colorSharedValue, headerInnerBackgroundColorSharedValue]
	)

	const animateTextInputErrorState = useCallback(
		() =>
			createAnimateTextInputErrorState(
				[activeIndicatorScaleYSharedValue, colorSharedValue, headerInnerBackgroundColorSharedValue],
				animatedTiming
			),
		[activeIndicatorScaleYSharedValue, animatedTiming, colorSharedValue, headerInnerBackgroundColorSharedValue]
	)

	const animateTextInputFocusedState = useCallback(
		() =>
			createAnimateTextInputFocusedState(
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
					[STATE.DISABLED]: animateTextInputDisabledState,
					[STATE.ENABLED]: animateTextInputEnabledState,
					[STATE.ERROR]: animateTextInputErrorState,
					[STATE.FOCUSED]: animateTextInputFocusedState
				},
				{disabled, error}
			),
		[
			animateTextInputDisabledState,
			animateTextInputEnabledState,
			animateTextInputErrorState,
			animateTextInputFocusedState,
			disabled,
			error
		]
	)

	useEffect(() => {
		if (status !== COMPONENT_STATUS.SUCCEEDED) {
			return
		}

		runAnimateTextInput(state)
	}, [runAnimateTextInput, state, status])

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
