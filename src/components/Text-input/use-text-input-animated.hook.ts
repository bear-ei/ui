import {useCallback, useEffect, useMemo} from 'react'
import {cancelAnimation, interpolate, interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {COMPONENT_STATUS, STATE} from '../../constants'
import {useAnimatedTiming, useTheme} from '../../hooks'
import {hexToRGBA} from '../../theme'
import {TEXT_INPUT_TYPE} from './Text-input.enum'
import {
	animateTextInputDisabledStateTiming,
	animateTextInputNonErrorStateTiming,
	animateTextInputStateTiming,
	createAnimateTextInputDisabledState,
	createAnimateTextInputEnabledState,
	createAnimateTextInputErrorState,
	createAnimateTextInputFocusedState
} from './Text-input.handler'
import type {UseTextInputAnimatedOptions} from './Text-input.interface'

export const useTextInputAnimated = ({
	disabled,
	error,
	state,
	status,
	type = TEXT_INPUT_TYPE.FILLED
}: UseTextInputAnimatedOptions) => {
	const {token} = useTheme()
	const disabledAnimatedValue = disabled ? 0 : 1
	const defaultAnimatedValue = {activeIndicatorScaleYSharedValue: error ? 1 : 0, colorSharedValue: error ? 3 : 1}
	const activeIndicatorScaleYSharedValue = useSharedValue(
		disabled ? disabledAnimatedValue : defaultAnimatedValue.activeIndicatorScaleYSharedValue
	)

	const headerInnerBackgroundColorSharedValue = useSharedValue(disabledAnimatedValue)
	const colorSharedValue = useSharedValue(disabled ? disabledAnimatedValue : defaultAnimatedValue.colorSharedValue)
	const animatedTiming = useAnimatedTiming()
	const disabledBackgroundColor = hexToRGBA(token.scheme.onSurface)(token.opacity.level1)
	const disabledColor = hexToRGBA(token.scheme.onSurface)(token.opacity.level5)
	const backgroundColorType = useMemo(
		() => ({
			[TEXT_INPUT_TYPE.FILLED]: {
				inputRanges: [0, 1],
				outputRanges: [
					disabledBackgroundColor,
					hexToRGBA(token.scheme.surfaceContainerHighest)(token.opacity.level10)
				]
			},
			[TEXT_INPUT_TYPE.OUTLINED]: {
				inputRanges: [0, 1],
				outputRanges: [
					hexToRGBA(token.scheme.surface)(token.opacity.level0),
					hexToRGBA(token.scheme.surface)(token.opacity.level0)
				]
			}
		}),
		[disabledBackgroundColor, token]
	)

	const headerAnimatedStyle = useAnimatedStyle(() => ({
		backgroundColor: interpolateColor(
			headerInnerBackgroundColorSharedValue.value,
			backgroundColorType[type].inputRanges,
			backgroundColorType[type].outputRanges
		)
	}))

	const inputColorOutputRanges = useMemo(
		() => [disabledColor, hexToRGBA(token.scheme.onSurface)(token.opacity.level10)],
		[disabledColor, token]
	)
	const inputAnimatedStyle = useAnimatedStyle(() => ({
		color: interpolateColor(colorSharedValue.value, [0, 1], inputColorOutputRanges)
	}))

	const activeIndicatorBackgroundColorOutputRanges = useMemo(
		() => [
			disabledColor,
			hexToRGBA(token.scheme.onSurfaceVariant)(token.opacity.level10),
			hexToRGBA(token.scheme.primary)(token.opacity.level10),
			hexToRGBA(token.scheme.error)(token.opacity.level10)
		],
		[disabledColor, token]
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
			createAnimateTextInputEnabledState(animatedTiming)({
				activeIndicatorScaleYSharedValue,
				colorSharedValue,
				headerInnerBackgroundColorSharedValue
			})(error),
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
			createAnimateTextInputDisabledState(animatedTiming)({
				activeIndicatorScaleYSharedValue,
				colorSharedValue,
				headerInnerBackgroundColorSharedValue
			}),
		[activeIndicatorScaleYSharedValue, animatedTiming, colorSharedValue, headerInnerBackgroundColorSharedValue]
	)

	const animateTextInputErrorState = useCallback(
		() =>
			createAnimateTextInputErrorState(animatedTiming)({
				activeIndicatorScaleYSharedValue,
				colorSharedValue,
				headerInnerBackgroundColorSharedValue
			}),
		[activeIndicatorScaleYSharedValue, animatedTiming, colorSharedValue, headerInnerBackgroundColorSharedValue]
	)

	const animateTextInputFocusedState = useCallback(
		() =>
			createAnimateTextInputFocusedState(animatedTiming)({
				activeIndicatorScaleYSharedValue,
				colorSharedValue,
				headerInnerBackgroundColorSharedValue
			})(error),
		[
			activeIndicatorScaleYSharedValue,
			animatedTiming,
			colorSharedValue,
			error,
			headerInnerBackgroundColorSharedValue
		]
	)

	const stateAnimated = useMemo(
		() => ({
			[STATE.DISABLED]: animateTextInputDisabledState,
			[STATE.ENABLED]: animateTextInputEnabledState,
			[STATE.ERROR]: animateTextInputErrorState,
			[STATE.FOCUSED]: animateTextInputFocusedState
		}),
		[
			animateTextInputDisabledState,
			animateTextInputEnabledState,
			animateTextInputErrorState,
			animateTextInputFocusedState
		]
	)

	const runAnimateState = useMemo(() => animateTextInputStateTiming(stateAnimated), [stateAnimated])
	const runAnimateNonErrorStateTiming = useMemo(
		() => animateTextInputNonErrorStateTiming({disabled, error})(stateAnimated),
		[disabled, error, stateAnimated]
	)

	const runAnimateDisabledStateTiming = useMemo(
		() => animateTextInputDisabledStateTiming(stateAnimated)(state),
		[state, stateAnimated]
	)

	useEffect(() => {
		if (status === COMPONENT_STATUS.SUCCEEDED) {
			runAnimateState(state)
		}
	}, [runAnimateState, state, status])

	useEffect(() => {
		if (status === COMPONENT_STATUS.SUCCEEDED) {
			runAnimateNonErrorStateTiming(state)
		}
	}, [runAnimateNonErrorStateTiming, state, status])

	useEffect(() => {
		if (status === COMPONENT_STATUS.SUCCEEDED) {
			runAnimateDisabledStateTiming(disabled)
		}
	}, [runAnimateDisabledStateTiming, disabled, status])

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
