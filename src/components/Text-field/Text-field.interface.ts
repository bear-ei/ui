import {MutableRefObject, RefAttributes, RefObject} from 'react'
import {
        PressableProps,
        TextInput,
        TextInputContentSizeChangeEventData,
        TextInputProps,
        TextStyle,
        ViewStyle
} from 'react-native'
import {AnimatableValue, AnimatedStyle, SharedValue} from 'react-native-reanimated'
import {OnStateEvent, OnStateEventChangeOptions} from '../../hooks'
import {EventName, ShapeProps, State, TypographyProps} from '../Common'

export type TextFieldType = 'filled' | 'outlined'
export interface InputProps extends TextInputProps, RefAttributes<TextInput> {
        enableFocusRing?: boolean
}

export interface TextFieldProps
        extends Partial<
                TextInputProps & PressableProps & RefAttributes<TextInput> & Pick<ShapeProps, 'shape'> & OnStateEvent
        > {
        content?: React.ReactNode
        disabled?: boolean
        enableFocusRing?: boolean
        error?: boolean
        filled?: boolean
        labelText?: string
        leading?: JSX.Element
        onSupportingTextVisible?: (value: boolean) => void
        supportingText?: string
        supportingTextDelayTime?: number
        trailing?: JSX.Element
        type?: TextFieldType
}

export interface RenderTextFieldProps extends TextFieldProps {
        activeIndicatorAnimatedStyle: AnimatedStyle<ViewStyle>
        contentSize?: Partial<TextInputContentSizeChangeEventData['contentSize']>
        eventName?: EventName
        headerAnimatedStyle: AnimatedStyle<ViewStyle>
        inputAnimatedStyle: AnimatedStyle<TextStyle>
        labelAnimatedStyle: AnimatedStyle<ViewStyle>
        labelTextAnimatedStyle: AnimatedStyle<TextStyle>
        onHeaderFocus?: () => void
        onStateEvent: OnStateEvent
        onSupportingTextVisible?: (value?: boolean) => void
        supportingTextAnimatedStyle: AnimatedStyle<TextStyle>
        supportingTextVisible?: boolean
        underlayColor: string
}

export interface TextFieldBaseProps extends TextFieldProps {
        render: (props: RenderTextFieldProps) => JSX.Element
}

export interface TextFieldState {
        contentSize: TextInputContentSizeChangeEventData['contentSize']
        eventName?: EventName
        nextChangeTextEvent?: () => void
        nextContentSizeChangeEvent?: () => void
        nextPressOutEvent?: () => void
        nextSupportingTextVisibleEvent?: () => void
        state: State
        supportingText?: string
        supportingTextVisible?: boolean
        textInputValue?: string
}

export interface HandleTextFieldStateEventChangeOptions
        extends OnStateEventChangeOptions,
                Pick<TextFieldProps, 'content'> {
        ref?: RefObject<TextInput>
}

export interface UseTextFieldAnimatedOptions extends Pick<RenderTextFieldProps, 'type' | 'error' | 'disabled'> {
        filled: boolean
        state: State
}

export interface HandleTextFieldEnabledSharedOptions extends Pick<UseTextFieldAnimatedOptions, 'error'> {
        filledToValue: number
}

export interface HandleTextFieldSupportingTextOptions extends Pick<TextFieldProps, 'supportingTextDelayTime'> {
        timer: MutableRefObject<NodeJS.Timeout | undefined>
}

export interface HandleTextFieldEnabledSharedValue {
        activeIndicatorScaleYSharedValue: SharedValue<AnimatableValue>
        colorSharedValue: SharedValue<AnimatableValue>
        inputColorSharedValue: SharedValue<AnimatableValue>
        labelTextSharedValue: SharedValue<AnimatableValue>
        supportingTextSharedValue: SharedValue<AnimatableValue>
}

export interface HandleTextFieldDisabledSharedValue {
        activeIndicatorScaleYSharedValue: SharedValue<AnimatableValue>
        colorSharedValue: SharedValue<AnimatableValue>
        headerInnerBackgroundColorSharedValue: SharedValue<AnimatableValue>
        inputColorSharedValue: SharedValue<AnimatableValue>
        supportingTextSharedValue: SharedValue<AnimatableValue>
}

export interface HandleTextFieldErrorSharedValue {
        activeIndicatorScaleYSharedValue: SharedValue<AnimatableValue>
        colorSharedValue: SharedValue<AnimatableValue>
        inputColorSharedValue: SharedValue<AnimatableValue>
        supportingTextSharedValue: SharedValue<AnimatableValue>
}

export interface HandleTextFieldFocusedSharedValue {
        activeIndicatorScaleYSharedValue: SharedValue<AnimatableValue>
        colorSharedValue: SharedValue<AnimatableValue>
        labelTextSharedValue: SharedValue<AnimatableValue>
}

export type TextFieldStateAnimated = Partial<Record<State, () => void>>
export type HandleTextFieldNonerrorAnimatedOptions = Pick<UseTextFieldAnimatedOptions, 'disabled' | 'error'>
export type TextFieldHeaderProps = Pick<RenderTextFieldProps, 'type'> & {
        leadingShow: boolean
        trailingShow: boolean
}

export interface TextFieldControlProps {
        multiline?: boolean
        height?: number
}

export interface TextFieldLabelProps extends TypographyProps {
        leadingShow: boolean
}

export interface TextFieldMainProps {
        contentShow?: boolean
}
