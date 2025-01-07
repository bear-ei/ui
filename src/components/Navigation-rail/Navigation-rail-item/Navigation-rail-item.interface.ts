import {RefAttributes} from 'react'
import {PressableProps, TextStyle, View, ViewProps} from 'react-native'
import {AnimatedStyle} from 'react-native-reanimated'
import {DefaultTheme} from 'styled-components/native'
import {AnimatedTiming, OnStateEvent, OnStateEventChangeOptions} from '../../../hooks'
import {EventName, TypographyProps} from '../../Common'
import {NavigationRailProps} from '../Navigation-rail.interface'

export interface NavigationRailItemProps
        extends Partial<ViewProps & RefAttributes<View> & PressableProps & OnStateEvent>,
                Pick<NavigationRailProps, 'activeKey' | 'onActive' | 'type'> {
        icon?: JSX.Element
        itemKey: string
        labelText?: string
}

export interface RenderNavigationRailItemProps extends Omit<NavigationRailItemProps, 'itemKey'> {
        active?: boolean
        activeIconElement: JSX.Element
        eventName?: EventName
        iconElement: JSX.Element
        labelTextAnimatedStyle: AnimatedStyle<TextStyle>
        onStateEvent: OnStateEvent
        theme: DefaultTheme
}

export interface NavigationRailItemBaseProps extends NavigationRailItemProps {
        render: (props: RenderNavigationRailItemProps) => JSX.Element
}

export interface NavigationRailItemState {
        eventName?: EventName
        nextPressOutEvent?: () => void
}

export interface HandleNavigationRailItemStateEventChangeOptions
        extends OnStateEventChangeOptions,
                Pick<NavigationRailItemProps, 'itemKey' | 'onActive'> {
        ref: React.RefObject<View>
}

export interface UseNavigationRailItemAnimatedOptions extends Pick<RenderNavigationRailItemProps, 'active' | 'type'> {
        defaultActive?: boolean
}

export interface HandleNavigationRailItemAnimatedTimingOptions extends UseNavigationRailItemAnimatedOptions {
        animatedTiming: AnimatedTiming
}

export type NavigationRailItemLabelTextProps = Pick<RenderNavigationRailItemProps, 'active'> & TypographyProps
export type NavigationRailItemHeaderProps = Pick<RenderNavigationRailItemProps, 'type'>
export interface NavigationRailItemIconProps {
        visible?: boolean
}

export interface NavigationTouchableContentProps {
        enableFocusRing?: boolean
}
