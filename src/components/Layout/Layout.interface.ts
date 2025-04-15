import type {FC} from 'react'
import type {LayoutType} from '../Common'
import type {LayoutAnimatedProps} from '../Layout-animated'
import type {LayoutNavigationProps} from './Layout-navigation'
import type {LayoutPaneProps} from './Layout-pane'

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
