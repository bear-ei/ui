import {LayoutAnimatedProps} from '../../Layout-animated'

export type LayoutPaneProps = LayoutAnimatedProps
export type RenderLayoutPaneProps = LayoutPaneProps
export interface LayoutPaneBaseProps extends LayoutPaneProps {
        render: (props: RenderLayoutPaneProps) => JSX.Element
}
