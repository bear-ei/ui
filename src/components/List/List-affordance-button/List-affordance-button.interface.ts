import {TextStyle, ViewStyle} from 'react-native'
import {AnimatedStyle} from 'react-native-reanimated'
import {OnStateEvent, OnStateEventChangeOptions} from '../../../hooks'
import {EventName} from '../../Common'
import {TouchableProps} from '../../Touchable'

export interface ListAffordanceButtonProps extends TouchableProps {
        icon?: JSX.Element
        labelText?: string
        loading?: boolean
        underlayColor?: string
}

export interface RenderListAffordanceButtonProps extends ListAffordanceButtonProps {
        contentUnderlayAnimatedStyle: AnimatedStyle<ViewStyle>
        eventName?: EventName
        labelTextAnimatedStyle: AnimatedStyle<TextStyle>
        onStateEvent: OnStateEvent
}

export interface ListAffordanceButtonBaseProps extends ListAffordanceButtonProps {
        render: (props: RenderListAffordanceButtonProps) => JSX.Element
}

export interface ListAffordanceButtonState {
        eventName?: EventName
}

export type UseListAffordanceButtonAnimatedOptions = Pick<RenderListAffordanceButtonProps, 'disabled'>
export type HandleListAffordanceButtonStateEventChangeOptions = OnStateEventChangeOptions
export type ListAffordanceButtonContainerProps = Pick<RenderListAffordanceButtonProps, 'disabled'>
