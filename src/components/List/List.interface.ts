import type {ForwardedRef, RefAttributes} from 'react'
import type Animated from 'react-native-reanimated'
import type {InteractionHandlers} from '../../hooks'
import type {CommonProps, ShapeType, TriggerEvent} from '../Common'
import type {OnVirtualListCloseOptions, RenderVirtualListItemInfo, VirtualListProps} from '../Virtual-list'
import type {ListAfterAffordanceProps, ListItemAfterAffordancePressOutOptions} from './List-after-affordance'
import type {ListItemProps} from './List-item'
import {LIST_LEADING_TYPE, LIST_SELECT_TYPE, LIST_TYPE} from './List.enum'

export type ListLeadingType = (typeof LIST_LEADING_TYPE)[keyof typeof LIST_LEADING_TYPE]
export type ListSelectType = (typeof LIST_SELECT_TYPE)[keyof typeof LIST_SELECT_TYPE]
export type ListType = (typeof LIST_TYPE)[keyof typeof LIST_TYPE]
export type VirtualListComponent<T> = (
	props: VirtualListProps<T> & {ref?: ForwardedRef<Animated.ScrollView>}
) => React.ReactElement | null

export interface ListData
	extends Pick<
		ListItemProps,
		| 'contentStyle'
		| 'dependencies'
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
export interface UpdateListAffordanceActiveStateOptions {
	activeKey?: string
	callback?: () => void
}

export interface ListProps
	extends Omit<Partial<VirtualListProps<ListData> & RefAttributes<VirtualListComponent<ListData>>>, 'ref'>,
		CommonProps {
	activeKey?: string
	activeKeys?: string[]
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
	draggable?: boolean
	enableUnderlay?: boolean
	enableUnderlayActive?: boolean
	focusedIndex?: number
	gap?: number
	leadingType?: ListLeadingType
	onActive?: (indexKey?: string) => void
	onActiveAfterAffordance?: (options?: UpdateListAffordanceActiveStateOptions) => void
	onActives?: (activeKeys?: string[]) => void
	onCancel?: (options: ListItemAfterAffordancePressOutOptions) => void
	onClose?: (options: OnVirtualListCloseOptions) => void
	onConfirm?: (options: ListItemAfterAffordancePressOutOptions) => void
	onItemStateEvent?: InteractionHandlers
	ref?: ForwardedRef<Animated.ScrollView>
	selectType?: ListSelectType
	shape?: ShapeType
	skeletonDuration?: number
	skeletonElement?: React.JSX.Element
	supportingTextNumberOfLines?: number
	trailing?: React.JSX.Element
	trailingTriggerEvent?: TriggerEvent
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
	| 'afterAffordance'
	| 'afterAffordanceActiveKey'
	| 'afterAffordancePrimaryButtonProps'
	| 'afterAffordanceSecondaryButtonProps'
	| 'beforeAffordance'
	| 'closeTrailing'
	| 'defaultActiveKey'
	| 'density'
	| 'dependencies'
	| 'divider'
	| 'enableUnderlay'
	| 'enableUnderlayActive'
	| 'focusedIndex'
	| 'id'
	| 'leadingType'
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
	| 'trailingTriggerEvent'
	| 'type'
>

export type CreateListItemSizeOptions = Pick<RenderListProps, 'density' | 'type'>
export type ListBaseProps = ListProps
export type ListContainerProps = Pick<RenderListProps, 'layout'>
export type UpdateListActiveStateOptions = Pick<ListProps, 'onActive' | 'selectType' | 'onActives' | 'deselect'>
