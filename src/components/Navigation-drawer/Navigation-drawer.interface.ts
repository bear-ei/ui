import {RefAttributes} from 'react'
import {View, ViewProps} from 'react-native'
import {NavigationDrawerItemProps} from './Navigation-drawer-item'

export interface NavigationDrawerData extends Pick<NavigationDrawerItemProps, 'icon' | 'labelText'> {
        indexKey: string
}

export type RenderNavigationDrawerItemOptions = Omit<NavigationDrawerItemProps, 'itemKey'>
export interface NavigationDrawerProps
        extends Pick<NavigationDrawerItemProps, 'activeKey' | 'onActive'>,
                ViewProps,
                RefAttributes<View> {
        data?: NavigationDrawerData[]
        defaultActiveKey?: string
        headlineText?: string
}

export interface RenderNavigationDrawerProps extends NavigationDrawerProps {
        navigationDrawerItemElements?: JSX.Element[]
        onActiveSource?: (value?: string) => void
}

export interface NavigationDrawerBaseProps extends NavigationDrawerProps {
        render: (props: RenderNavigationDrawerProps) => JSX.Element
}

export interface NavigationDrawerState {
        navigationDrawerActiveKey?: string
        nextActiveEvent?: () => void
}

export type HandleNavigationDrawerActiveOptions = Pick<RenderNavigationDrawerProps, 'onActive' | 'activeKey'>
