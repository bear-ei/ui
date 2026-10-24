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
			| 'itemKey'
			| 'onSecondaryPress'
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
		Pick<ListProps, 'onPrimaryAction'> {
	visible?: boolean
}

export interface RenderListAfterAffordanceProps
	extends
		Omit<ListAfterAffordanceProps, 'itemKey' | 'onSecondaryPress' | 'onPrimaryAction'>,
		Pick<ListAfterAffordancePressOutEvent, 'phase'> {
	dangerAnimatedStyle: AnimatedStyle<ViewStyle>
	interactionHandlers: InteractionHandlers
	onPrimaryAction: (event: GestureResponderEvent) => void
	onSecondaryPress: (event: GestureResponderEvent) => void
}

export type ListAfterAffordanceBaseProps = ListAfterAffordanceProps
export interface ListAfterAffordanceState extends Pick<ListAfterAffordancePressOutEvent, 'phase'> {
	pendingSecondaryPressEvent?: ListAfterAffordancePressOutEvent
	status: ComponentStatus
}

export type TriggerListAfterAffordancePrimaryActionOptions = Pick<
	ListAfterAffordanceProps,
	'itemKey' | 'onPrimaryAction'
> &
	Pick<ListAfterAffordanceState, 'phase'>

export type UpdateListAffordanceSecondaryPressOptions = Pick<ListAfterAffordanceProps, 'onSecondaryPress' | 'itemKey'> &
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
 *   - primary   → onPrimaryAction({ phase })
 *       phase === IDLE   → normal action (edit, navigate, …)
 *       phase === DANGER → destructive action (delete, …)
 *
 *   - secondary → onSecondaryPress({ phase })
 *       phase === IDLE   → the user *entered* the danger phase
 *       phase === DANGER → the user *exited* the danger phase
 *
 * ⚠️ `onSecondaryPress` is NOT "cancel the affordance" — it's "the user
 * tapped the destructive side". Actual destructive work belongs in
 * `onPrimaryAction` when `phase === DANGER`. `onSecondaryPress` is typically a
 * no-op — the UI already handles the state transition.
 */
export interface ListAfterAffordancePressOutEvent {
	itemKey?: string
	phase: ListAfterAffordancePhase
}
