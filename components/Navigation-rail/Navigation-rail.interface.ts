import {ComponentStatus} from '@/constants'
import type {RefAttributes} from 'react'
import type {View, ViewProps} from 'react-native'
import type {NavigationRailItemProps} from './Navigation-rail-item'
import type {
        NAVIGATION_DESTINATION_POSITION,
        NAVIGATION_RAIL_ANIMATED,
        NAVIGATION_RAIL_TYPE
} from './Navigation-rail.enum'

export type NavigationRailAnimated = (typeof NAVIGATION_RAIL_ANIMATED)[keyof typeof NAVIGATION_RAIL_ANIMATED]
export type NavigationRailType = (typeof NAVIGATION_RAIL_TYPE)[keyof typeof NAVIGATION_RAIL_TYPE]
export type NavigationDestinationPosition =
        (typeof NAVIGATION_DESTINATION_POSITION)[keyof typeof NAVIGATION_DESTINATION_POSITION]

export interface NavigationRailData extends Pick<NavigationRailItemProps, 'icon' | 'labelText'> {
        indexKey: string
}

export interface RenderNavigationRailItemOptions extends Omit<NavigationRailItemProps, 'indexKey'> {
        data?: NavigationRailData[]
}

export interface NavigationRailProps extends ViewProps, RefAttributes<View> {
        activeKey?: string
        animatedType?: NavigationRailAnimated
        data?: NavigationRailData[]
        defaultActiveKey?: string
        destinationPosition?: NavigationDestinationPosition
        fab?: React.JSX.Element
        menu?: React.JSX.Element
        onActive?: (activeKey?: string) => void
        type?: NavigationRailType
}

export interface RenderNavigationRailProps extends NavigationRailProps {
        fabElement?: React.JSX.Element
        itemElements?: React.JSX.Element
        menuElement?: React.JSX.Element
        onActiveSource?: (activeKey?: string) => void
}

export type NavigationRailBaseProps = NavigationRailProps
export interface NavigationRailState {
        activeKey?: string
        data?: NavigationRailData[]
        nextActiveEvent?: () => void
        status: ComponentStatus
}

export type DestinationProps = Pick<RenderNavigationRailProps, 'destinationPosition'>
