import {COMPONENT_STATUS, STATE} from '@/constants'
import {useAnimatedTiming, useTheme} from '@/hooks'
import {hexToRGBA} from '@bearei/theme-token'
import {useCallback, useEffect, useMemo} from 'react'
import {cancelAnimation, interpolate, interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
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
        const theme = useTheme()
        const {scheme, opacity} = theme.token
        const disabledAnimatedValue = disabled ? 0 : 1
        const defaultAnimatedValue = {
                activeIndicatorScaleYSharedValue: error ? 1 : 0,
                colorSharedValue: error ? 3 : 1,
                inputColorSharedValue: error ? 3 : 1,
                supportingTextSharedValueValue: error ? 2 : 1
        }

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
        const backgroundColorType = {
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
        }

        const headerAnimatedStyle = useAnimatedStyle(() => ({
                backgroundColor: interpolateColor(
                        headerInnerBackgroundColorSharedValue.value,
                        backgroundColorType[type].inputRanges,
                        backgroundColorType[type].outputRanges
                )
        }))

        const inputColorSharedValueOutputRanges = [disabledColor, hexToRGBA(scheme.onSurface)(opacity.level10)]
        const inputAnimatedStyle = useAnimatedStyle(() => ({
                color: interpolateColor(colorSharedValue.value, [0, 1], inputColorSharedValueOutputRanges)
        }))

        const activeIndicatorBackgroundColorOutputRanges = [
                disabledColor,
                hexToRGBA(scheme.onSurfaceVariant)(opacity.level10),
                hexToRGBA(scheme.primary)(opacity.level10),
                hexToRGBA(scheme.error)(opacity.level10)
        ]

        const activeIndicatorAnimatedStyle = useAnimatedStyle(() => ({
                backgroundColor: interpolateColor(
                        colorSharedValue.value,
                        [0, 1, 2, 3],
                        activeIndicatorBackgroundColorOutputRanges
                ),
                transform: [{scaleY: interpolate(activeIndicatorScaleYSharedValue.value, [0, 1], [0.5, 1])}]
        }))

        const supportingTextSharedValueColorOutputRanges = [
                disabledColor,
                hexToRGBA(scheme.onSurfaceVariant)(opacity.level10),
                hexToRGBA(scheme.error)(opacity.level10)
        ]

        const supportingTextAnimatedStyle = useAnimatedStyle(() => ({
                color: interpolateColor(
                        supportingTextSharedValue.value,
                        [0, 1, 2],
                        supportingTextSharedValueColorOutputRanges
                )
        }))

        const animateTextInputEnabledState = useCallback(
                () =>
                        createAnimateTextInputEnabledState(animateSharedValueTo)({
                                activeIndicatorScaleYSharedValue,
                                colorSharedValue,
                                inputColorSharedValue,
                                supportingTextSharedValue
                        })(error),
                [
                        activeIndicatorScaleYSharedValue,
                        animateSharedValueTo,
                        colorSharedValue,
                        error,
                        inputColorSharedValue,
                        supportingTextSharedValue
                ]
        )

        const animateTextInputDisabledState = useCallback(
                () =>
                        createAnimateTextInputDisabledState(animateSharedValueTo)({
                                activeIndicatorScaleYSharedValue,
                                colorSharedValue,
                                headerInnerBackgroundColorSharedValue,
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
                                colorSharedValue
                        })(error),
                [activeIndicatorScaleYSharedValue, animateSharedValueTo, colorSharedValue, error]
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
                        cancelAnimation(inputColorSharedValue)
                        cancelAnimation(supportingTextSharedValue)
                },
                [
                        activeIndicatorScaleYSharedValue,
                        colorSharedValue,
                        headerInnerBackgroundColorSharedValue,
                        inputColorSharedValue,
                        supportingTextSharedValue
                ]
        )

        return {
                activeIndicatorAnimatedStyle,
                headerAnimatedStyle,
                inputAnimatedStyle,
                supportingTextAnimatedStyle
        }
}
