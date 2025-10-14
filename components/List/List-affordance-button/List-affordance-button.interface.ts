import {TouchableProps} from '@/components/Touchable'
import {CommonProps, EventName} from '@/constants'
import {HandleStateEventChangeOptions, InteractionHandlers} from '@/hooks'
import type {TextStyle, ViewStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'

export interface ListAffordanceButtonProps extends TouchableProps, CommonProps {
        backgroundVisible?: boolean
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

export type UseListAffordanceButtonAnimatedOptions = Pick<
        RenderListAffordanceButtonProps,
        'disabled' | 'backgroundVisible'
>

export type HandleListAffordanceButtonStateChangeOptions = HandleStateEventChangeOptions
