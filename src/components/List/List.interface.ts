import {RefAttributes} from 'react'
import {OnStateEvent} from '../../hooks'
import {ComponentStatus} from '../Common'
import {RenderVirtualListItemInfo, VirtualList, VirtualListProps} from '../Virtual-list'
import {ListItemProps} from './List-item'

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

export interface OnCloseOptions {
        activeKey?: string
        indexKey?: string
}

export type RenderListItemOptions = RenderVirtualListItemInfo<ListData> & HandleRenderItemOptions
export interface ListProps
        extends Partial<
                VirtualListProps<ListData> &
                        RefAttributes<VirtualListComponent<ListData>> &
                        Pick<
                                ListItemProps,
                                | 'activeKey'
                                | 'activeKeys'
                                | 'activeTriggerEvenName'
                                | 'afterAffordance'
                                | 'afterAffordanceActiveKey'
                                | 'afterAffordancePrimaryButtonProps'
                                | 'afterAffordanceSecondaryButtonProps'
                                | 'beforeAffordance'
                                | 'closeTrailing'
                                | 'disabled'
                                | 'divider'
                                | 'enableUnderlay'
                                | 'enableUnderlayActive'
                                | 'focusedIndex'
                                | 'gap'
                                | 'onActive'
                                | 'onActiveAfterAffordance'
                                | 'onCancel'
                                | 'onConfirm'
                                | 'selectType'
                                | 'shape'
                                | 'skeletonDuration'
                                | 'skeletonElement'
                                | 'supportingTextNumberOfLines'
                                | 'trailing'
                                | 'trailingTriggerEvenName'
                                | 'type'
                        >
        > {
        data?: ListData[]
        defaultActiveKey?: string
        defaultActiveKeys?: string[]
        deselect?: boolean
        onActives?: (values?: string[]) => void
        onClose?: (options: OnCloseOptions) => void
        onItemStateEvent?: OnStateEvent

        /**
         * Whether to enable auto-associative selection in radio mode. If the deleted item is an active item of the
         * current year, the list will automatically look for neighboring items with the active option.
         */
        relatedActive?: boolean
}

export interface RenderListProps extends ListProps {
        onUnmount?: (value?: string) => void
}

export interface ListState {
        afterAffordanceActiveKey?: string
        listActiveKey?: string
        listActiveKeys?: string[]
        listData?: ListData[]
        nextActiveEvent?: () => void
        nextAfterAffordanceActiveEvent?: () => void
        nextCloseEvent?: () => void
        status: ComponentStatus
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
        | 'disabled'
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
> &
        Pick<ListItemProps, 'onClose'>

export type HandleListCloseOptions = Pick<ListProps, 'onClose' | 'relatedActive' | 'selectType'>
export interface ListBaseProps extends ListProps {
        render: (props: RenderListProps) => JSX.Element
}

export type HandleListActiveOptions = Pick<ListProps, 'onActive' | 'selectType' | 'onActives' | 'deselect'>
