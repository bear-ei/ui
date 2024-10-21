import {FC, RefAttributes} from 'react'
import {View, ViewProps} from 'react-native'
import {WindowSize} from '../../hooks'
import {LayoutNavigationProps} from './Layout-navigation'
import {LayoutPaneProps} from './Layout-pane'

export interface LayoutProps extends ViewProps, RefAttributes<View> {
    navigationArea?: boolean
}

export interface RenderLayoutProps extends LayoutProps {
    windowSize?: WindowSize
}

export interface LayoutBaseProps extends LayoutProps {
    render: (props: RenderLayoutProps) => JSX.Element
}

export interface LayoutComponent extends FC<LayoutProps> {
    Navigation: FC<LayoutNavigationProps>
    Pane: FC<LayoutPaneProps>
}

export type LayoutContainerProps = Pick<LayoutProps, 'navigationArea'> & Pick<RenderLayoutProps, 'windowSize'>
