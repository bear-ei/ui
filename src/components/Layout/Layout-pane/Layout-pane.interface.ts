import {RefAttributes} from 'react'
import {View, ViewProps} from 'react-native'
import {ShapeProps} from '../../Common'

export interface LayoutPaneProps
    extends ViewProps,
        RefAttributes<View>,
        ShapeProps {
    flex?: number
    width?: number
}

export type RenderLayoutPaneProps = LayoutPaneProps
export interface LayoutPaneBaseProps extends LayoutPaneProps {
    render: (props: RenderLayoutPaneProps) => JSX.Element
}

export type LayoutPaneContainerProps = Pick<LayoutPaneProps, 'width' | 'flex'>
