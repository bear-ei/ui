import type {RefAttributes, RefObject} from 'react'
import type {PressableProps, TextInputProps as RNTextInputProps, TextInput, TextStyle, ViewStyle} from 'react-native'
import type {AnimatedStyle, SharedValue} from 'react-native-reanimated'
import type {ComponentStatus, EventName, PartialSize, State} from '../../constants'
import type {HandleStateEventChangeOptions, InteractionHandlers} from '../../hooks'
import type {CommonProps} from '../../theme'
import type {TEXT_INPUT_TYPE} from './Text-input.enum'

export type TextInputType = (typeof TEXT_INPUT_TYPE)[keyof typeof TEXT_INPUT_TYPE]
export interface TextInputProps
	extends
		Partial<
			Omit<RNTextInputProps, 'onContentSizeChange'> &
				PressableProps &
				RefAttributes<TextInput> &
				InteractionHandlers
		>,
		CommonProps {
	content?: React.ReactNode
	disabled?: boolean
	error?: boolean
	labelText?: string
	leading?: React.JSX.Element
	onContentSizeChange?: (contentSize: {width: number; height: number}) => void
	onSupportingTextAnimationFinished?: (visible?: boolean) => void
	supportingText?: string
	supportingTextDelay?: number
	trailing?: React.JSX.Element
	type?: TextInputType
}

export interface RenderTextInputProps
	extends Omit<TextInputProps, 'onContentSizeChange'>, Pick<RNTextInputProps, 'onContentSizeChange'> {
	activeIndicatorAnimatedStyle: AnimatedStyle<ViewStyle>
	contentSize?: PartialSize
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
	contentSize: PartialSize
	eventName?: EventName
	pendingChangeTextEvent?: string
	pendingContentSizeChangeEvent?: {width: number; height: number}
	pendingSupportingTextAnimationFinishedEvent?: boolean
	pendingSupportingTextCloseEvent?: boolean
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
	onSupportingTextClose?: () => void
}

export interface CreateTextInputEnabledSharedValues {
	activeIndicatorScaleYSharedValue: SharedValue<number>
	colorSharedValue: SharedValue<number>
	headerInnerBackgroundColorSharedValue: SharedValue<number>
}

export interface CreateTextInputDisabledSharedValues {
	activeIndicatorScaleYSharedValue: SharedValue<number>
	colorSharedValue: SharedValue<number>
	headerInnerBackgroundColorSharedValue: SharedValue<number>
}

export interface CreateTextInputErrorSharedValues {
	activeIndicatorScaleYSharedValue: SharedValue<number>
	colorSharedValue: SharedValue<number>
	headerInnerBackgroundColorSharedValue: SharedValue<number>
}

export interface CreateTextInputFocusedSharedValues {
	activeIndicatorScaleYSharedValue: SharedValue<number>
	colorSharedValue: SharedValue<number>
	headerInnerBackgroundColorSharedValue: SharedValue<number>
}

export type TextInputStateAnimated = Partial<Record<State, () => void>>
export type AnimateTextInputOptions = Pick<TextInputProps, 'error' | 'disabled'>
