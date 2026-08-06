import type {CommonProps, ComponentStatus, ContentSize, EventName, State} from '@/constants'
import type {HandleStateEventChangeOptions, InteractionHandlers} from '@/hooks'
import type {RefAttributes, RefObject} from 'react'
import type {PressableProps, TextInputProps as RNTextInputProps, TextInput, TextStyle, ViewStyle} from 'react-native'
import type {AnimatedStyle, SharedValue} from 'react-native-reanimated'
import type {TEXT_INPUT_TYPE} from './Text-input.enum'

export type TextInputType = (typeof TEXT_INPUT_TYPE)[keyof typeof TEXT_INPUT_TYPE]
export interface InputProps extends RNTextInputProps, RefAttributes<TextInput> {}
export interface TextInputProps
    extends Partial<RNTextInputProps & PressableProps & RefAttributes<TextInput> & InteractionHandlers>, CommonProps {
    content?: React.ReactNode
    disabled?: boolean
    error?: boolean
    labelText?: string
    leading?: React.JSX.Element
    onSupportingTextAnimationFinished?: (visible?: boolean) => void
    supportingText?: string
    supportingTextDelay?: number
    trailing?: React.JSX.Element
    type?: TextInputType
}

export interface RenderTextInputProps extends TextInputProps {
    activeIndicatorAnimatedStyle: AnimatedStyle<ViewStyle>
    contentSize?: ContentSize
    eventName?: EventName
    headerAnimatedStyle: AnimatedStyle<ViewStyle>
    inputAnimatedStyle: AnimatedStyle<TextStyle>
    interactionHandlers: InteractionHandlers
    leadingElement?: React.JSX.Element
    onHeaderFocus?: () => void
    onSupportingTextAnimationFinished?: (visible?: boolean) => void
    supportingTextVisible?: boolean
    trailingElement?: React.JSX.Element
}

export type TextInputBaseProps = TextInputProps
export interface TextInputState {
    contentSize: ContentSize
    eventName?: EventName
    nextChangeTextEvent?: () => void
    nextContentSizeChangeEvent?: () => void
    nextSupportingTextCloseEvent?: () => void
    nextSupportingTextAnimationFinishedEvent?: () => void
    state: State
    status: ComponentStatus
    supportingText?: string
    supportingTextVisible?: boolean
    value?: string
}

export interface HandleTextInputStateChangeOptions
    extends HandleStateEventChangeOptions, Pick<TextInputProps, 'content'> {
    ref?: RefObject<TextInput | null>
}

export interface UseTextInputAnimatedOptions extends Pick<RenderTextInputProps, 'type' | 'error' | 'disabled'> {
    state: State
    status: ComponentStatus
}

export interface UpdateTextInputSupportingTextOptions extends Pick<TextInputProps, 'supportingTextDelay'> {
    onSupportingTextClose: () => void
}

export interface CreateTextInputEnabledSharedValues {
    activeIndicatorScaleYSharedValue: SharedValue<number>
    colorSharedValue: SharedValue<number>
    inputColorSharedValue: SharedValue<number>
}

export interface CreateTextInputDisabledSharedValues {
    activeIndicatorScaleYSharedValue: SharedValue<number>
    colorSharedValue: SharedValue<number>
    headerInnerBackgroundColorSharedValue: SharedValue<number>
    inputColorSharedValue: SharedValue<number>
}

export interface CreateTextInputErrorSharedValues {
    activeIndicatorScaleYSharedValue: SharedValue<number>
    colorSharedValue: SharedValue<number>
    inputColorSharedValue: SharedValue<number>
}

export interface CreateTextInputFocusedSharedValues {
    activeIndicatorScaleYSharedValue: SharedValue<number>
    colorSharedValue: SharedValue<number>
}

export type TextInputStateAnimated = Partial<Record<State, () => void>>
export type AnimateTextInputNonErrorStateTimingOptions = Pick<UseTextInputAnimatedOptions, 'disabled' | 'error'>
