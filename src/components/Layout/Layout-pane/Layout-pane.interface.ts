import {DefaultTheme} from 'styled-components/native'
import {LayoutAnimatedProps} from '../../Layout-animated'

export interface LayoutPaneProps extends LayoutAnimatedProps {
        flex?: number
}

export interface RenderLayoutPaneProps extends LayoutPaneProps {
        theme: DefaultTheme
}

export interface LayoutPaneBaseProps extends LayoutPaneProps {
        render: (props: RenderLayoutPaneProps) => JSX.Element
}

export type LayoutPaneContainerProps = Pick<LayoutPaneProps, 'flex'>
