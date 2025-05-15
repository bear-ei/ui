import type {RefAttributes, RefObject} from 'react'
import type {
	PressableProps,
	TextInputProps as RNTextInputProps,
	TextInput,
	TextInputContentSizeChangeEventData,
	TextStyle,
	ViewStyle
} from 'react-native'
import type {AnimatedStyle, SharedValue} from 'react-native-reanimated'
import type {DefaultTheme} from 'styled-components/native'
import type {HandleStateEventChangeOptions, InteractionHandler} from '../../hooks'
import type {CommonProps, ComponentStatus, EventName, ShapeProps, State, TypographyProps} from '../Common'
import type {TEXT_INPUT_TYPE} from './Text-input.enum'

export type TextInputType = (typeof TEXT_INPUT_TYPE)[keyof typeof TEXT_INPUT_TYPE]
export interface InputProps extends RNTextInputProps, RefAttributes<TextInput> {
	enableFocusRing?: boolean
}

export interface TextInputProps
	extends Partial<
			RNTextInputProps &
				PressableProps &
				RefAttributes<TextInput> &
				Pick<ShapeProps, 'shape'> &
				InteractionHandler
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
	interactionHandlers: InteractionHandler
	onSupportingTextVisible?: (visible?: boolean) => void
	supportingTextAnimatedStyle: AnimatedStyle<TextStyle>
	supportingTextVisible?: boolean
	theme: DefaultTheme
}

export interface TextInputBaseProps extends TextInputProps {
	renderTextInput: (props: RenderTextInputProps) => React.JSX.Element
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

export interface HandleTextInputStateChangeOptions
	extends HandleStateEventChangeOptions,
		Pick<TextInputProps, 'content'> {
	ref?: RefObject<TextInput>
}

export interface UseTextInputAnimatedOptions
	extends Pick<RenderTextInputProps, 'type' | 'error' | 'disabled' | 'density'> {
	filled: boolean
	state: State
}

export interface CreateTextInputEnabledStateOptions extends Pick<UseTextInputAnimatedOptions, 'error'> {
	filledToValue: number
}

export interface UpdateTextInputSupportingTextOptions extends Pick<TextInputProps, 'supportingTextDelay'> {
	onTextInputSupportingTextClose: () => void
}

export interface CreateTextInputEnabledSharedValues {
	activeIndicatorScaleYSharedValue: SharedValue<number>
	colorSharedValue: SharedValue<number>
	inputColorSharedValue: SharedValue<number>
	labelTextSharedValue: SharedValue<number>
	supportingTextSharedValue: SharedValue<number>
}

export interface CreateTextInputDisabledSharedValues {
	activeIndicatorScaleYSharedValue: SharedValue<number>
	colorSharedValue: SharedValue<number>
	headerInnerBackgroundColorSharedValue: SharedValue<number>
	inputColorSharedValue: SharedValue<number>
	supportingTextSharedValue: SharedValue<number>
}

export interface CreateTextInputErrorSharedValues {
	activeIndicatorScaleYSharedValue: SharedValue<number>
	colorSharedValue: SharedValue<number>
	inputColorSharedValue: SharedValue<number>
	supportingTextSharedValue: SharedValue<number>
}

export interface CreateTextInputFocusedSharedValues {
	activeIndicatorScaleYSharedValue: SharedValue<number>
	colorSharedValue: SharedValue<number>
	labelTextSharedValue: SharedValue<number>
}

export type TextInputStateAnimated = Partial<Record<State, () => void>>
export type AnimateTextInputNonErrorStateTimingOptions = Pick<UseTextInputAnimatedOptions, 'disabled' | 'error'>
export type TextInputHeaderProps = Pick<RenderTextInputProps, 'type' | 'density'> & {
	leadingShow: boolean
	trailingShow: boolean
}

export interface TextInputControlProps {
	multiline?: boolean
	size?: number
}

export interface TextInputLabelProps extends TypographyProps, Pick<RenderTextInputProps, 'density'> {
	leadingShow: boolean
}

export interface TextInputMainProps extends Pick<RenderTextInputProps, 'density'> {
	contentShow?: boolean
}

export interface TextInputTouchableHeaderProps {
	enableFocusRing?: boolean
}
