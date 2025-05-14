import type {ForwardedRef, RefAttributes} from 'react'
import type Animated from 'react-native-reanimated'
import type {InteractionHandler} from '../../hooks'
import type {CommonProps, EventName, ShapeType} from '../Common'
import type {OnVirtualListCloseOptions, RenderVirtualListItemInfo, VirtualListProps} from '../Virtual-list'
import type {ListAfterAffordanceProps, ListItemAfterAffordancePressOutOptions} from './List-after-affordance'
import type {ListItemProps} from './List-item'
import {ACTIVE_TRIGGER_EVEN_NAME, LIST_SELECT_TYPE, LIST_TYPE} from './List.enum'

export type ListSelectType = (typeof LIST_SELECT_TYPE)[keyof typeof LIST_SELECT_TYPE]
export type ListType = (typeof LIST_TYPE)[keyof typeof LIST_TYPE]
export type ActiveTriggerEvenName = (typeof ACTIVE_TRIGGER_EVEN_NAME)[keyof typeof ACTIVE_TRIGGER_EVEN_NAME]
export type VirtualListComponent<T> = (
	props: VirtualListProps<T> & {ref?: ForwardedRef<Animated.ScrollView>}
) => React.ReactElement | null

export interface ListData
	extends Pick<
		ListItemProps,
		| 'contentStyle'
		| 'extraData'
		| 'headline'
		| 'leading'
		| 'supporting'
		| 'supportingTextNumberOfLines'
		| 'trailing'
		| 'trailingProps'
	> {
	indexKey: string
}

export type RenderListItemOptions = RenderVirtualListItemInfo<ListData> & CreateRenderListItemOptions
export interface HandleListAffordanceActiveChangeOptions {
	callback?: () => void
	activeKey?: string
}

export interface ListProps
	extends Omit<Partial<VirtualListProps<ListData> & RefAttributes<VirtualListComponent<ListData>>>, 'ref'>,
		CommonProps {
	activeKey?: string
	activeKeys?: string[]
	activeTriggerEvenName?: ActiveTriggerEvenName
	afterAffordance?: React.JSX.Element | boolean
	afterAffordanceActiveKey?: string
	afterAffordancePrimaryButtonProps?: ListAfterAffordanceProps['primaryButtonProps']
	afterAffordanceSecondaryButtonProps?: ListAfterAffordanceProps['secondaryButtonProps']
	beforeAffordance?: React.JSX.Element | boolean
	closeTrailing?: boolean
	data?: ListData[]
	defaultActiveKey?: string
	defaultActiveKeys?: string[]
	deselect?: boolean
	divider?: boolean
	enableUnderlay?: boolean
	enableUnderlayActive?: boolean
	focusedIndex?: number
	gap?: number
	onActive?: (activeKey?: string) => void
	onActiveAfterAffordance?: (options?: HandleListAffordanceActiveChangeOptions) => void
	onActives?: (activeKeys?: string[]) => void
	onCancel?: (options: ListItemAfterAffordancePressOutOptions) => void
	onClose?: (options: OnVirtualListCloseOptions) => void
	onConfirm?: (options: ListItemAfterAffordancePressOutOptions) => void
	onItemStateEvent?: InteractionHandler
	ref?: ForwardedRef<Animated.ScrollView>
	selectType?: ListSelectType
	shape?: ShapeType
	skeletonDuration?: number
	skeletonElement?: React.JSX.Element
	supportingTextNumberOfLines?: number
	trailing?: React.JSX.Element
	trailingTriggerEvenName?: EventName
	type?: ListType
}

export interface RenderListProps extends ListProps {
	onUnmount?: (indexKey?: string) => void
}

export interface ListState {
	activeKey?: string
	activeKeys?: string[]
	afterAffordanceActiveKey?: string
	data?: ListData[]
	nextActiveEvent?: () => void
	nextAfterAffordanceActiveEvent?: () => void
	nextAfterAffordanceEvent?: () => void
	nextCloseEvent?: () => void
}

export type CreateRenderListItemOptions = Pick<
	RenderListProps,
	| 'activeKey'
	| 'activeKeys'
	| 'activeTriggerEvenName'
	| 'afterAffordance'
	| 'afterAffordanceActiveKey'
	| 'afterAffordancePrimaryButtonProps'
	| 'afterAffordanceSecondaryButtonProps'
	| 'beforeAffordance'
	| 'closeTrailing'
	| 'defaultActiveKey'
	| 'density'
	| 'divider'
	| 'enableUnderlay'
	| 'enableUnderlayActive'
	| 'extraData'
	| 'focusedIndex'
	| 'id'
	| 'onActive'
	| 'onActiveAfterAffordance'
	| 'onCancel'
	| 'onConfirm'
	| 'renderItem'
	| 'selectType'
	| 'shape'
	| 'skeletonDuration'
	| 'skeletonElement'
	| 'supportingTextNumberOfLines'
	| 'trailing'
	| 'trailingTriggerEvenName'
	| 'type'
>

export interface ListBaseProps extends ListProps {
	renderList: (props: RenderListProps) => React.JSX.Element
}

export type HandleListActiveChangeOptions = Pick<ListProps, 'onActive' | 'selectType' | 'onActives' | 'deselect'>
export type CreateListItemSizeOptions = Pick<RenderListProps, 'density' | 'type'>
