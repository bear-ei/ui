import {FC} from 'react'
import {LayoutType} from '../Common'
import {LayoutAnimatedProps} from '../Layout-animated'
import {LayoutNavigationProps} from './Layout-navigation'
import {LayoutPaneProps} from './Layout-pane'

export interface LayoutProps extends LayoutAnimatedProps {
        layout?: LayoutType
}

export type RenderLayoutProps = LayoutProps
export interface LayoutBaseProps extends LayoutProps {
        render: (props: RenderLayoutProps) => React.JSX.Element
}

export interface LayoutComponent extends FC<LayoutProps> {
        Navigation: FC<LayoutNavigationProps>
        Pane: FC<LayoutPaneProps>
}
