import {RefAttributes} from 'react'
import {DefaultTheme} from 'styled-components/native'
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
                | 'headline'
                | 'leading'
                | 'supporting'
                | 'supportingTextNumberOfLines'
                | 'trailing'
                | 'trailingProps'
        > {
        indexKey: string

        /**
         * Used to control whether or not the item is updated in the virtual list.
         */
        extraData?: string[]
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
                                | 'onActive'
                                | 'onActiveAfterAffordance'
                                | 'onCancel'
                                | 'onClose'
                                | 'onConfirm'
                                | 'selectType'
                                | 'shape'
                                | 'skeletonElement'
                                | 'skeletonMinDuration'
                                | 'supportingTextNumberOfLines'
                                | 'trailing'
                                | 'trailingTrigger'
                                | 'type'
                        >
        > {
        data?: ListData[]
        defaultActiveKey?: string
        defaultActiveKeys?: string[]
        deselect?: boolean
        onActives?: (values?: string[]) => void
        onItemStateEvent?: OnStateEvent
}

export interface RenderListProps extends ListProps {
        onUnmount?: (value?: string) => void
        theme: DefaultTheme
}

export interface ListState {
        afterAffordanceActiveKey?: string
        listActiveKey?: string
        listActiveKeys?: string[]
        nextActiveEvent?: () => void
        nextAfterAffordanceActiveEvent?: () => void
        status: ComponentStatus
}

export type HandleRenderItemOptions = Pick<
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
        | 'disabled'
        | 'divider'
        | 'enableUnderlay'
        | 'enableUnderlayActive'
        | 'focusedIndex'
        | 'onActive'
        | 'onActiveAfterAffordance'
        | 'onCancel'
        | 'onClose'
        | 'onConfirm'
        | 'renderItem'
        | 'selectType'
        | 'shape'
        | 'skeletonElement'
        | 'skeletonMinDuration'
        | 'supportingTextNumberOfLines'
        | 'trailing'
        | 'trailingTrigger'
        | 'type'
>

export interface ListBaseProps extends ListProps {
        render: (props: RenderListProps) => JSX.Element
}

export type HandleListActiveOptions = Pick<ListProps, 'onActive' | 'selectType' | 'onActives' | 'deselect'>
