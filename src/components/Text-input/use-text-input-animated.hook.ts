import {hexToRGBA} from '@bearei/material-token'
import {useCallback, useEffect, useMemo} from 'react'
import {cancelAnimation, interpolate, interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../hooks'
import {DENSITY_SCALE, STATE} from '../Common'
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
	density,
	disabled,
	error,
	filled,
	state,
	type = TEXT_INPUT_TYPE.FILLED
}: UseTextInputAnimatedOptions) => {
	const theme = useTheme()
	const {scheme, opacity} = theme.token
	const densityScale = DENSITY_SCALE[density ?? theme.density] * theme.token.spacing.extraSmall
	const disabledAnimatedValue = disabled ? 0 : 1
	const defaultAnimatedValue = useMemo(
		() => ({
			activeIndicatorScaleYSharedValue: error ? 1 : 0,
			colorSharedValue: error ? 3 : 1,
			inputColorSharedValue: error ? 3 : 1,
			supportingTextSharedValueValue: error ? 2 : 1
		}),
		[error]
	)

	const activeIndicatorScaleYSharedValue = useSharedValue(
		disabled ? disabledAnimatedValue : defaultAnimatedValue.activeIndicatorScaleYSharedValue
	)

	const headerInnerBackgroundColorSharedValue = useSharedValue(disabledAnimatedValue)
	const colorSharedValue = useSharedValue(
		disabled ? disabledAnimatedValue : defaultAnimatedValue.colorSharedValue
	)

	const inputColorSharedValue = useSharedValue(
		disabled ? disabledAnimatedValue : defaultAnimatedValue.inputColorSharedValue
	)

	const supportingTextSharedValue = useSharedValue(
		disabled ? disabledAnimatedValue : defaultAnimatedValue.supportingTextSharedValueValue
	)

	const animatedTiming = useAnimatedTiming({token: theme.token})
	const animateSharedValueTo = useMemo(() => animatedTiming(), [animatedTiming])
	const disabledBackgroundColor = hexToRGBA(scheme.onSurface)(opacity.level2)
	const disabledColor = hexToRGBA(scheme.onSurface)(opacity.level5)
	const filledToValue = filled ? 0 : 1
	const labelTextSharedValue = useSharedValue(filledToValue)
	const backgroundColorType = useMemo(
		() => ({
			[TEXT_INPUT_TYPE.FILLED]: {
				inputRanges: [0, 1],
				outputRanges: [
					disabledBackgroundColor,
					hexToRGBA(scheme.surfaceContainerHighest)(opacity.level10)
				]
			},
			[TEXT_INPUT_TYPE.OUTLINED]: {
				inputRanges: [0, 1],
				outputRanges: [
					hexToRGBA(scheme.surface)(opacity.level0),
					hexToRGBA(scheme.surface)(opacity.level0)
				]
			}
		}),
		[
			disabledBackgroundColor,
			opacity.level0,
			opacity.level10,
			scheme.surface,
			scheme.surfaceContainerHighest
		]
	)

	const headerAnimatedStyle = useAnimatedStyle(() => ({
		backgroundColor: interpolateColor(
			headerInnerBackgroundColorSharedValue.value,
			backgroundColorType[type].inputRanges,
			backgroundColorType[type].outputRanges
		)
	}))

	const inputColorSharedValueOutputRanges = useMemo(
		() => [disabledColor, hexToRGBA(scheme.onSurface)(opacity.level10)],
		[disabledColor, opacity.level10, scheme.onSurface]
	)

	const inputAnimatedStyle = useAnimatedStyle(() => ({
		color: interpolateColor(colorSharedValue.value, [0, 1], inputColorSharedValueOutputRanges)
	}))

	const labelTranslateYOutputRanges = useMemo(
		() => [
			-theme.adaptSize(theme.token.spacing.small + densityScale / 2),
			theme.adaptSize(theme.token.spacing.none)
		],
		[densityScale, theme]
	)

	const labelAnimatedStyle = useAnimatedStyle(() => ({
		transform: [{translateY: interpolate(labelTextSharedValue.value, [0, 1], labelTranslateYOutputRanges)}]
	}))

	const labelTextColorOutputRanges = useMemo(
		() => [
			disabledColor,
			hexToRGBA(scheme.onSurfaceVariant)(opacity.level10),
			hexToRGBA(scheme.primary)(opacity.level10),
			hexToRGBA(scheme.error)(opacity.level10)
		],
		[disabledColor, opacity.level10, scheme.error, scheme.onSurfaceVariant, scheme.primary]
	)

	const labelTextAnimatedStyle = useAnimatedStyle(() => ({
		color: interpolateColor(colorSharedValue.value, [0, 1, 2, 3], labelTextColorOutputRanges),
		transform: [{scale: interpolate(labelTextSharedValue.value, [0, 1], [0.75, 1])}]
	}))

	const activeIndicatorBackgroundColorOutputRanges = useMemo(
		() => [
			disabledColor,
			hexToRGBA(scheme.onSurfaceVariant)(opacity.level10),
			hexToRGBA(scheme.primary)(opacity.level10),
			hexToRGBA(scheme.error)(opacity.level10)
		],
		[disabledColor, opacity.level10, scheme.error, scheme.onSurfaceVariant, scheme.primary]
	)

	const activeIndicatorAnimatedStyle = useAnimatedStyle(() => ({
		backgroundColor: interpolateColor(
			colorSharedValue.value,
			[0, 1, 2, 3],
			activeIndicatorBackgroundColorOutputRanges
		),
		transform: [{scaleY: interpolate(activeIndicatorScaleYSharedValue.value, [0, 1], [0.3333, 1])}]
	}))

	const supportingTextSharedValueValueColorOutputRanges = useMemo(
		() => [
			disabledColor,
			hexToRGBA(scheme.onSurfaceVariant)(opacity.level10),
			hexToRGBA(scheme.error)(opacity.level10)
		],
		[disabledColor, opacity.level10, scheme.error, scheme.onSurfaceVariant]
	)

	const supportingTextAnimatedStyle = useAnimatedStyle(() => ({
		color: interpolateColor(
			supportingTextSharedValue.value,
			[0, 1, 2],
			supportingTextSharedValueValueColorOutputRanges
		)
	}))

	const animateTextInputEnabledState = useCallback(
		() =>
			createAnimateTextInputEnabledState(animateSharedValueTo)({
				activeIndicatorScaleYSharedValue,
				colorSharedValue,
				inputColorSharedValue,
				labelTextSharedValue,
				supportingTextSharedValue
			})({error, filledToValue}),
		[
			activeIndicatorScaleYSharedValue,
			animateSharedValueTo,
			colorSharedValue,
			error,
			filledToValue,
			inputColorSharedValue,
			labelTextSharedValue,
			supportingTextSharedValue
		]
	)

	const animateTextInputDisabledState = useCallback(
		() =>
			createAnimateTextInputDisabledState(animateSharedValueTo)({
				activeIndicatorScaleYSharedValue,
				headerInnerBackgroundColorSharedValue,
				colorSharedValue,
				inputColorSharedValue,
				supportingTextSharedValue
			}),
		[
			activeIndicatorScaleYSharedValue,
			animateSharedValueTo,
			colorSharedValue,
			headerInnerBackgroundColorSharedValue,
			inputColorSharedValue,
			supportingTextSharedValue
		]
	)

	const animateTextInputErrorState = useCallback(
		() =>
			createAnimateTextInputErrorState(animateSharedValueTo)({
				activeIndicatorScaleYSharedValue,
				colorSharedValue,
				inputColorSharedValue,
				supportingTextSharedValue
			}),
		[
			activeIndicatorScaleYSharedValue,
			animateSharedValueTo,
			colorSharedValue,
			inputColorSharedValue,
			supportingTextSharedValue
		]
	)

	const animateTextInputFocusedState = useCallback(
		() =>
			createAnimateTextInputFocusedState(animateSharedValueTo)({
				activeIndicatorScaleYSharedValue,
				colorSharedValue,
				labelTextSharedValue
			})(error),
		[activeIndicatorScaleYSharedValue, animateSharedValueTo, colorSharedValue, error, labelTextSharedValue]
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
		runAnimateState(state)
	}, [runAnimateState, state])

	useEffect(() => {
		runAnimateNonErrorStateTiming(state)
	}, [runAnimateNonErrorStateTiming, state])

	useEffect(() => {
		runAnimateDisabledStateTiming(disabled)
	}, [runAnimateDisabledStateTiming, disabled])

	useEffect(
		() => () => {
			cancelAnimation(activeIndicatorScaleYSharedValue)
			cancelAnimation(colorSharedValue)
			cancelAnimation(headerInnerBackgroundColorSharedValue)
			cancelAnimation(inputColorSharedValue)
			cancelAnimation(labelTextSharedValue)
			cancelAnimation(supportingTextSharedValue)
		},
		[
			activeIndicatorScaleYSharedValue,
			colorSharedValue,
			headerInnerBackgroundColorSharedValue,
			inputColorSharedValue,
			labelTextSharedValue,
			supportingTextSharedValue
		]
	)

	return {
		activeIndicatorAnimatedStyle,
		headerAnimatedStyle,
		inputAnimatedStyle,
		labelAnimatedStyle,
		labelTextAnimatedStyle,
		supportingTextAnimatedStyle
	}
}
