import {RefAttributes} from 'react'
import {StateOnEvent} from '../../hooks'
import {EventName, ShapeType} from '../Common'
import {OnVirtualListCloseOptions, RenderVirtualListItemInfo, VirtualList, VirtualListProps} from '../Virtual-list'
import {ListAfterAffordancePressOutOptions, ListAfterAffordanceProps} from './List-after-affordance'
import {ListItemProps, SelectType} from './List-item'

export type VirtualListComponent<T> = typeof VirtualList<T>
export type ListType = 'standard' | 'menu'
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

export interface ListProps extends Partial<VirtualListProps<ListData> & RefAttributes<VirtualListComponent<ListData>>> {
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
        onActive?: (value?: string) => void
        onActiveAfterAffordance?: (options?: OnActiveAfterAffordanceOptions) => void
        onActives?: (values?: string[]) => void
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

        /**
         * Whether to enable auto-associative selection in radio mode. If the deleted item is an active item of the
         * current year, the list will automatically look for neighboring items with the active option.
         */
        enableAutoSelect?: boolean
}

export interface RenderListProps extends ListProps {
        onUnmount?: (value?: string) => void
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
