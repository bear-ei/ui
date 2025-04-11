import {Size, TypographyType} from '@bearei/material-token'
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
import {TextInputType} from './Text-input.enum'
import {TextInputStateAnimated, UseTextInputAnimatedOptions} from './Text-input.interface'

export const useTextInputAnimated = ({
        disabled,
        error,
        filled,
        state,
        type = TextInputType.FILLED
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
                [TextInputType.FILLED]: {
                        inputRanges: [0, 1],
                        outputRanges: [
                                disabledBackgroundColor,
                                hexToRGBA(scheme.surfaceContainerHighest)(opacity.level10)
                        ]
                },
                [TextInputType.OUTLINED]: {
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

        const labelTranslateYOutputRanges = [-theme.adaptSize(spacing.small), theme.adaptSize(spacing.none)]
        const labelAnimatedStyle = useAnimatedStyle(() => ({
                transform: [
                        {
                                translateY: interpolate(labelTextSharedValue.value, [0, 1], labelTranslateYOutputRanges)
                        }
                ]
        }))

        const labelTextFontSizeOutputRanges = [
                theme.adaptFontSize(typography[TypographyType.BODY][Size[Size.SMALL]].size),
                theme.adaptFontSize(typography[TypographyType.BODY][Size[Size.LARGE]].size)
        ]

        const labelTextLetterSpacingOutputRanges = [
                theme.adaptSize(typography[TypographyType.BODY][Size.SMALL].letterSpacing),
                theme.adaptSize(typography[TypographyType.BODY][Size.LARGE].letterSpacing)
        ]

        const labelTextHeightOutputRanges = [
                theme.adaptSize(typography[TypographyType.BODY][Size.SMALL].lineHeight),
                theme.adaptSize(typography[TypographyType.BODY][Size.LARGE].lineHeight)
        ]

        const labelTextColorOutputRanges = [
                disabledColor,
                hexToRGBA(scheme.onSurfaceVariant)(opacity.level10),
                hexToRGBA(scheme.primary)(opacity.level10),
                hexToRGBA(scheme.error)(opacity.level10)
        ]

        const labelTextAnimatedStyle = useAnimatedStyle(() => ({
                color: interpolateColor(colorSharedValue.value, [0, 1, 2, 3], labelTextColorOutputRanges),
                fontSize: interpolate(labelTextSharedValue.value, [0, 1], labelTextFontSizeOutputRanges),
                height: interpolate(labelTextSharedValue.value, [0, 1], labelTextHeightOutputRanges),
                letterSpacing: interpolate(labelTextSharedValue.value, [0, 1], labelTextLetterSpacingOutputRanges),
                lineHeight: interpolate(labelTextSharedValue.value, [0, 1], labelTextHeightOutputRanges)
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
                transform: [{scaleY: interpolate(activeIndicatorScaleYSharedValue.value, [0, 1], [0.3333, 1])}]
        }))

        const supportingTextSharedValueValueColorOutputRanges = [
                disabledColor,
                hexToRGBA(scheme.onSurfaceVariant)(opacity.level10),
                hexToRGBA(scheme.error)(opacity.level10)
        ]

        const supportingTextAnimatedStyle = useAnimatedStyle(() => ({
                color: interpolateColor(
                        supportingTextSharedValue.value,
                        [0, 1, 2],
                        supportingTextSharedValueValueColorOutputRanges
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
