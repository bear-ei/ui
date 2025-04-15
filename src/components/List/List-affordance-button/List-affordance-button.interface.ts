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
	visible?: boolean
}

export interface RenderListAffordanceButtonProps extends ListAffordanceButtonProps {
	backgroundUnderlayAnimatedStyle: AnimatedStyle<ViewStyle>
	eventName?: EventName
	labelTextAnimatedStyle: AnimatedStyle<TextStyle>
	stateOnEvent: InteractionHandlers
	theme: DefaultTheme
}

export interface ListAffordanceButtonBaseProps extends ListAffordanceButtonProps {
	render: (props: RenderListAffordanceButtonProps) => React.JSX.Element
}

export interface ListAffordanceButtonState {
	eventName?: EventName
}

export type UseListAffordanceButtonAnimatedOptions = Pick<RenderListAffordanceButtonProps, 'disabled'>
export type HandleListAffordanceButtonStateEventChangeOptions = HandleStateEventChangeOptions &
	Pick<RenderListAffordanceButtonProps, 'visible'>

export type ListAffordanceButtonContainerProps = Pick<RenderListAffordanceButtonProps, 'disabled'>
