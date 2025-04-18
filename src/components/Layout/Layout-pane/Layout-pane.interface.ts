import type {LayoutProps} from '../Layout.interface'

export type LayoutPaneProps = LayoutProps
export type RenderLayoutPaneProps = LayoutPaneProps
export interface LayoutPaneBaseProps extends LayoutPaneProps {
	renderLayoutPane: (props: RenderLayoutPaneProps) => React.JSX.Element
}
