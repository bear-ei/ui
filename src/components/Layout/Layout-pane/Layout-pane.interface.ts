import {LayoutAnimatedProps} from '../../Layout-animated'

export interface LayoutPaneProps extends LayoutAnimatedProps {
        flex?: number
}

export type RenderLayoutPaneProps = LayoutPaneProps

export interface LayoutPaneBaseProps extends LayoutPaneProps {
        render: (props: RenderLayoutPaneProps) => JSX.Element
}

export type LayoutPaneContainerProps = Pick<LayoutPaneProps, 'flex'>
