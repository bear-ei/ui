import {RefAttributes} from 'react'
import {View, ViewProps} from 'react-native'
import {WindowSize} from '../../hooks'

export interface LayoutProps extends ViewProps, RefAttributes<View> {
    navigationArea: boolean
    windowSize: WindowSize
}

export type RenderLayoutProps = LayoutProps
export interface LayoutBaseProps extends LayoutProps {
    render: (props: RenderLayoutProps) => JSX.Element
}

export type ContainerProps = Pick<LayoutProps, 'windowSize' | 'navigationArea'>
