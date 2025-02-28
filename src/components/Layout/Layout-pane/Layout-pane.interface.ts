import {LayoutProps} from '../Layout.interface'

export type LayoutPaneProps = LayoutProps
export type RenderLayoutPaneProps = LayoutPaneProps
export interface LayoutPaneBaseProps extends LayoutPaneProps {
        render: (props: RenderLayoutPaneProps) => JSX.Element
}
