import type {CommonProps, ComponentStatus, EventName, State} from '@/constants'
import type {HandleStateEventChangeOptions, InteractionHandlers} from '@/hooks'
import type {RefAttributes, RefObject} from 'react'
import type {PressableProps, TextInput, TextInputProps, TextStyle, View, ViewStyle} from 'react-native'
import type {AnimatedStyle, SharedValue} from 'react-native-reanimated'
import type {RenderSearchProps} from '../Search.interface'

export interface SearchTextInputProps
	extends
		Partial<TextInputProps & PressableProps & RefAttributes<TextInput> & InteractionHandlers>,
		Pick<RenderSearchProps, 'expanded' | 'leading' | 'trailing' | 'listVisible'>,
		CommonProps {
	disabled?: boolean
}

export interface RenderSearchTextInputProps extends SearchTextInputProps {
	contentAnimatedStyle: AnimatedStyle<ViewStyle>
	eventName?: EventName
	inputAnimatedStyle: AnimatedStyle<TextStyle>
	interactionHandlers: InteractionHandlers
	leadingElement?: React.JSX.Element
	trailingElement?: React.JSX.Element
}

export type SearchTextInputBaseProps = SearchTextInputProps
export interface SearchTextInputState {
	eventName?: EventName
	nextChangeTextEvent?: () => void
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
export interface AnimateSearchTextInputBorderRadiusOptions {
	borderBottomRadiusSharedValue: SharedValue<number>
	borderTopRadiusSharedValue: SharedValue<number>
}
