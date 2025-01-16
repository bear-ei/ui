import {LayoutAnimatedProps} from '../../Layout-animated'

export interface LayoutPaneProps extends Omit<LayoutAnimatedProps, 'children'> {
        children?: React.ReactNode
}

export type RenderLayoutPaneProps = LayoutPaneProps
export interface LayoutPaneBaseProps extends LayoutPaneProps {
        render: (props: RenderLayoutPaneProps) => JSX.Element
}
