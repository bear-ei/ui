import {FC, RefAttributes} from 'react'
import {View, ViewProps} from 'react-native'
import {WindowSize} from '../../hooks'
import {LayoutPaneProps} from './Layout-pane'

export interface LayoutProps extends ViewProps, RefAttributes<View> {
    navigationArea: boolean
    windowSize: WindowSize
}

export type RenderLayoutProps = LayoutProps
export interface LayoutBaseProps extends LayoutProps {
    render: (props: RenderLayoutProps) => JSX.Element
}

export interface LayoutComponent extends FC<LayoutProps> {
    Pane: FC<LayoutPaneProps>
}

export type LayoutContainerProps = Pick<LayoutProps, 'windowSize' | 'navigationArea'>
