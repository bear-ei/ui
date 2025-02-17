import {RefAttributes} from 'react'
import {View, ViewProps} from 'react-native'
import {ComponentStatus} from '../Common'
import {NavigationRailItemProps} from './Navigation-rail-item'

export type NavigationRailAnimatedType = 'standard' | 'collapse'
export type NavigationRailType = 'segment' | 'block'
export type DestinationPosition = 'top' | 'center' | 'bottom'
export interface NavigationRailData extends Pick<NavigationRailItemProps, 'icon' | 'labelText'> {
        indexKey: string
}

export type RenderNavigationRailItemOptions = Omit<NavigationRailItemProps, 'itemKey'>
export interface NavigationRailProps extends ViewProps, RefAttributes<View> {
        activeKey?: string
        animatedType?: NavigationRailAnimatedType
        data?: NavigationRailData[]
        defaultActiveKey?: string
        destinationPosition?: DestinationPosition
        fab?: JSX.Element
        menu?: JSX.Element
        onActive?: (value?: string) => void
        type?: NavigationRailType
}

export interface RenderNavigationRailProps extends NavigationRailProps {
        fabElement?: JSX.Element
        navigationRailItemElements?: JSX.Element[]
        onActiveSource?: (value?: string) => void
}

export interface NavigationRailBaseProps extends NavigationRailProps {
        render: (props: RenderNavigationRailProps) => JSX.Element
}

export interface NavigationRailState {
        activeKey?: string
        data?: NavigationRailData[]
        nextActiveEvent?: () => void
        status: ComponentStatus
}

export type DestinationProps = Pick<RenderNavigationRailProps, 'destinationPosition'>
