import {RefAttributes} from 'react'
import {PressableProps, TextStyle, View, ViewProps} from 'react-native'
import {AnimatedStyle} from 'react-native-reanimated'
import {OnStateEvent, OnStateEventChangedOptions} from '../../../hooks'
import {EventName, TypographyProps} from '../../Common'

export interface NavigationDrawerItemProps
        extends Partial<ViewProps & RefAttributes<View> & PressableProps & OnStateEvent> {
        activeKey?: string
        icon?: JSX.Element
        itemKey: string
        labelText?: string
        onActive?: (value?: string) => void
}

export interface RenderNavigationDrawerItemProps extends Omit<NavigationDrawerItemProps, 'itemKey'> {
        active?: boolean
        activeColor: string
        activeIconElement: JSX.Element
        eventName?: EventName
        iconElement: JSX.Element
        labelTextAnimatedStyle: AnimatedStyle<TextStyle>
        onStateEvent: OnStateEvent
        trailing?: JSX.Element
        underlayColor: string
}

export interface NavigationDrawerItemBaseProps extends NavigationDrawerItemProps {
        render: (props: RenderNavigationDrawerItemProps) => JSX.Element
}

export interface NavigationDrawerItemState {
        eventName?: EventName
        nextPressOutEvent?: () => void
}

export type HandleNavigationDrawerItemStateEventChangeOptions = OnStateEventChangedOptions &
        Pick<NavigationDrawerItemProps, 'itemKey' | 'onActive'>

export interface UseNavigationDrawerItemAnimatedOptions extends Pick<RenderNavigationDrawerItemProps, 'active'> {
        defaultActive?: boolean
}

export type NavigationDrawerItemLabelTextProps = Pick<RenderNavigationDrawerItemProps, 'active'> & TypographyProps
export interface NavigationDrawerItemIconProps {
        visible?: boolean
}
