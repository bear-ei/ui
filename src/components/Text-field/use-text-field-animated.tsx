import {useCallback, useEffect, useMemo} from 'react'
import {Extrapolation, interpolate, interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {AnimatedTiming, useAnimatedTiming} from '../../hooks'
import {State} from '../Common'
import {
    HandleTextFieldDisabledSharedValue,
    HandleTextFieldEnabledSharedOptions,
    HandleTextFieldEnabledSharedValue,
    HandleTextFieldErrorSharedValue,
    HandleTextFieldFocusedSharedValue,
    HandleTextFieldNonerrorAnimatedOptions,
    TextFieldStateAnimated,
    UseTextFieldAnimatedOptions
} from './Text-field.interface'

const handleTextFieldEnabled =
    (animatedTiming: AnimatedTiming) =>
    ({
        activeIndicatorHeightSharedValue,
        colorSharedValue,
        inputColorSharedValue,
        labelTextSharedValue,
        supportingTextSharedValue
    }: HandleTextFieldEnabledSharedValue) =>
    ({filledToValue, error}: HandleTextFieldEnabledSharedOptions) => {
        if (error) {
            return animatedTiming()(labelTextSharedValue)(filledToValue)
        }

        animatedTiming()(activeIndicatorHeightSharedValue)(0)
        animatedTiming()(colorSharedValue)(1)
        animatedTiming()(inputColorSharedValue)(1)
        animatedTiming()(labelTextSharedValue)(filledToValue)
        animatedTiming()(supportingTextSharedValue)(1)
    }

const handleTextFieldDisabled =
    (animatedTiming: AnimatedTiming) =>
    ({
        activeIndicatorHeightSharedValue,
        colorSharedValue,
        headerInnerBackgroundColorSharedValue,
        inputColorSharedValue,
        supportingTextSharedValue
    }: HandleTextFieldDisabledSharedValue) => {
        const toValue = 0

        animatedTiming()(activeIndicatorHeightSharedValue)(toValue)
        animatedTiming()(colorSharedValue)(toValue)
        animatedTiming()(headerInnerBackgroundColorSharedValue)(toValue)
        animatedTiming()(inputColorSharedValue)(1)
        animatedTiming()(supportingTextSharedValue)(1)
    }

const handleTextFieldError =
    (animatedTiming: AnimatedTiming) =>
    ({
        activeIndicatorHeightSharedValue,
        colorSharedValue,
        inputColorSharedValue,
        supportingTextSharedValue
    }: HandleTextFieldErrorSharedValue) => {
        animatedTiming()(activeIndicatorHeightSharedValue)(1)
        animatedTiming()(colorSharedValue)(3)
        animatedTiming()(inputColorSharedValue)(1)
        animatedTiming()(supportingTextSharedValue)(2)
    }

const handleTextFieldFocused =
    (animatedTiming: AnimatedTiming) =>
    ({activeIndicatorHeightSharedValue, colorSharedValue, labelTextSharedValue}: HandleTextFieldFocusedSharedValue) =>
    (error?: boolean) => {
        if (error) {
            return animatedTiming()(labelTextSharedValue)(0)
        }

        animatedTiming()(activeIndicatorHeightSharedValue)(1)
        animatedTiming()(colorSharedValue)(2)
        animatedTiming()(labelTextSharedValue)(0)
    }

const handleTextFieldStateAnimated = (stateAnimated: TextFieldStateAnimated) => (state: State) =>
    stateAnimated[state]?.()

const handleTextFieldNonerrorAnimated =
    ({error, disabled}: HandleTextFieldNonerrorAnimatedOptions) =>
    (stateAnimated: TextFieldStateAnimated) =>
    (state: State) => {
        const nonerror = typeof error !== 'boolean' && disabled

        !nonerror && stateAnimated[error ? 'error' : state]?.()
    }

const handleTextFieldDisabledAnimated =
    (stateAnimated: TextFieldStateAnimated) => (state: State) => (disabled?: boolean) =>
        typeof disabled === 'boolean' && stateAnimated[disabled ? 'disabled' : state]?.()

export const useTextFieldAnimated = ({
    disabled,
    error,
    filled,
    state,
    type = 'filled'
}: UseTextFieldAnimatedOptions) => {
    const theme = useTheme()
    const {palette, scheme, spacing, typography} = theme.token
    const {convertHexToRGBA} = palette
    const disabledAnimatedValue = disabled ? 0 : 1
    const defaultAnimatedValue = {
        activeIndicatorHeightSharedValue: error ? 1 : 0,
        colorSharedValue: error ? 3 : 1,
        inputColorSharedValue: error ? 3 : 1,
        supportingTextSharedValueValue: error ? 2 : 1
    }

    const activeIndicatorHeightSharedValue = useSharedValue(
        disabled ? disabledAnimatedValue : defaultAnimatedValue.activeIndicatorHeightSharedValue
    )

    const headerInnerBackgroundColorSharedValue = useSharedValue(disabledAnimatedValue)
    const colorSharedValue = useSharedValue(disabled ? disabledAnimatedValue : defaultAnimatedValue.colorSharedValue)
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
                translateY: interpolate(
                    labelTextSharedValue.value,
                    [0, 1],
                    labelTranslateYOutputRange,
                    Extrapolation.CLAMP
                )
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
        fontSize: interpolate(labelTextSharedValue.value, [0, 1], labelTextFontSizeOutputRange, Extrapolation.CLAMP),
        letterSpacing: interpolate(
            labelTextSharedValue.value,
            [0, 1],
            labelTextLetterSpacingOutputRange,
            Extrapolation.CLAMP
        ),
        height: interpolate(labelTextSharedValue.value, [0, 1], labelTextHeightOutputRange, Extrapolation.CLAMP),
        lineHeight: interpolate(labelTextSharedValue.value, [0, 1], labelTextHeightOutputRange, Extrapolation.CLAMP),
        color: interpolateColor(colorSharedValue.value, [0, 1, 2, 3], labelTextColorOutputRange)
    }))

    const activeIndicatorBackgroundColorOutputRange = [
        disabledColor,
        convertHexToRGBA(scheme.onSurfaceVariant)(1),
        convertHexToRGBA(scheme.primary)(1),
        convertHexToRGBA(scheme.error)(1)
    ]

    const activeIndicatorHeightSharedValueOutputRange = [theme.adaptSize(1), theme.adaptSize(spacing.extraSmall - 1)]
    const activeIndicatorAnimatedStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(
            colorSharedValue.value,
            [0, 1, 2, 3],
            activeIndicatorBackgroundColorOutputRange
        ),
        height: interpolate(
            activeIndicatorHeightSharedValue.value,
            [0, 1],
            activeIndicatorHeightSharedValueOutputRange,
            Extrapolation.CLAMP
        )
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

    const handleTextFieldEnabledState = useCallback(
        () =>
            handleTextFieldEnabled(animatedTiming)({
                activeIndicatorHeightSharedValue,
                colorSharedValue,
                inputColorSharedValue,
                labelTextSharedValue,
                supportingTextSharedValue
            })({error, filledToValue}),
        [
            activeIndicatorHeightSharedValue,
            animatedTiming,
            colorSharedValue,
            error,
            filledToValue,
            inputColorSharedValue,
            labelTextSharedValue,
            supportingTextSharedValue
        ]
    )

    const handleTextFieldDisabledState = useCallback(
        () =>
            handleTextFieldDisabled(animatedTiming)({
                activeIndicatorHeightSharedValue,
                headerInnerBackgroundColorSharedValue,
                colorSharedValue,
                inputColorSharedValue,
                supportingTextSharedValue
            }),
        [
            activeIndicatorHeightSharedValue,
            animatedTiming,
            colorSharedValue,
            headerInnerBackgroundColorSharedValue,
            inputColorSharedValue,
            supportingTextSharedValue
        ]
    )

    const handleTextFieldErrorState = useCallback(
        () =>
            handleTextFieldError(animatedTiming)({
                activeIndicatorHeightSharedValue,
                colorSharedValue,
                inputColorSharedValue,
                supportingTextSharedValue
            }),
        [
            activeIndicatorHeightSharedValue,
            animatedTiming,
            colorSharedValue,
            inputColorSharedValue,
            supportingTextSharedValue
        ]
    )

    const handleTextFieldFocusedState = useCallback(
        () =>
            handleTextFieldFocused(animatedTiming)({
                activeIndicatorHeightSharedValue,
                colorSharedValue,
                labelTextSharedValue
            })(error),
        [activeIndicatorHeightSharedValue, animatedTiming, colorSharedValue, error, labelTextSharedValue]
    )

    const stateAnimated: TextFieldStateAnimated = useMemo(
        () => ({
            disabled: handleTextFieldDisabledState,
            enabled: handleTextFieldEnabledState,
            error: handleTextFieldErrorState,
            focused: handleTextFieldFocusedState
        }),
        [
            handleTextFieldDisabledState,
            handleTextFieldEnabledState,
            handleTextFieldErrorState,
            handleTextFieldFocusedState
        ]
    )

    const onTextFieldStateAnimated = useMemo(() => handleTextFieldStateAnimated(stateAnimated), [stateAnimated])
    const onTextFieldNonerrorAnimated = useMemo(
        () => handleTextFieldNonerrorAnimated({disabled, error})(stateAnimated),
        [disabled, error, stateAnimated]
    )

    const onTextFieldDisabledAnimated = useMemo(
        () => handleTextFieldDisabledAnimated(stateAnimated)(state),
        [state, stateAnimated]
    )

    useEffect(() => {
        onTextFieldStateAnimated(state)
    }, [onTextFieldStateAnimated, state])

    useEffect(() => {
        onTextFieldNonerrorAnimated(state)
    }, [onTextFieldNonerrorAnimated, state])

    useEffect(() => {
        onTextFieldDisabledAnimated(disabled)
    }, [disabled, onTextFieldDisabledAnimated])

    return {
        activeIndicatorAnimatedStyle,
        headerAnimatedStyle,
        inputAnimatedStyle,
        labelAnimatedStyle,
        labelTextAnimatedStyle,
        supportingTextAnimatedStyle
    }
}
