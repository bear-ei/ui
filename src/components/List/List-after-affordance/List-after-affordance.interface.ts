import type {ComponentStatus} from '@/constants'
import type {InteractionHandlers} from '@/hooks'
import type {RefAttributes} from 'react'
import type {GestureResponderEvent, View, ViewProps, ViewStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'
import type {ListItemProps} from '../List-item'

export interface ListAfterAffordanceProps
        extends ViewProps,
                RefAttributes<View>,
                Pick<
                        ListItemProps,
                        | 'indexKey'
                        | 'onCancel'
                        | 'onConfirm'
                        | 'primaryButtonDisabled'
                        | 'primaryButtonLabelText'
                        | 'primaryButtonLoading'
                        | 'primaryButtonStyle'
                        | 'secondaryButtonDisabled'
                        | 'secondaryButtonLabelText'
                        | 'secondaryButtonLoading'
                        | 'secondaryButtonStyle'
                        | 'size'
                > {
        visible?: boolean
}

export interface RenderListAfterAffordanceProps
        extends Omit<ListAfterAffordanceProps, 'indexKey' | 'onCancel' | 'onConfirm'> {
        dangerAnimatedStyle: AnimatedStyle<ViewStyle>
        doubleConfirmed?: boolean
        interactionHandlers: InteractionHandlers
        onCancel: (event: GestureResponderEvent) => void
        onConfirm: (event: GestureResponderEvent) => void
}

export type ListAfterAffordanceBaseProps = ListAfterAffordanceProps
export interface ListAfterAffordanceState {
        doubleConfirmed?: boolean
        nextCancelEvent?: () => void
        status: ComponentStatus
}

export type TriggerListAfterAffordanceConfirmOptions = Pick<ListAfterAffordanceProps, 'onConfirm' | 'indexKey'> &
        Pick<ListAfterAffordanceState, 'doubleConfirmed' | 'nextCancelEvent'>

export type UpdateListAffordanceCancelStateOptions = Pick<ListAfterAffordanceProps, 'onCancel' | 'indexKey'> &
        Pick<ListAfterAffordanceState, 'doubleConfirmed' | 'nextCancelEvent'>

export interface UseListAfterAffordanceAnimatedOptions extends Pick<RenderListAfterAffordanceProps, 'doubleConfirmed'> {
        dangerDisabled?: boolean
        layoutWidth?: number
        status: ComponentStatus
}

export interface ListItemAfterAffordancePressOutOptions {
        doubleConfirmed?: boolean
        indexKey?: string
}
