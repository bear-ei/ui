import {RefAttributes} from 'react'
import {StateOnEvent} from '../../hooks'
import {CommonProps, EventName, ShapeType} from '../Common'
import {OnVirtualListCloseOptions, RenderVirtualListItemInfo, VirtualList, VirtualListProps} from '../Virtual-list'
import {ListAfterAffordancePressOutOptions, ListAfterAffordanceProps} from './List-after-affordance'
import {ListItemProps} from './List-item'
import {ListType, SelectType} from './List.enum'

export type VirtualListComponent<T> = typeof VirtualList<T>
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

export type RenderListItemOptions = RenderVirtualListItemInfo<ListData> & HandleRenderItemOptions
export interface OnActiveAfterAffordanceOptions {
        callback?: () => void
        activeKey?: string
}

export interface ListProps
        extends Partial<VirtualListProps<ListData> & RefAttributes<VirtualListComponent<ListData>>>,
                CommonProps {
        activeKey?: string
        activeKeys?: string[]
        activeTriggerEvenName?: EventName
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
        onActiveAfterAffordance?: (options?: OnActiveAfterAffordanceOptions) => void
        onActives?: (activeKeys?: string[]) => void
        onCancel?: (options: ListAfterAffordancePressOutOptions) => void
        onClose?: (options: OnVirtualListCloseOptions) => void
        onConfirm?: (options: ListAfterAffordancePressOutOptions) => void
        onItemStateEvent?: StateOnEvent
        selectType?: SelectType
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
        nextAfterAffordanceCallbackEvent?: () => void
        nextCloseEvent?: () => void
}

export type HandleRenderItemOptions = Pick<
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
        | 'densityScale'
        | 'divider'
        | 'enableUnderlay'
        | 'enableUnderlayActive'
        | 'extraData'
        | 'focusedIndex'
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
        render: (props: RenderListProps) => React.JSX.Element
}

export type HandleListActiveOptions = Pick<ListProps, 'onActive' | 'selectType' | 'onActives' | 'deselect'>
