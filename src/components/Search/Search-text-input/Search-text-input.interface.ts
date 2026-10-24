import type {JSX, RefAttributes, RefObject} from 'react'
import type {PressableProps, TextInput, TextInputProps, TextStyle, ViewStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'

import type {ComponentStatus, EventName, InteractionState} from '../../../constants'
import type {HandleInteractionStateChangeOptions, InteractionHandlers} from '../../../hooks'
import type {ThemeableProps} from '../../../theme'
import type {RenderSearchProps} from '../Search.interface'

export interface SearchTextInputProps
	extends
		Partial<TextInputProps & PressableProps & RefAttributes<TextInput> & InteractionHandlers>,
		Pick<RenderSearchProps, 'expanded' | 'leading' | 'trailing' | 'listVisible'>,
		ThemeableProps {
	disabled?: boolean
}

export interface RenderSearchTextInputProps extends SearchTextInputProps {
	contentAnimatedStyle: AnimatedStyle<ViewStyle>
	eventName?: EventName
	inputAnimatedStyle: AnimatedStyle<TextStyle>
	interactionHandlers: InteractionHandlers
	leadingElement?: JSX.Element
	trailingElement?: JSX.Element
}

export type SearchTextInputBaseProps = SearchTextInputProps
export interface SearchTextInputState {
	eventName?: EventName
	interactionState: InteractionState
	pendingChangeTextEvent?: string
	status: ComponentStatus
	value?: string
}

export interface HandleSearchTextInputInteractionStateChangeOptions extends HandleInteractionStateChangeOptions {
	ref?: RefObject<TextInput | null>
}

export type UseSearchTextInputAnimatedOptions = Pick<RenderSearchTextInputProps, 'disabled' | 'expanded'>
