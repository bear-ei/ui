import {RefAttributes, RefObject} from 'react'
import {
    PressableProps,
    TextInput,
    TextInputContentSizeChangeEventData,
    TextInputProps,
    TextStyle,
    ViewStyle
} from 'react-native'
import {AnimatableValue, AnimatedStyle, SharedValue} from 'react-native-reanimated'
import {OnStateEvent, OnStateEventChangeOptions} from '../../hook'
import {EventName, ShapeProps, State, TypographyProps} from '../Common'

export type TextFieldType = 'filled' | 'outlined'
export interface TextFieldProps
    extends Partial<
        TextInputProps & PressableProps & RefAttributes<TextInput> & Pick<ShapeProps, 'shape'> & OnStateEvent
    > {
    content?: React.JSX.Element
    densityScale?: number
    disabled?: boolean
    error?: boolean
    labelText?: string
    leading?: React.JSX.Element
    supportingText?: string
    trailing?: React.JSX.Element
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
    onStateEvent: OnStateEvent
    supportingTextAnimatedStyle: AnimatedStyle<TextStyle>
    underlayColor: string
}

export interface TextFieldBaseProps extends TextFieldProps {
    render: (props: RenderTextFieldProps) => React.JSX.Element
}

export interface InitialTextFieldState {
    contentSize: TextInputContentSizeChangeEventData['contentSize']
    eventName?: EventName
    nextChangeTextCallback?: () => void
    nextContentSizeChangeCallback?: () => void
    nextPressOutEvent?: () => void
    state: State
    textInputValue?: string
}

export type ProcessTextFieldStateEventChangeOptions = {
    ref?: RefObject<TextInput>
} & OnStateEventChangeOptions &
    Pick<TextFieldProps, 'content'>

export interface UseTextFieldAnimatedOptions extends Pick<RenderTextFieldProps, 'type' | 'error' | 'disabled'> {
    filled: boolean
    state: State
}

export interface ProcessTextFieldEnabledSharedOptions extends Pick<UseTextFieldAnimatedOptions, 'error'> {
    filledToValue: number
}

export interface ProcessTextFieldEnabledSharedValue {
    activeIndicatorHeightSharedValue: SharedValue<AnimatableValue>
    colorSharedValue: SharedValue<AnimatableValue>
    inputColorSharedValue: SharedValue<AnimatableValue>
    labelTextSharedValue: SharedValue<AnimatableValue>
    supportingTextSharedValue: SharedValue<AnimatableValue>
}

export interface ProcessTextFieldDisabledSharedValue {
    activeIndicatorHeightSharedValue: SharedValue<AnimatableValue>
    colorSharedValue: SharedValue<AnimatableValue>
    headerInnerBackgroundColorSharedValue: SharedValue<AnimatableValue>
    inputColorSharedValue: SharedValue<AnimatableValue>
    supportingTextSharedValue: SharedValue<AnimatableValue>
}

export interface ProcessTextFieldErrorSharedValue {
    activeIndicatorHeightSharedValue: SharedValue<AnimatableValue>
    colorSharedValue: SharedValue<AnimatableValue>
    inputColorSharedValue: SharedValue<AnimatableValue>
    supportingTextSharedValue: SharedValue<AnimatableValue>
}

export interface ProcessTextFieldFocusedSharedValue {
    activeIndicatorHeightSharedValue: SharedValue<AnimatableValue>
    colorSharedValue: SharedValue<AnimatableValue>
    labelTextSharedValue: SharedValue<AnimatableValue>
}

export type TextFieldStateAnimated = Partial<Record<State, () => void>>
export type ProcessTextFieldNonerrorAnimatedOptions = Pick<UseTextFieldAnimatedOptions, 'disabled' | 'error'>
export type TextFieldHeaderProps = Pick<RenderTextFieldProps, 'type' | 'densityScale'> & {
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

export interface TextFieldMainProps extends Pick<RenderTextFieldProps, 'densityScale'> {
    contentShow?: boolean
}
