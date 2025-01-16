import {FC} from 'react'
import {LayoutAnimatedProps} from '../Layout-animated'
import {LayoutNavigationProps} from './Layout-navigation'
import {LayoutPaneProps} from './Layout-pane'

export interface LayoutProps extends Omit<LayoutAnimatedProps, 'children'> {
        children?: React.ReactNode
}

export type RenderLayoutProps = LayoutProps
export interface LayoutBaseProps extends LayoutProps {
        render: (props: RenderLayoutProps) => JSX.Element
}

export interface LayoutComponent extends FC<LayoutProps> {
        Navigation: FC<LayoutNavigationProps>
        Pane: FC<LayoutPaneProps>
}
