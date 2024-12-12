import {FC, RefAttributes} from 'react'
import {View, ViewProps} from 'react-native'
import {ShapeProps} from '../Common'
import {LayoutNavigationProps} from './Layout-navigation'
import {LayoutPaneProps} from './Layout-pane'

export interface LayoutProps extends ViewProps, RefAttributes<View>, ShapeProps {}
export type RenderLayoutProps = LayoutProps
export interface LayoutBaseProps extends LayoutProps {
        render: (props: RenderLayoutProps) => JSX.Element
}

export interface LayoutComponent extends FC<LayoutProps> {
        Navigation: FC<LayoutNavigationProps>
        Pane: FC<LayoutPaneProps>
}
