import {MutableRefObject, RefAttributes, RefObject} from 'react'
import {
        PressableProps,
        TextInputProps as RNTextInputProps,
        TextInput,
        TextInputContentSizeChangeEventData,
        TextStyle,
        ViewStyle
} from 'react-native'
import {AnimatableValue, AnimatedStyle, SharedValue} from 'react-native-reanimated'
import {OnStateEvent, OnStateEventChangeOptions} from '../../hooks'
import {EventName, ShapeProps, State, TypographyProps} from '../Common'

export type TextInputType = 'filled' | 'outlined'
export interface InputProps extends RNTextInputProps, RefAttributes<TextInput> {
        enableFocusRing?: boolean
}

export interface TextInputProps
        extends Partial<
                RNTextInputProps & PressableProps & RefAttributes<TextInput> & Pick<ShapeProps, 'shape'> & OnStateEvent
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
        type?: TextInputType
}

export interface RenderTextInputProps extends TextInputProps {
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

export interface TextInputBaseProps extends TextInputProps {
        render: (props: RenderTextInputProps) => JSX.Element
}

export interface TextInputState {
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

export interface HandleTextInputStateEventChangeOptions
        extends OnStateEventChangeOptions,
                Pick<TextInputProps, 'content'> {
        ref?: RefObject<TextInput>
}

export interface UseTextInputAnimatedOptions extends Pick<RenderTextInputProps, 'type' | 'error' | 'disabled'> {
        filled: boolean
        state: State
}

export interface HandleTextInputEnabledSharedOptions extends Pick<UseTextInputAnimatedOptions, 'error'> {
        filledToValue: number
}

export interface HandleTextInputSupportingTextOptions extends Pick<TextInputProps, 'supportingTextDelayTime'> {
        timer: MutableRefObject<NodeJS.Timeout | undefined>
}

export interface HandleTextInputEnabledSharedValue {
        activeIndicatorScaleYSharedValue: SharedValue<AnimatableValue>
        colorSharedValue: SharedValue<AnimatableValue>
        inputColorSharedValue: SharedValue<AnimatableValue>
        labelTextSharedValue: SharedValue<AnimatableValue>
        supportingTextSharedValue: SharedValue<AnimatableValue>
}

export interface HandleTextInputDisabledSharedValue {
        activeIndicatorScaleYSharedValue: SharedValue<AnimatableValue>
        colorSharedValue: SharedValue<AnimatableValue>
        headerInnerBackgroundColorSharedValue: SharedValue<AnimatableValue>
        inputColorSharedValue: SharedValue<AnimatableValue>
        supportingTextSharedValue: SharedValue<AnimatableValue>
}

export interface HandleTextInputErrorSharedValue {
        activeIndicatorScaleYSharedValue: SharedValue<AnimatableValue>
        colorSharedValue: SharedValue<AnimatableValue>
        inputColorSharedValue: SharedValue<AnimatableValue>
        supportingTextSharedValue: SharedValue<AnimatableValue>
}

export interface HandleTextInputFocusedSharedValue {
        activeIndicatorScaleYSharedValue: SharedValue<AnimatableValue>
        colorSharedValue: SharedValue<AnimatableValue>
        labelTextSharedValue: SharedValue<AnimatableValue>
}

export type TextInputStateAnimated = Partial<Record<State, () => void>>
export type HandleTextInputNonerrorAnimatedOptions = Pick<UseTextInputAnimatedOptions, 'disabled' | 'error'>
export type TextInputHeaderProps = Pick<RenderTextInputProps, 'type'> & {
        leadingShow: boolean
        trailingShow: boolean
}

export interface TextInputControlProps {
        multiline?: boolean
        height?: number
}

export interface TextInputLabelProps extends TypographyProps {
        leadingShow: boolean
}

export interface TextInputMainProps {
        contentShow?: boolean
}
