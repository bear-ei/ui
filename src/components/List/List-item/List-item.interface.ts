import {IconButtonProps} from '@/components/Icon-button'
import {PressableType, TouchableProps} from '@/components/Touchable'
import {ComponentStatus, EventName, State} from '@/constants'
import {HandleStateEventChangeOptions, InteractionHandlers} from '@/hooks'
import type {PanResponderInstance, StyleProp, TextStyle, ViewStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'
import type {ListAffordanceButtonProps} from '../List-affordance-button'
import type {ListProps} from '../List.interface'

export interface ListItemRef extends PressableType {
        active: () => void
        close: () => void
}

export interface ListItemProps
        extends TouchableProps,
                Pick<
                        ListProps,
                        | 'activeKey'
                        | 'activeKeys'
                        | 'afterAffordance'
                        | 'afterAffordanceActiveKey'
                        | 'afterAffordancePrimaryButtonProps'
                        | 'afterAffordanceSecondaryButtonProps'
                        | 'beforeAffordance'
                        | 'closeTrailing'
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
                        | 'size'
                        | 'skeletonDuration'
                        | 'skeletonElement'
                        | 'supportingTextNumberOfLines'
                        | 'trailing'
                        | 'trailingTriggerEvent'
                        | 'type'
                > {
        /**
         * Enabling ripples while using style to specify the background color can cause the ripple to be obscured, as the
         * ripple is always one z-index level below the main container. This property is used to specify the background
         * color when ripples are enabled.
         */
        contentStyle?: StyleProp<ViewStyle>
        dependencies?: unknown[]
        dragging?: boolean
        headline?: React.ReactNode
        indexKey?: string
        itemIndex?: number
        itemLayout?: {width?: number; height?: number}
        leading?: React.JSX.Element
        onActives?: (activeKeys?: string[]) => void
        onClose?: (indexKey?: string) => void
        onLoadEnd?: (indexKey?: string) => void
        primaryButtonProps?: ListAffordanceButtonProps
        secondaryButtonProps?: ListAffordanceButtonProps
        supporting?: string | React.JSX.Element
        trailingProps?: IconButtonProps
}

export interface RenderListItemProps extends ListItemProps {
        active?: boolean
        affordanceVisible?: boolean
        afterAffordanceExpanded?: boolean
        afterAffordanceVisible?: boolean
        contentAnimatedStyle: AnimatedStyle<ViewStyle>
        eventName?: EventName
        headlineTextAnimatedStyle: AnimatedStyle<TextStyle>
        interactionHandlers: InteractionHandlers
        leadingElement?: React.JSX.Element
        panResponder?: PanResponderInstance
        skeletonVisible?: boolean
        state?: State
        trailingElement?: React.JSX.Element
        trailingVisible?: boolean
}

export type ListItemBaseProps = ListItemProps
export interface ListItemState {
        afterAffordanceExpanded?: boolean
        eventName?: EventName
        nextLayoutEvent?: () => void
        nextPressInEvent?: () => void
        nextPressOutEvent?: () => void
        nextTrailingTriggerEvent?: () => void
        status: ComponentStatus
        trailingVisible?: boolean
}

export interface HandleListItemStateChangeOptions
        extends HandleStateEventChangeOptions,
                Pick<RenderListItemProps, 'itemIndex' | 'indexKey' | 'onActive' | 'onLoadEnd' | 'type'> {}

export interface ConfirmListItemAffordanceActionOptions extends Pick<RenderListItemProps, 'onActiveAfterAffordance'> {
        onConfirm?: ListItemProps['onConfirm']
        onClose: (indexKey?: boolean) => void
}

export interface RenderListItemTrailingProps
        extends Pick<
                RenderListItemProps,
                | 'afterAffordance'
                | 'closeTrailing'
                | 'disabled'
                | 'id'
                | 'size'
                | 'trailing'
                | 'trailingProps'
                | 'trailingTriggerEvent'
        > {
        interactionHandlers: InteractionHandlers
        onTrailingVisibility?: (eventName: EventName) => void
}

export interface UseListItemAnimatedOptions {
        active?: boolean
        afterAffordanceVisible?: boolean
        onVisibilityFinished?: (visible?: boolean) => false
        status: ComponentStatus
}

export interface TriggerListItemTrailingActionsOptions
        extends Pick<ListItemProps, 'closeTrailing' | 'afterAffordance' | 'onActiveAfterAffordance' | 'onPressOut'> {
        onClose: (close?: boolean) => void
}

export type AffordanceLayoutProps = Pick<RenderListItemProps, 'afterAffordanceExpanded'>
