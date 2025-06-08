import type {TextStyle, ViewStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'
import type {DefaultTheme} from 'styled-components'
import type {HandleStateEventChangeOptions, InteractionHandlers} from '../../../hooks'
import type {EventName} from '../../Common'
import type {TouchableProps} from '../../Touchable'

export interface ListAffordanceButtonProps extends TouchableProps {
	icon?: React.JSX.Element
	labelText?: string
	loading?: boolean
	underlayColor?: string
}

export interface RenderListAffordanceButtonProps extends ListAffordanceButtonProps {
	backgroundUnderlayAnimatedStyle: AnimatedStyle<ViewStyle>
	eventName?: EventName
	labelTextAnimatedStyle: AnimatedStyle<TextStyle>
	interactionHandlers: InteractionHandlers
	theme: DefaultTheme
}

export interface ListAffordanceButtonBaseProps extends ListAffordanceButtonProps {
	renderListAffordanceButton: (props: RenderListAffordanceButtonProps) => React.JSX.Element
}

export interface ListAffordanceButtonState {
	eventName?: EventName
}

export type UseListAffordanceButtonAnimatedOptions = Pick<RenderListAffordanceButtonProps, 'disabled'>
export type HandleListAffordanceButtonStateChangeOptions = HandleStateEventChangeOptions
export type ListAffordanceButtonContainerProps = Pick<RenderListAffordanceButtonProps, 'disabled'>
