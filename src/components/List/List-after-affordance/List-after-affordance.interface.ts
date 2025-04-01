import {RefAttributes} from 'react'
import {GestureResponderEvent, View, ViewProps, ViewStyle} from 'react-native'
import {AnimatedStyle} from 'react-native-reanimated'
import {DefaultTheme} from 'styled-components/native'
import {ListItemProps} from '../List-item'

export interface ListAfterAffordancePressOutOptions {
        doubleConfirmed?: boolean
        indexKey?: string
}

export interface ListAfterAffordanceProps
        extends ViewProps,
                RefAttributes<View>,
                Pick<
                        ListItemProps,
                        'indexKey' | 'primaryButtonProps' | 'secondaryButtonProps' | 'onCancel' | 'onConfirm'
                > {
        visible?: boolean
}

export interface RenderListAfterAffordanceProps
        extends Omit<ListAfterAffordanceProps, 'indexKey' | 'onCancel' | 'onConfirm'> {
        dangerAnimatedStyle: AnimatedStyle<ViewStyle>
        doubleConfirmed?: boolean
        onCancel: (event: GestureResponderEvent) => void
        onConfirm: (event: GestureResponderEvent) => void
        theme: DefaultTheme
}

export interface ListAfterAffordanceBaseProps extends ListAfterAffordanceProps {
        render: (props: RenderListAfterAffordanceProps) => React.JSX.Element
}

export interface ListAfterAffordanceState {
        doubleConfirmed?: boolean
        nextCancelEvent?: () => void
}

export type HandleListAfterAffordanceConfirmOptions = Pick<ListAfterAffordanceProps, 'onConfirm' | 'indexKey'> &
        ListAfterAffordanceState

export type HandleListAfterAffordanceCancelOptions = Pick<ListAfterAffordanceProps, 'onCancel' | 'indexKey'> &
        ListAfterAffordanceState

export interface UseListAfterAffordanceAnimatedOptions extends Pick<RenderListAfterAffordanceProps, 'doubleConfirmed'> {
        layoutWidth?: number
}

export interface ListAfterAffordanceDangerProps {
        disabled?: boolean
}
