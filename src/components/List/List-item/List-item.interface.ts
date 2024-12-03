import {PanResponderInstance, StyleProp, TextStyle, ViewStyle} from 'react-native'
import {AnimatedStyle} from 'react-native-reanimated'
import {DefaultTheme} from 'styled-components/native'
import {AnimatedTiming, OnStateEvent, OnStateEventChangeOptions} from '../../../hooks'
import {EventName, ShapeType, State} from '../../Common'
import {IconButtonProps} from '../../Icon-button'
import {TouchableProps} from '../../Touchable'
import {ListAfterAffordancePressOutOptions, ListAfterAffordanceProps} from '../List-after-affordance'
import {ListType} from '../List.interface'

export type SelectType = 'select' | 'multiselect'
export interface ListItemProps
        extends Partial<
                TouchableProps & Omit<ListAfterAffordanceProps, 'PrimaryButtonProps' | 'SecondaryButtonProps'>
        > {
        activeKey?: string
        activeKeys?: string[]
        afterAffordance?: JSX.Element | boolean
        afterAffordanceActiveKey?: string
        afterAffordancePrimaryButtonProps?: ListAfterAffordanceProps['primaryButtonProps']
        afterAffordanceSecondaryButtonProps?: ListAfterAffordanceProps['secondaryButtonProps']
        beforeAffordance?: JSX.Element | boolean
        close?: boolean
        closeTrailing?: boolean

        /**
         * Enabling ripples while using style to specify the background color can cause the ripple to be obscured, as the
         * ripple is always one z-index level below the main container. This property is used to specify the background
         * color when ripples are enabled.
         */
        contentStyle?: StyleProp<ViewStyle>
        divider?: boolean
        enableUnderlay?: boolean
        enableUnderlayActive?: boolean
        extraData?: string[]
        focusedIndex?: number
        headline?: React.ReactNode
        itemIndex?: number
        itemKey: string
        itemLayout?: {width?: number; height?: number}
        leading?: JSX.Element
        onActive?: (value?: string) => void
        onActiveAfterAffordance?: (value?: string) => void
        onActives?: (value?: string[]) => void
        onClose?: (value?: string) => void
        onLoadEnd?: (value?: string) => void
        onVisible?: (value?: string) => void
        selectType?: SelectType
        shape?: ShapeType
        skeletonElement?: JSX.Element
        skeletonMinDuration?: number
        supporting?: string | JSX.Element
        supportingTextNumberOfLines?: number
        trailing?: JSX.Element
        trailingProps?: IconButtonProps
        trailingTrigger?: State
        type?: ListType
}

export interface RenderListItemProps extends ListItemProps {
        active?: boolean
        activeColor: string
        afterAffordanceVisible?: boolean
        contentAnimatedStyle: AnimatedStyle<ViewStyle>
        eventName?: EventName
        headlineTextAnimatedStyle: AnimatedStyle<TextStyle>
        leadingElement?: JSX.Element
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
        nextFocusEvent?: () => void
        nextLayoutEvent?: () => void
        nextPressOutEvent?: () => void
        trailingVisible?: boolean
}

export type HandleListItemStateEventChangeOptions = OnStateEventChangeOptions &
        Pick<
                RenderListItemProps,
                'itemKey' | 'onActive' | 'selectType' | 'onLoadEnd' | 'trailingTrigger' | 'itemIndex' | 'type'
        >

export type HandleListItemTrailingEventOptions = {callback?: () => void}
export interface HandleListItemConfirmOptions extends Pick<RenderListItemProps, 'onActiveAfterAffordance'> {
        onConfirm?: ListItemProps['onConfirm']
        options: ListAfterAffordancePressOutOptions
        onListItemClose: (value?: boolean) => void
}

export interface RenderListItemTrailingOptions
        extends Pick<
                RenderListItemProps,
                'afterAffordance' | 'closeTrailing' | 'trailing' | 'disabled' | 'trailingProps'
        > {
        onStateEvent: Partial<OnStateEvent>
        theme: DefaultTheme
}

export interface UseListItemAnimatedOptions {
        active?: boolean
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

export type HandleListItemPanResponderReleaseOptions = Pick<ListItemProps, 'onActiveAfterAffordance' | 'disabled'>
export type HandleListItemCloseOptions = Pick<ListItemProps, 'onClose' | 'onVisible'>
export type ListItemContainerProps = Pick<RenderListItemProps, 'type'>
export interface ListItemMainProps
        extends Pick<RenderListItemProps, 'supportingTextNumberOfLines'>,
                ListItemContainerProps {
        supportingTextShow?: boolean
        trailingShow?: boolean
}

export type ListItemContentProps = ListItemContainerProps
export interface ListItemMainInnerProps extends Pick<ListItemMainProps, 'supportingTextShow' | 'type'> {
        leadingShow?: boolean
        trailingShow?: boolean
}

export type ListItemLeadingProps = Pick<RenderListItemProps, 'supportingTextNumberOfLines'>
export type ListItemTrailingProps = ListItemLeadingProps
