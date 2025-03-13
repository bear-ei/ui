import {TextStyle, ViewStyle} from 'react-native'
import {AnimatedStyle} from 'react-native-reanimated'
import {DefaultTheme} from 'styled-components'
import {HandleStateEventChangeOptions, StateOnEvent} from '../../../hooks'
import {EventName} from '../../Common'
import {TouchableProps} from '../../Touchable'

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
        stateOnEvent: StateOnEvent
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
