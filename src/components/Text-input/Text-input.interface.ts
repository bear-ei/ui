import type {RefAttributes, RefObject} from 'react'
import type {PressableProps, TextInputProps as RNTextInputProps, TextInput, TextStyle, ViewStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'

import type {ComponentStatus, EventName, PartialSize, InteractionState} from '../../constants'
import type {HandleInteractionStateChangeOptions, InteractionHandlers} from '../../hooks'
import type {ThemeableProps} from '../../theme'
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
		ThemeableProps {
	disabled?: boolean
	error?: boolean
	headerContent?: React.ReactNode
	labelText?: string
	leading?: React.JSX.Element
	onContentSizeChange?: (contentSize: {height: number; width: number}) => void
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
	interactionState: InteractionState
	pendingChangeTextEvent?: string
	pendingContentSizeChangeEvent?: {height: number; width: number}
	pendingSupportingTextAnimationFinishedEvent?: boolean
	pendingSupportingTextCloseEvent?: boolean
	status: ComponentStatus
	supportingText?: string
	supportingTextVisible?: boolean
	value?: string
}

export interface HandleTextInputInteractionStateChangeOptions
	extends HandleInteractionStateChangeOptions, Pick<TextInputProps, 'headerContent'> {
	ref?: RefObject<TextInput | null>
}

export interface UseTextInputAnimatedOptions extends Pick<RenderTextInputProps, 'type' | 'error' | 'disabled'> {
	interactionState: InteractionState
	status: ComponentStatus
}

export interface UpdateTextInputSupportingTextOptions extends Pick<TextInputProps, 'supportingTextDelay'> {
	onSupportingTextClose?: () => void
}

export type TextInputInteractionStateAnimations = Partial<Record<InteractionState, () => void>>
export type AnimateTextInputOptions = Pick<TextInputProps, 'error' | 'disabled'>
