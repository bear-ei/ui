import type {TextStyle, ViewStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'
import type {HandleStateEventChangeOptions, InteractionHandlers} from '../../../hooks'
import type {CommonProps, EventName} from '../../Common'
import type {TouchableProps} from '../../Touchable'

export interface ListAffordanceButtonProps extends TouchableProps, CommonProps {
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
}

export type ListAffordanceButtonBaseProps = ListAffordanceButtonProps
export interface ListAffordanceButtonState {
	eventName?: EventName
}

export type UseListAffordanceButtonAnimatedOptions = Pick<RenderListAffordanceButtonProps, 'disabled'>
export type HandleListAffordanceButtonStateChangeOptions = HandleStateEventChangeOptions
export type ListAffordanceButtonContainerProps = Pick<RenderListAffordanceButtonProps, 'disabled'>
