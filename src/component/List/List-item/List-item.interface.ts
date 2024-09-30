import {PanResponderInstance, StyleProp, ViewStyle} from 'react-native'
import {AnimatedStyle} from 'react-native-reanimated'
import {DefaultTheme} from 'styled-components/native'
import {AnimatedTiming, OnStateEvent, OnStateEventChangeOptions} from '../../../hook'
import {EventName, State} from '../../Common'
import {TouchableProps} from '../../Touchable'
import {ListAfterAffordancePressOutOptions, ListAfterAffordanceProps} from '../List-after-affordance'
import {ListType} from '../List.interface'

export interface ListItemProps
    extends Partial<TouchableProps & Omit<ListAfterAffordanceProps, 'PrimaryButtonProps' | 'SecondaryButtonProps'>> {
    activeKey?: string
    activeKeys?: string[]
    afterAffordance?: JSX.Element | boolean
    afterAffordanceActiveKey?: string
    afterAffordancePrimaryButtonProps?: ListAfterAffordanceProps['primaryButtonProps']
    afterAffordanceSecondaryButtonProps?: ListAfterAffordanceProps['secondaryButtonProps']
    beforeAffordance?: JSX.Element | boolean
    close?: boolean
    closeTrailing?: boolean
    customData?: unknown
    densityScale?: number
    enableUnderlay?: boolean
    enableUnderlayActive?: boolean
    extraData?: string[]
    headline?: JSX.Element | string
    itemKey: string
    itemLayout?: {width?: number; height?: number}
    leading?: JSX.Element
    minSkeletonDuration?: number
    onActive?: (value?: string) => void
    onActiveAfterAffordance?: (value?: string) => void
    onActives?: (value?: string[]) => void
    onClose?: (value?: string) => void
    onLoadEnd?: (value?: string) => void
    onVisible?: (value?: string) => void
    skeletonElement?: JSX.Element
    supporting?: string | JSX.Element
    supportingTextNumberOfLines?: number
    trailing?: JSX.Element
    trailingTrigger?: State
    type?: ListType

    /**
     * Enabling ripples while using style to specify the background color can cause the ripple to be obscured, as the
     * ripple is always one z-index level below the main container. This property is used to specify the background
     * color when ripples are enabled.
     */
    contentStyle?: StyleProp<ViewStyle>
}

export interface RenderListItemProps extends ListItemProps {
    active?: boolean
    activeColor: string
    afterAffordanceVisible?: boolean
    contentAnimatedStyle: AnimatedStyle<ViewStyle>
    eventName?: EventName
    onStateEvent: OnStateEvent
    panResponder?: PanResponderInstance
    skeletonVisible?: boolean
    state?: State
    trailingElement?: JSX.Element
    trailingVisible?: boolean
    underlayColor: string
}

export interface ListItemBaseProps extends ListItemProps {
    render: (props: RenderListItemProps) => JSX.Element
}

export interface ListItemState {
    afterAffordanceClosed?: boolean
    eventName?: EventName
    listItemState?: State
    nextLayoutEvent?: () => void
    nextPressOutEvent?: () => void
    trailingVisible?: boolean
}

export type HandleListItemStateEventChangeOptions = OnStateEventChangeOptions &
    Pick<RenderListItemProps, 'itemKey' | 'onActive' | 'type' | 'onLoadEnd' | 'trailingTrigger'>

export type HandleListItemTrailingEventOptions = {callback?: () => void}
export interface HandleListItemConfirmOptions extends Pick<RenderListItemProps, 'onActiveAfterAffordance'> {
    onConfirm?: ListItemProps['onConfirm']
    options: ListAfterAffordancePressOutOptions
    onListItemClose: (value?: boolean) => void
}

export interface RenderListItemTrailingOptions
    extends Pick<RenderListItemProps, 'afterAffordance' | 'closeTrailing' | 'trailing'> {
    onStateEvent: Partial<OnStateEvent>
    theme: DefaultTheme
}

export interface UseListItemAnimatedOptions {
    afterAffordanceVisible?: boolean
    onListItemAfterAffordanceVisibleFinished?: (value?: boolean) => false | void
}

export interface HandleListItemAfterAffordanceVisibleAnimatedOptions
    extends Pick<UseListItemAnimatedOptions, 'onListItemAfterAffordanceVisibleFinished'> {
    animatedTiming: AnimatedTiming
}

export interface HandleListItemTrailingPressOutOptions
    extends Pick<ListItemProps, 'closeTrailing' | 'afterAffordance'> {
    onActiveAfterAffordance?: (value?: string) => void
    onListItemClose: (value?: boolean) => void
}

export type HandleListItemCloseOptions = Pick<ListItemProps, 'onClose' | 'onVisible'>
export type ListItemContainerProps = Pick<RenderListItemProps, 'densityScale'>
export interface ListItemMainProps
    extends Pick<RenderListItemProps, 'supportingTextNumberOfLines'>,
        ListItemContainerProps {
    supportingTextShow?: boolean
}

export type ListItemMainInnerProps = Pick<ListItemMainProps, 'supportingTextShow'>
export type ListItemLeadingProps = Pick<RenderListItemProps, 'supportingTextNumberOfLines' | 'densityScale'>
export type ListItemTrailingProps = ListItemLeadingProps
export interface ListItemBeforeAffordanceContainerProps {
    visible?: boolean
}
