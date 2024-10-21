import {RefAttributes} from 'react'
import {View, ViewProps} from 'react-native'
import {WindowSize} from '../../../hooks'
import {ShapeProps} from '../../Common'

export interface LayoutNavigationProps extends ViewProps, RefAttributes<View>, ShapeProps {}
export interface RenderLayoutNavigationProps extends LayoutNavigationProps {
    windowSize?: WindowSize
}

export interface LayoutNavigationBaseProps extends LayoutNavigationProps {
    render: (props: RenderLayoutNavigationProps) => JSX.Element
}

export type LayoutNavigationContainerProps = Pick<RenderLayoutNavigationProps, 'windowSize'>
