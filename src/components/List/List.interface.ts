import type {JSX} from 'react'
import type {ViewStyle} from 'react-native'

import type {TriggerOn} from '../../constants'
import type {InteractionHandlers} from '../../hooks'
import type {ThemeProps} from '../../theme'
import type {RenderVirtualListItemInfo, VirtualListCloseEvent, VirtualListProps} from '../Virtual-list'
import type {ListAfterAffordancePressOutEvent} from './List-after-affordance'

import {LIST_SELECT_TYPE, LIST_TYPE} from './List.enum'

export type ListSelectType = (typeof LIST_SELECT_TYPE)[keyof typeof LIST_SELECT_TYPE]
export type ListType = (typeof LIST_TYPE)[keyof typeof LIST_TYPE]

export interface ListItemData {
	/**
	 * Enabling ripples while using style to specify the background color can cause the ripple to be obscured, as the
	 * ripple is always one z-index level below the main container. This property is used to specify the background
	 * color when ripples are enabled.
	 */
	contentStyle?: ViewStyle
	dependencies?: unknown[]
	headline?: React.ReactNode
	indexKey: string

	/**
	 * Leading element rendered on the left of each item.
	 *
	 * Typical usage: a single icon (`<Circle />` / `<User />`).
	 * The icon's `size` is passed by `List` — the icon component should
	 * accept a `size` prop and forward it to the underlying glyph.
	 */
	leading?: JSX.Element
	primaryButtonDisabled?: boolean
	primaryButtonLabelText?: string
	primaryButtonLoading?: boolean
	primaryButtonStyle?: ViewStyle
	secondaryButtonDisabled?: boolean
	secondaryButtonLabelText?: string
	secondaryButtonLoading?: boolean
	secondaryButtonStyle?: ViewStyle
	supporting?: string | JSX.Element
	supportingTextNumberOfLines?: number

	/**
	 * Trailing element rendered on the right of each item.
	 *
	 * ⚠️ Convention: this slot is reserved for CONTROLLABLE actions —
	 * typically a single `IconButton`. The icon size alignment between
	 * `leadingElement` and `trailingElement` relies on both going through
	 * the same `stepDownDensitySize(stepDownDensitySize(size))` chain.
	 * Putting a non-IconButton component here may break that alignment.
	 */
	trailing?: JSX.Element
}

export type RenderListItemOptions = RenderVirtualListItemInfo<ListItemData> & CreateRenderListItemOptions
export interface ListAffordanceActiveStateEvent {
	activeKey?: string
	callbackEvent?: ListAfterAffordancePressOutEvent
}

export interface ListProps
	extends
		Partial<VirtualListProps<ListItemData>>,
		Pick<ListItemData, 'supportingTextNumberOfLines' | 'trailing'>,
		ThemeProps {
	activeKey?: string
	activeKeys?: string[]
	afterAffordance?: JSX.Element | boolean
	afterAffordanceActiveKey?: string
	beforeAffordance?: JSX.Element | boolean
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
	onActive?: (indexKey: string) => void
	onActiveAfterAffordance?: (event?: ListAffordanceActiveStateEvent) => void
	onActives?: (activeKeys?: string[]) => void
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
	selectType?: ListSelectType
	skeletonDuration?: number
	skeletonElement?: JSX.Element
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
