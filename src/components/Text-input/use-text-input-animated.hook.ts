import {useCallback, useEffect, useMemo} from 'react'
import {interpolate, interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../hooks'
import {
        handleTextInputDisabled,
        handleTextInputDisabledAnimatedTiming,
        handleTextInputEnabled,
        handleTextInputError,
        handleTextInputFocused,
        handleTextInputNonerrorAnimatedTiming,
        handleTextInputStateAnimatedTiming
} from './Text-input-handle'
import {TextInputStateAnimated, UseTextInputAnimatedOptions} from './Text-input.interface'

export const useTextInputAnimated = ({
        disabled,
        error,
        filled,
        state,
        type = 'filled'
}: UseTextInputAnimatedOptions) => {
        const theme = useTheme()
        const {palette, scheme, spacing, typography, opacity} = theme.token
        const {hexToRGBA} = palette
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
        const disabledBackgroundColor = hexToRGBA(scheme.onSurface)(opacity.level2)
        const disabledColor = hexToRGBA(scheme.onSurface)(opacity.level5)
        const filledToValue = filled ? 0 : 1
        const labelTextSharedValue = useSharedValue(filledToValue)
        const backgroundColorType = {
                filled: {
                        inputRange: [0, 1],
                        outputRange: [
                                disabledBackgroundColor,
                                hexToRGBA(scheme.surfaceContainerHighest)(opacity.level10)
                        ]
                },
                outlined: {
                        inputRange: [0, 1],
                        outputRange: [
                                hexToRGBA(scheme.surface)(opacity.level0),
                                hexToRGBA(scheme.surface)(opacity.level0)
                        ]
                }
        }

        const headerAnimatedStyle = useAnimatedStyle(() => ({
                backgroundColor: interpolateColor(
                        headerInnerBackgroundColorSharedValue.value,
                        backgroundColorType[type].inputRange,
                        backgroundColorType[type].outputRange
                )
        }))

        const inputColorSharedValueOutputRange = [disabledColor, hexToRGBA(scheme.onSurface)(opacity.level10)]
        const inputAnimatedStyle = useAnimatedStyle(() => ({
                color: interpolateColor(colorSharedValue.value, [0, 1], inputColorSharedValueOutputRange)
        }))

        const labelTranslateYOutputRange = [-theme.adaptSize(spacing.small), theme.adaptSize(spacing.none)]
        const labelAnimatedStyle = useAnimatedStyle(() => ({
                transform: [
                        {
                                translateY: interpolate(labelTextSharedValue.value, [0, 1], labelTranslateYOutputRange)
                        }
                ]
        }))

        const labelTextFontSizeOutputRange = [
                theme.adaptFontSize(typography.body.small.size),
                theme.adaptFontSize(typography.body.large.size)
        ]

        const labelTextLetterSpacingOutputRange = [
                theme.adaptSize(typography.body.small.letterSpacing),
                theme.adaptSize(typography.body.large.letterSpacing)
        ]

        const labelTextHeightOutputRange = [
                theme.adaptSize(typography.body.small.lineHeight),
                theme.adaptSize(typography.body.large.lineHeight)
        ]

        const labelTextColorOutputRange = [
                disabledColor,
                hexToRGBA(scheme.onSurfaceVariant)(opacity.level10),
                hexToRGBA(scheme.primary)(opacity.level10),
                hexToRGBA(scheme.error)(opacity.level10)
        ]

        const labelTextAnimatedStyle = useAnimatedStyle(() => ({
                color: interpolateColor(colorSharedValue.value, [0, 1, 2, 3], labelTextColorOutputRange),
                fontSize: interpolate(labelTextSharedValue.value, [0, 1], labelTextFontSizeOutputRange),
                height: interpolate(labelTextSharedValue.value, [0, 1], labelTextHeightOutputRange),
                letterSpacing: interpolate(labelTextSharedValue.value, [0, 1], labelTextLetterSpacingOutputRange),
                lineHeight: interpolate(labelTextSharedValue.value, [0, 1], labelTextHeightOutputRange)
        }))

        const activeIndicatorBackgroundColorOutputRange = [
                disabledColor,
                hexToRGBA(scheme.onSurfaceVariant)(opacity.level10),
                hexToRGBA(scheme.primary)(opacity.level10),
                hexToRGBA(scheme.error)(opacity.level10)
        ]

        const activeIndicatorAnimatedStyle = useAnimatedStyle(() => ({
                backgroundColor: interpolateColor(
                        colorSharedValue.value,
                        [0, 1, 2, 3],
                        activeIndicatorBackgroundColorOutputRange
                ),

                transform: [
                        {
                                scaleY: interpolate(activeIndicatorScaleYSharedValue.value, [0, 1], [0.3333, 1])
                        }
                ]
        }))

        const supportingTextSharedValueValueColorOutputRange = [
                disabledColor,
                hexToRGBA(scheme.onSurfaceVariant)(opacity.level10),
                hexToRGBA(scheme.error)(opacity.level10)
        ]

        const supportingTextAnimatedStyle = useAnimatedStyle(() => ({
                color: interpolateColor(
                        supportingTextSharedValue.value,
                        [0, 1, 2],
                        supportingTextSharedValueValueColorOutputRange
                )
        }))

        const handleTextInputEnabledState = useCallback(
                () =>
                        handleTextInputEnabled(animatedTiming)({
                                activeIndicatorScaleYSharedValue,
                                colorSharedValue,
                                inputColorSharedValue,
                                labelTextSharedValue,
                                supportingTextSharedValue
                        })({error, filledToValue}),
                [
                        activeIndicatorScaleYSharedValue,
                        animatedTiming,
                        colorSharedValue,
                        error,
                        filledToValue,
                        inputColorSharedValue,
                        labelTextSharedValue,
                        supportingTextSharedValue
                ]
        )

        const handleTextInputDisabledState = useCallback(
                () =>
                        handleTextInputDisabled(animatedTiming)({
                                activeIndicatorScaleYSharedValue,
                                headerInnerBackgroundColorSharedValue,
                                colorSharedValue,
                                inputColorSharedValue,
                                supportingTextSharedValue
                        }),
                [
                        activeIndicatorScaleYSharedValue,
                        animatedTiming,
                        colorSharedValue,
                        headerInnerBackgroundColorSharedValue,
                        inputColorSharedValue,
                        supportingTextSharedValue
                ]
        )

        const handleTextInputErrorState = useCallback(
                () =>
                        handleTextInputError(animatedTiming)({
                                activeIndicatorScaleYSharedValue,
                                colorSharedValue,
                                inputColorSharedValue,
                                supportingTextSharedValue
                        }),
                [
                        activeIndicatorScaleYSharedValue,
                        animatedTiming,
                        colorSharedValue,
                        inputColorSharedValue,
                        supportingTextSharedValue
                ]
        )

        const handleTextInputFocusedState = useCallback(
                () =>
                        handleTextInputFocused(animatedTiming)({
                                activeIndicatorScaleYSharedValue,
                                colorSharedValue,
                                labelTextSharedValue
                        })(error),
                [activeIndicatorScaleYSharedValue, animatedTiming, colorSharedValue, error, labelTextSharedValue]
        )

        const stateAnimated: TextInputStateAnimated = useMemo(
                () => ({
                        disabled: handleTextInputDisabledState,
                        enabled: handleTextInputEnabledState,
                        error: handleTextInputErrorState,
                        focused: handleTextInputFocusedState
                }),
                [
                        handleTextInputDisabledState,
                        handleTextInputEnabledState,
                        handleTextInputErrorState,
                        handleTextInputFocusedState
                ]
        )

        const onTextInputStateAnimatedTiming = useMemo(
                () => handleTextInputStateAnimatedTiming(stateAnimated),
                [stateAnimated]
        )

        const onTextInputNonerrorAnimatedTiming = useMemo(
                () => handleTextInputNonerrorAnimatedTiming({disabled, error})(stateAnimated),
                [disabled, error, stateAnimated]
        )

        const onTextInputDisabledAnimatedTiming = useMemo(
                () => handleTextInputDisabledAnimatedTiming(stateAnimated)(state),
                [state, stateAnimated]
        )

        useEffect(() => {
                onTextInputStateAnimatedTiming(state)
        }, [onTextInputStateAnimatedTiming, state])

        useEffect(() => {
                onTextInputNonerrorAnimatedTiming(state)
        }, [onTextInputNonerrorAnimatedTiming, state])

        useEffect(() => {
                onTextInputDisabledAnimatedTiming(disabled)
        }, [disabled, onTextInputDisabledAnimatedTiming])

        return {
                activeIndicatorAnimatedStyle,
                headerAnimatedStyle,
                inputAnimatedStyle,
                labelAnimatedStyle,
                labelTextAnimatedStyle,
                supportingTextAnimatedStyle
        }
}
