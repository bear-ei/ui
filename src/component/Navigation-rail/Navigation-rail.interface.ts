import {RefAttributes} from 'react'
import {View, ViewProps} from 'react-native'
import {NavigationRailItemProps} from './Navigation-rail-item'

export type NavigationRailType = 'segment' | 'block'
export type DestinationPosition = 'top' | 'middle' | 'bottom'
export interface NavigationRailData extends Pick<NavigationRailItemProps, 'icon' | 'labelText'> {
    indexKey: string
}

export type RenderNavigationRailItemOptions = Omit<NavigationRailItemProps, 'itemKey'>
export interface NavigationRailProps
    extends Pick<NavigationRailItemProps, 'activeKey' | 'onActive' | 'type'>,
        ViewProps,
        RefAttributes<View> {
    data?: NavigationRailData[]
    defaultActiveKey?: string
    destinationPosition?: DestinationPosition
    fab?: React.JSX.Element
    menu?: React.JSX.Element
}

export interface RenderNavigationRailProps extends NavigationRailProps {
    fabElement?: React.JSX.Element
    navigationRailItemElements?: React.JSX.Element[]
    onActiveSource?: (value?: string) => void
}

export interface NavigationBaseProps extends NavigationRailProps {
    render: (props: RenderNavigationRailProps) => React.JSX.Element
}

export interface NavigationRailState {
    navigationRailActiveKey?: string
    nextActiveEvent?: () => void
}

export type HandleNavigationRailActiveOptions = Pick<RenderNavigationRailProps, 'onActive' | 'activeKey'>
export type DestinationProps = Pick<RenderNavigationRailProps, 'destinationPosition'>
