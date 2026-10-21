import type {ForwardedRef} from 'react'
import type {ScrollView} from 'react-native'

import type {TriggerOn} from '../../constants'
import type {InteractionHandlers} from '../../hooks'
import type {ThemeProps} from '../../theme'
import type {RenderVirtualListItemInfo, VirtualListCloseEvent, VirtualListProps} from '../Virtual-list'

import type {ListAfterAffordancePressOutEvent} from './List-after-affordance'
import type {ListItemData} from './List-item'
import {LIST_SELECT_TYPE, LIST_TYPE} from './List.enum'

export type ListSelectType = (typeof LIST_SELECT_TYPE)[keyof typeof LIST_SELECT_TYPE]
export type ListType = (typeof LIST_TYPE)[keyof typeof LIST_TYPE]
export type RenderListItemOptions = RenderVirtualListItemInfo<ListItemData> & CreateRenderListItemOptions
export interface ListAffordanceActiveStateEvent {
	activeKey?: string
	callbackEvent?: ListAfterAffordancePressOutEvent
}

export interface ListProps extends Partial<Omit<VirtualListProps<ListItemData>, 'ref'>>, ThemeProps {
	activeKey?: string
	activeKeys?: string[]
	afterAffordance?: React.JSX.Element | boolean
	afterAffordanceActiveKey?: string
	beforeAffordance?: React.JSX.Element | boolean
	closeTrailing?: boolean
	data?: ListItemData[]
	defaultActiveKey?: string
	defaultActiveKeys?: string[]
	deselect?: boolean
	divider?: boolean
	draggable?: boolean
	enableUnderlay?: boolean
	enableUnderlayActive?: boolean
	focusedIndex?: number
	gap?: number
	onActive?: (indexKey?: string) => void
	onActiveAfterAffordance?: (event?: ListAffordanceActiveStateEvent) => void
	onActives?: (activeKeys?: string[]) => void

	/**
	 * Fires when the user taps the secondary (right) button — the destructive side.
	 *
	 * ⚠️ Despite the name, this is NOT "cancel". It fires in BOTH phases and is
	 * usually a no-op — the UI handles the phase transition on its own:
	 *
	 * - `phase === IDLE`   → user *entered* the danger phase
	 * - `phase === DANGER` → user *exited* the danger phase
	 *
	 * Put destructive work in `onConfirm` with `phase === DANGER`, not here.
	 *
	 * See `ListAfterAffordancePressOutEvent` for the full two-step flow.
	 */
	onSecondaryAction?: (event: ListAfterAffordancePressOutEvent) => void
	onClose?: (event: VirtualListCloseEvent) => void

	/**
	 * Fires when the user taps the primary (left) button.
	 *
	 * - `phase === IDLE`   → first tap (label: `primaryButtonLabelText`, default "Edit").
	 *   Execute the normal action (open editor, navigate, …).
	 * - `phase === DANGER` → second tap inside the danger phase (check icon).
	 *   Execute the destructive action (delete the item, …).
	 *
	 * See `ListAfterAffordancePressOutEvent` for the full two-step flow.
	 */
	onConfirm?: (event: ListAfterAffordancePressOutEvent) => void
	onItemStateEvent?: InteractionHandlers
	ref?: ForwardedRef<ScrollView>
	selectType?: ListSelectType
	skeletonDuration?: number
	skeletonElement?: React.JSX.Element
	supportingTextNumberOfLines?: number
	trailing?: React.JSX.Element
	trailingTriggerOn?: TriggerOn
	type?: ListType
}

export interface RenderListProps extends ListProps {
	onUnmount?: (indexKey?: string) => void
}

export interface ListState {
	activeKey?: string
	activeKeys?: string[]
	afterAffordanceActiveKey?: string
	data?: ListItemData[]
	pendingActiveEvent?: string
	pendingActivesEvent?: string[]
	pendingAfterAffordanceActiveEvent?: string
	pendingAfterAffordanceEvent?: ListAfterAffordancePressOutEvent
	pendingCloseEvent?: VirtualListCloseEvent
}

export type CreateRenderListItemOptions = Pick<
	RenderListProps,
	| 'activeKey'
	| 'activeKeys'
	| 'afterAffordance'
	| 'afterAffordanceActiveKey'
	| 'beforeAffordance'
	| 'closeTrailing'
	| 'defaultActiveKey'
	| 'dependencies'
	| 'divider'
	| 'enableUnderlay'
	| 'enableUnderlayActive'
	| 'focusedIndex'
	| 'id'
	| 'onActive'
	| 'onActiveAfterAffordance'
	| 'onSecondaryAction'
	| 'onConfirm'
	| 'radius'
	| 'renderItem'
	| 'selectType'
	| 'shape'
	| 'size'
	| 'skeletonDuration'
	| 'skeletonElement'
	| 'supportingTextNumberOfLines'
	| 'trailing'
	| 'trailingTriggerOn'
	| 'type'
>

export type ListBaseProps = ListProps
export type UpdateListActiveStateOptions = Pick<ListProps, 'onActive' | 'selectType' | 'onActives' | 'deselect'>
