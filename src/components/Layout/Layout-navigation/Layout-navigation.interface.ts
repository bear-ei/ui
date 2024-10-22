import {RefAttributes} from 'react'
import {View, ViewProps} from 'react-native'
import {ShapeProps} from '../../Common'

export interface LayoutNavigationProps
    extends ViewProps,
        RefAttributes<View>,
        ShapeProps {}

export type RenderLayoutNavigationProps = LayoutNavigationProps
export interface LayoutNavigationBaseProps extends LayoutNavigationProps {
    render: (props: RenderLayoutNavigationProps) => JSX.Element
}
