import {useCallback, useEffect, useMemo} from 'react'
import {InteractionManager} from 'react-native'
import {interpolate, interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {AnimatedTiming, useAnimatedTiming} from '../../hooks'
import {State} from '../Common'
import {
        HandleTextInputDisabledSharedValue,
        HandleTextInputEnabledSharedOptions,
        HandleTextInputEnabledSharedValue,
        HandleTextInputErrorSharedValue,
        HandleTextInputFocusedSharedValue,
        HandleTextInputNonerrorAnimatedTimingOptions,
        TextInputStateAnimated,
        UseTextInputAnimatedOptions
} from './Text-input.interface'

const handleTextInputEnabled =
        (animatedTiming: AnimatedTiming) =>
        ({
                activeIndicatorScaleYSharedValue,
                colorSharedValue,
                inputColorSharedValue,
                labelTextSharedValue,
                supportingTextSharedValue
        }: HandleTextInputEnabledSharedValue) =>
        ({filledToValue, error}: HandleTextInputEnabledSharedOptions) => {
                if (error) {
                        return animatedTiming()(labelTextSharedValue)(filledToValue)
                }

                animatedTiming()(activeIndicatorScaleYSharedValue)(0)
                animatedTiming()(colorSharedValue)(1)
                animatedTiming()(inputColorSharedValue)(1)
                animatedTiming()(labelTextSharedValue)(filledToValue)
                animatedTiming()(supportingTextSharedValue)(1)
        }

const handleTextInputDisabled =
        (animatedTiming: AnimatedTiming) =>
        ({
                activeIndicatorScaleYSharedValue,
                colorSharedValue,
                headerInnerBackgroundColorSharedValue,
                inputColorSharedValue,
                supportingTextSharedValue
        }: HandleTextInputDisabledSharedValue) => {
                const toValue = 0

                animatedTiming()(activeIndicatorScaleYSharedValue)(toValue)
                animatedTiming()(colorSharedValue)(toValue)
                animatedTiming()(headerInnerBackgroundColorSharedValue)(toValue)
                animatedTiming()(inputColorSharedValue)(1)
                animatedTiming()(supportingTextSharedValue)(1)
        }

const handleTextInputError =
        (animatedTiming: AnimatedTiming) =>
        ({
                activeIndicatorScaleYSharedValue,
                colorSharedValue,
                inputColorSharedValue,
                supportingTextSharedValue
        }: HandleTextInputErrorSharedValue) => {
                animatedTiming()(activeIndicatorScaleYSharedValue)(1)
                animatedTiming()(colorSharedValue)(3)
                animatedTiming()(inputColorSharedValue)(1)
                animatedTiming()(supportingTextSharedValue)(2)
        }

const handleTextInputFocused =
        (animatedTiming: AnimatedTiming) =>
        ({
                activeIndicatorScaleYSharedValue,
                colorSharedValue,
                labelTextSharedValue
        }: HandleTextInputFocusedSharedValue) =>
        (error?: boolean) => {
                if (error) {
                        return animatedTiming()(labelTextSharedValue)(0)
                }

                animatedTiming()(activeIndicatorScaleYSharedValue)(1)
                animatedTiming()(colorSharedValue)(2)
                animatedTiming()(labelTextSharedValue)(0)
        }

const handleTextInputStateAnimatedTiming = (stateAnimated: TextInputStateAnimated) => (state: State) =>
        stateAnimated[state]?.()

const handleTextInputNonerrorAnimatedTiming = ({error, disabled}: HandleTextInputNonerrorAnimatedTimingOptions) => {
        const nonerror = typeof error !== 'boolean' && disabled

        return (stateAnimated: TextInputStateAnimated) => (state: State) => {
                if (!nonerror) {
                        stateAnimated[error ? 'error' : state]?.()
                }
        }
}

const handleTextInputDisabledAnimatedTiming =
        (stateAnimated: TextInputStateAnimated) => (state: State) => (disabled?: boolean) => {
                if (typeof disabled === 'boolean') {
                        stateAnimated[disabled ? 'disabled' : state]?.()
                }
        }

export const useTextInputAnimated = ({
        disabled,
        error,
        filled,
        state,
        type = 'filled'
}: UseTextInputAnimatedOptions) => {
        const theme = useTheme()
        const {palette, scheme, spacing, typography} = theme.token
        const {convertHexToRGBA} = palette
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

        const animatedTiming = useAnimatedTiming(theme.token)
        const disabledBackgroundColor = convertHexToRGBA(scheme.onSurface)(0.12)
        const disabledColor = convertHexToRGBA(scheme.onSurface)(0.38)
        const filledToValue = filled ? 0 : 1
        const labelTextSharedValue = useSharedValue(filledToValue)
        const backgroundColorType = {
                filled: {
                        inputRange: [0, 1],
                        outputRange: [disabledBackgroundColor, convertHexToRGBA(scheme.surfaceContainerHighest)(1)]
                },
                outlined: {
                        inputRange: [0, 1],
                        outputRange: [convertHexToRGBA(scheme.surface)(0), convertHexToRGBA(scheme.surface)(0)]
                }
        }

        const headerAnimatedStyle = useAnimatedStyle(() => ({
                backgroundColor: interpolateColor(
                        headerInnerBackgroundColorSharedValue.value,
                        backgroundColorType[type].inputRange,
                        backgroundColorType[type].outputRange
                )
        }))

        const inputColorSharedValueOutputRange = [disabledColor, convertHexToRGBA(scheme.onSurface)(1)]
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
                convertHexToRGBA(scheme.onSurfaceVariant)(1),
                convertHexToRGBA(scheme.primary)(1),
                convertHexToRGBA(scheme.error)(1)
        ]

        const labelTextAnimatedStyle = useAnimatedStyle(() => ({
                fontSize: interpolate(labelTextSharedValue.value, [0, 1], labelTextFontSizeOutputRange),
                letterSpacing: interpolate(labelTextSharedValue.value, [0, 1], labelTextLetterSpacingOutputRange),
                height: interpolate(labelTextSharedValue.value, [0, 1], labelTextHeightOutputRange),
                lineHeight: interpolate(labelTextSharedValue.value, [0, 1], labelTextHeightOutputRange),
                color: interpolateColor(colorSharedValue.value, [0, 1, 2, 3], labelTextColorOutputRange)
        }))

        const activeIndicatorBackgroundColorOutputRange = [
                disabledColor,
                convertHexToRGBA(scheme.onSurfaceVariant)(1),
                convertHexToRGBA(scheme.primary)(1),
                convertHexToRGBA(scheme.error)(1)
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
                convertHexToRGBA(scheme.onSurfaceVariant)(1),
                convertHexToRGBA(scheme.error)(1)
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
                InteractionManager.runAfterInteractions(() => onTextInputStateAnimatedTiming(state))
        }, [onTextInputStateAnimatedTiming, state])

        useEffect(() => {
                InteractionManager.runAfterInteractions(() => onTextInputNonerrorAnimatedTiming(state))
        }, [onTextInputNonerrorAnimatedTiming, state])

        useEffect(() => {
                InteractionManager.runAfterInteractions(() => onTextInputDisabledAnimatedTiming(disabled))
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
