import {RefAttributes} from 'react'
import {PressableProps, TextStyle, View, ViewProps, ViewStyle} from 'react-native'
import {AnimatableValue, AnimatedStyle, SharedValue} from 'react-native-reanimated'
import {AnimatedTiming, OnStateEvent, OnStateEventChangeOptions} from '../../../hooks'
import {EventName, TypographyProps} from '../../Common'
import {NavigationRailType} from '../Navigation-rail.interface'

export interface NavigationRailItemProps
    extends Partial<ViewProps & RefAttributes<View> & PressableProps & OnStateEvent> {
    activeKey?: string
    icon?: JSX.Element
    itemKey: string
    labelText?: string
    onActive?: (value?: string) => void
    type?: NavigationRailType
}

export interface RenderNavigationRailItemProps extends Omit<NavigationRailItemProps, 'itemKey'> {
    active?: boolean
    activeColor: string
    activeIconElement: JSX.Element
    eventName?: EventName
    iconElement: JSX.Element
    labelAnimatedStyle: AnimatedStyle<ViewStyle>
    labelTextAnimatedStyle: AnimatedStyle<TextStyle>
    onStateEvent: OnStateEvent
    underlayColor: string
}

export interface NavigationRailItemBaseProps extends NavigationRailItemProps {
    render: (props: RenderNavigationRailItemProps) => JSX.Element
}

export interface NavigationRailItemState {
    eventName?: EventName
    nextPressOutEvent?: () => void
}

export type HandleNavigationRailItemStateEventChangeOptions = OnStateEventChangeOptions &
    Pick<NavigationRailItemProps, 'itemKey' | 'onActive'>

export interface UseNavigationRailItemAnimatedOptions extends Pick<RenderNavigationRailItemProps, 'active' | 'type'> {
    defaultActive?: boolean
}

export interface HandleNavigationRailItemAnimatedTimingOptions extends UseNavigationRailItemAnimatedOptions {
    animatedTiming: AnimatedTiming
}

export interface HandleNavigationRailItemAnimatedTimingSharedValue {
    labelHeightSharedValue: SharedValue<AnimatableValue>
    labelTextColorSharedValue: SharedValue<AnimatableValue>
}

export type NavigationRailItemLabelTextProps = Pick<RenderNavigationRailItemProps, 'active'> & TypographyProps
export type NavigationRailItemHeaderProps = Pick<RenderNavigationRailItemProps, 'type'>
export interface NavigationRailItemIconProps {
    visible?: boolean
}
