import type {TextStyle, ViewStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'

import type {EventName} from '../../../constants'
import type {HandleStateEventChangeOptions, InteractionHandlers} from '../../../hooks'
import type {ThemeProps} from '../../../theme'
import type {TouchableProps} from '../../Touchable'

export interface ListAffordanceButtonProps extends TouchableProps, ThemeProps {
	backgroundVisible?: boolean
	icon?: React.JSX.Element
	labelText?: string
	loading?: boolean
	underlayColor?: string
}

export interface RenderListAffordanceButtonProps extends ListAffordanceButtonProps {
	backgroundUnderlayAnimatedStyle: AnimatedStyle<ViewStyle>
	eventName?: EventName
	interactionHandlers: InteractionHandlers
	labelTextAnimatedStyle: AnimatedStyle<TextStyle>
}

export type ListAffordanceButtonBaseProps = ListAffordanceButtonProps
export interface ListAffordanceButtonState {
	eventName: EventName
}

export type UseListAffordanceButtonAnimatedOptions = Pick<
	RenderListAffordanceButtonProps,
	'disabled' | 'backgroundVisible'
>

export type HandleListAffordanceButtonStateChangeOptions = HandleStateEventChangeOptions
