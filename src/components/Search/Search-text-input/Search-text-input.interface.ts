import type {JSX, RefAttributes, RefObject} from 'react'
import type {PressableProps, TextInput, TextInputProps, TextStyle, View, ViewStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'

import type {ComponentStatus, EventName, State} from '../../../constants'
import type {HandleStateEventChangeOptions, InteractionHandlers} from '../../../hooks'
import type {ThemeProps} from '../../../theme'
import type {RenderSearchProps} from '../Search.interface'

export interface SearchTextInputProps
	extends
		Partial<TextInputProps & PressableProps & RefAttributes<TextInput> & InteractionHandlers>,
		Pick<RenderSearchProps, 'expanded' | 'leading' | 'trailing' | 'listVisible'>,
		ThemeProps {
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
	pendingChangeTextEvent?: string
	state: State
	status: ComponentStatus
	value?: string
}

export interface HandleSearchTextInputStateChangeOptions extends HandleStateEventChangeOptions {
	ref?: RefObject<TextInput | null>
}

export interface HandleSearchContainerLayoutOptions {
	containerCurrent?: View | null
}

export type UseSearchTextInputAnimatedOptions = Pick<RenderSearchTextInputProps, 'disabled' | 'expanded'>
