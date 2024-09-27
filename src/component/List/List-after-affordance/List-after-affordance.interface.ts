import {RefAttributes} from 'react'
import {GestureResponderEvent, View, ViewProps, ViewStyle} from 'react-native'
import {AnimatedStyle} from 'react-native-reanimated'
import {ListAffordanceButtonProps} from '../List-affordance-button'

export interface ListAfterAffordancePressOutOptions {
    doubleConfirmed?: boolean
    itemKey?: string
}

export interface ListAfterAffordanceProps extends ViewProps, RefAttributes<View> {
    itemKey: string
    onCancel?: (options: ListAfterAffordancePressOutOptions) => void
    onConfirm?: (options: ListAfterAffordancePressOutOptions) => void
    primaryButtonProps?: ListAffordanceButtonProps
    secondaryButtonProps?: ListAffordanceButtonProps
    visible?: boolean
}

export interface RenderListAfterAffordanceProps
    extends Omit<ListAfterAffordanceProps, 'itemKey' | 'onCancel' | 'onConfirm'> {
    dangerAnimatedStyle: AnimatedStyle<ViewStyle>
    doubleConfirmed?: boolean
    fill: string
    onCancel: (event: GestureResponderEvent) => void
    onConfirm: (event: GestureResponderEvent) => void
}

export interface ListAfterAffordanceBaseProps extends ListAfterAffordanceProps {
    render: (props: RenderListAfterAffordanceProps) => React.JSX.Element
}

export interface ListAfterAffordanceInitialState {
    doubleConfirmed?: boolean
    nextCancelEvent?: () => void
}

export type HandleListAfterAffordanceConfirmOptions = Pick<ListAfterAffordanceProps, 'onConfirm' | 'itemKey'> &
    ListAfterAffordanceInitialState

export type HandleListAfterAffordanceCancelOptions = Pick<ListAfterAffordanceProps, 'onCancel' | 'itemKey'> &
    ListAfterAffordanceInitialState

export interface UseListAfterAffordanceAnimatedOptions extends Pick<RenderListAfterAffordanceProps, 'doubleConfirmed'> {
    layoutWidth?: number
}

export interface ListAfterAffordanceDangerProps {
    disabled?: boolean
}
