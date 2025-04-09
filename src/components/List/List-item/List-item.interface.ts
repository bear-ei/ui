import {PanResponderInstance, StyleProp, TextStyle, ViewStyle} from 'react-native'
import {AnimatedStyle} from 'react-native-reanimated'
import {DefaultTheme} from 'styled-components/native'
import {AnimatedTiming, HandleStateEventChangeOptions, StateOnEvent} from '../../../hooks'
import {ComponentStatus, EventName, State} from '../../Common'
import {IconButtonProps} from '../../Icon-button'
import {TouchableProps} from '../../Touchable'
import {ListAffordanceButtonProps} from '../List-affordance-button'
import {ListAfterAffordancePressOutOptions} from '../List-after-affordance'
import {ListProps} from '../List.interface'

export interface ListItemProps
        extends Partial<TouchableProps>,
                Pick<
                        ListProps,
                        | 'activeKey'
                        | 'activeKeys'
                        | 'activeTriggerEvenName'
                        | 'afterAffordance'
                        | 'afterAffordanceActiveKey'
                        | 'afterAffordancePrimaryButtonProps'
                        | 'afterAffordanceSecondaryButtonProps'
                        | 'beforeAffordance'
                        | 'closeTrailing'
                        | 'densityScale'
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
                > {
        close?: boolean

        /**
         * Enabling ripples while using style to specify the background color can cause the ripple to be obscured, as the
         * ripple is always one z-index level below the main container. This property is used to specify the background
         * color when ripples are enabled.
         */
        contentStyle?: StyleProp<ViewStyle>
        extraData?: string[]
        headline?: React.ReactNode
        indexKey: string
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
        affordanceShow?: boolean
        afterAffordanceVisible?: boolean
        contentAnimatedStyle: AnimatedStyle<ViewStyle>
        eventName?: EventName
        headlineTextAnimatedStyle: AnimatedStyle<TextStyle>
        leadingElement?: React.JSX.Element
        stateOnEvent: StateOnEvent
        panResponder?: PanResponderInstance
        skeletonVisible?: boolean
        state?: State
        theme: DefaultTheme
        trailingElement?: React.JSX.Element
        trailingVisible?: boolean
}

export interface ListItemBaseProps extends ListItemProps {
        render: (props: RenderListItemProps) => React.JSX.Element
}

export interface ListItemState {
        afterAffordanceClosed?: boolean
        affordanceShow?: boolean
        eventName?: EventName
        listItemState?: State
        nextLayoutEvent?: () => void
        nextPressInEvent?: () => void
        nextPressOutEvent?: () => void
        status: ComponentStatus
        trailingVisible?: boolean
}

export interface HandleListItemStateEventChangeOptions
        extends HandleStateEventChangeOptions,
                Pick<
                        RenderListItemProps,
                        | 'activeTriggerEvenName'
                        | 'itemIndex'
                        | 'indexKey'
                        | 'onActive'
                        | 'onLoadEnd'
                        | 'selectType'
                        | 'trailingTriggerEvenName'
                        | 'type'
                > {}

export type HandleListItemTrailingEventOptions = {callback?: () => void}
export interface HandleListItemConfirmOptions extends Pick<RenderListItemProps, 'onActiveAfterAffordance'> {
        onConfirm?: ListItemProps['onConfirm']
        options: ListAfterAffordancePressOutOptions
        onListItemClose: (indexKey?: boolean) => void
}

export interface RenderListItemTrailingOptions
        extends Pick<
                RenderListItemProps,
                'afterAffordance' | 'closeTrailing' | 'trailing' | 'disabled' | 'trailingProps' | 'id'
        > {
        stateOnEvent: Partial<StateOnEvent>
        theme: DefaultTheme
}

export interface UseListItemAnimatedOptions {
        active?: boolean
        afterAffordanceVisible?: boolean
        onListItemAfterAffordanceVisibleFinished?: (visible?: boolean) => false | void
}

export interface HandleListItemAfterAffordanceVisibleAnimatedTimingOptions
        extends Pick<UseListItemAnimatedOptions, 'onListItemAfterAffordanceVisibleFinished'> {
        animatedTiming: AnimatedTiming
}

export interface HandleListItemTrailingPressOutOptions
        extends Pick<ListItemProps, 'closeTrailing' | 'afterAffordance' | 'onActiveAfterAffordance'> {
        onListItemClose: (close?: boolean) => void
}

export type HandleListItemPanResponderReleaseOptions = Pick<ListItemProps, 'onActiveAfterAffordance' | 'disabled'>
export type ListItemContainerProps = Pick<RenderListItemProps, 'type'>
export interface ListItemMainProps
        extends Pick<RenderListItemProps, 'supportingTextNumberOfLines' | 'densityScale'>,
                ListItemContainerProps {
        supportingTextShow?: boolean
}

export interface ListItemMainInnerProps extends Pick<ListItemMainProps, 'supportingTextShow' | 'type'> {
        leadingShow?: boolean
        trailingShow?: boolean
}

export type ListItemLeadingProps = Pick<RenderListItemProps, 'supportingTextNumberOfLines' | 'type'>
export interface ListItemTrailingProps extends ListItemLeadingProps {
        trailingShow?: boolean
}
