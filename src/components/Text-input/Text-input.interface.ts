import {RefAttributes, RefObject} from 'react'
import {
        PressableProps,
        TextInputProps as RNTextInputProps,
        TextInput,
        TextInputContentSizeChangeEventData,
        TextStyle,
        ViewStyle
} from 'react-native'
import {AnimatedStyle, SharedValue} from 'react-native-reanimated'
import {DefaultTheme} from 'styled-components/native'
import {HandleStateEventChangeOptions, StateOnEvent} from '../../hooks'
import {CommonProps, ComponentStatus, EventName, ShapeProps, State, TypographyProps} from '../Common'
import {TextInputType} from './Text-input.enum'

export interface InputProps extends RNTextInputProps, RefAttributes<TextInput> {
        enableFocusRing?: boolean
}

export interface TextInputProps
        extends Partial<
                        RNTextInputProps &
                                PressableProps &
                                RefAttributes<TextInput> &
                                Pick<ShapeProps, 'shape'> &
                                StateOnEvent
                >,
                CommonProps {
        content?: React.ReactNode
        disabled?: boolean
        enableFocusRing?: boolean
        error?: boolean
        filled?: boolean
        labelText?: string
        leading?: React.JSX.Element
        onSupportingTextVisible?: (visible?: boolean) => void
        supportingText?: string
        supportingTextDelay?: number
        trailing?: React.JSX.Element
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
        stateOnEvent: StateOnEvent
        onSupportingTextVisible?: (visible?: boolean) => void
        supportingTextAnimatedStyle: AnimatedStyle<TextStyle>
        supportingTextVisible?: boolean
        theme: DefaultTheme
}

export interface TextInputBaseProps extends TextInputProps {
        render: (props: RenderTextInputProps) => React.JSX.Element
}

export interface TextInputState {
        contentSize: TextInputContentSizeChangeEventData['contentSize']
        eventName?: EventName
        nextChangeTextEvent?: () => void
        nextContentSizeChangeEvent?: () => void
        nextPressOutEvent?: () => void
        nextSupportingTextVisibleEvent?: () => void
        state: State
        status: ComponentStatus
        supportingText?: string
        supportingTextVisible?: boolean
        value?: string
}

export interface HandleTextInputStateEventChangeOptions
        extends HandleStateEventChangeOptions,
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

export interface HandleTextInputSupportingTextOptions extends Pick<TextInputProps, 'supportingTextDelay'> {
        onTextInputSupportingTextClose: () => void
}

export interface HandleTextInputEnabledSharedValue {
        activeIndicatorScaleYSharedValue: SharedValue<number>
        colorSharedValue: SharedValue<number>
        inputColorSharedValue: SharedValue<number>
        labelTextSharedValue: SharedValue<number>
        supportingTextSharedValue: SharedValue<number>
}

export interface HandleTextInputDisabledSharedValue {
        activeIndicatorScaleYSharedValue: SharedValue<number>
        colorSharedValue: SharedValue<number>
        headerInnerBackgroundColorSharedValue: SharedValue<number>
        inputColorSharedValue: SharedValue<number>
        supportingTextSharedValue: SharedValue<number>
}

export interface HandleTextInputErrorSharedValue {
        activeIndicatorScaleYSharedValue: SharedValue<number>
        colorSharedValue: SharedValue<number>
        inputColorSharedValue: SharedValue<number>
        supportingTextSharedValue: SharedValue<number>
}

export interface HandleTextInputFocusedSharedValue {
        activeIndicatorScaleYSharedValue: SharedValue<number>
        colorSharedValue: SharedValue<number>
        labelTextSharedValue: SharedValue<number>
}

export type TextInputStateAnimated = Partial<Record<State, () => void>>
export type HandleTextInputNonerrorAnimatedTimingOptions = Pick<UseTextInputAnimatedOptions, 'disabled' | 'error'>
export type TextInputHeaderProps = Pick<RenderTextInputProps, 'type' | 'density'> & {
        leadingShow: boolean
        trailingShow: boolean
}

export interface TextInputControlProps {
        multiline?: boolean
        size?: number
}

export interface TextInputLabelProps extends TypographyProps {
        leadingShow: boolean
}

export interface TextInputMainProps {
        contentShow?: boolean
}

export interface TextInputTouchableHeaderProps {
        enableFocusRing?: boolean
}
