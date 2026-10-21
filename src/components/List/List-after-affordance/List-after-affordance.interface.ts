import type {RefAttributes} from 'react'
import type {GestureResponderEvent, View, ViewProps, ViewStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'

import type {ComponentStatus} from '../../../constants'
import type {InteractionHandlers} from '../../../hooks'
import type {ListItemProps} from '../List-item'
import type {ListProps} from '../List.interface'

import type {LIST_AFTER_AFFORDANCE_PHASE} from './List-after-affordance.enum'

export type ListAfterAffordancePhase = (typeof LIST_AFTER_AFFORDANCE_PHASE)[keyof typeof LIST_AFTER_AFFORDANCE_PHASE]
export interface ListAfterAffordanceProps
	extends
		ViewProps,
		RefAttributes<View>,
		Pick<
			ListItemProps,
			| 'indexKey'
			| 'onSecondaryAction'
			| 'primaryButtonDisabled'
			| 'primaryButtonLabelText'
			| 'primaryButtonLoading'
			| 'primaryButtonStyle'
			| 'secondaryButtonDisabled'
			| 'secondaryButtonLabelText'
			| 'secondaryButtonLoading'
			| 'secondaryButtonStyle'
			| 'size'
		>,
		Pick<ListProps, 'onConfirm'> {
	visible?: boolean
}

export interface RenderListAfterAffordanceProps
	extends
		Omit<ListAfterAffordanceProps, 'indexKey' | 'onSecondaryAction' | 'onConfirm'>,
		Pick<ListAfterAffordancePressOutEvent, 'phase'> {
	dangerAnimatedStyle: AnimatedStyle<ViewStyle>
	interactionHandlers: InteractionHandlers
	onConfirm: (event: GestureResponderEvent) => void
	onSecondaryAction: (event: GestureResponderEvent) => void
}

export type ListAfterAffordanceBaseProps = ListAfterAffordanceProps
export interface ListAfterAffordanceState extends Pick<ListAfterAffordancePressOutEvent, 'phase'> {
	pendingSecondaryActionEvent?: ListAfterAffordancePressOutEvent
	status: ComponentStatus
}

export type TriggerListAfterAffordanceConfirmOptions = Pick<ListAfterAffordanceProps, 'indexKey' | 'onConfirm'> &
	Pick<ListAfterAffordanceState, 'phase'>

export type UpdateListAffordanceSecondaryActionStateOptions = Pick<
	ListAfterAffordanceProps,
	'onSecondaryAction' | 'indexKey'
> &
	Pick<ListAfterAffordanceState, 'phase'>

export interface UseListAfterAffordanceAnimatedOptions extends Pick<ListAfterAffordancePressOutEvent, 'phase'> {
	status: ComponentStatus
}

/**
 * Two-step destructive action flow.
 *
 * `afterAffordance` items render two buttons that walk the user through a
 * confirmation gate before a destructive operation runs:
 *
 *   ┌──────────────────┬──────────────────┐
 *   │  primary (Edit)  │ secondary (Del)  │   phase: IDLE
 *   ├──────────────────┼──────────────────┤
 *   │  primary (Check) │ secondary (X)    │   phase: DANGER
 *   └──────────────────┴──────────────────┘
 *
 * Tap routing:
 *   - primary   → onConfirm({ phase })
 *       phase === IDLE   → normal action (edit, navigate, …)
 *       phase === DANGER → destructive action (delete, …)
 *
 *   - secondary → onSecondaryAction({ phase })
 *       phase === IDLE   → the user *entered* the danger phase
 *       phase === DANGER → the user *exited* the danger phase
 *
 * ⚠️ `onSecondaryAction` is NOT "cancel the affordance" — it's "the user
 * tapped the destructive side". Actual destructive work belongs in
 * `onConfirm` when `phase === DANGER`. `onSecondaryAction` is typically a
 * no-op — the UI already handles the state transition.
 */
export interface ListAfterAffordancePressOutEvent {
	phase: ListAfterAffordancePhase
	indexKey?: string
}
