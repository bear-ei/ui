import {RefAttributes} from 'react'
import {View, ViewProps} from 'react-native'
import {Layout, Size} from '../Common'

export interface DividerProps extends ViewProps, RefAttributes<View> {
    layout?: Layout
    size?: Size
    subheader?: string
    verticalStretch?: boolean
}

export type RenderDividerProps = DividerProps
export interface DividerBaseProps extends DividerProps {
    render: (props: RenderDividerProps) => JSX.Element
}

export type DividerContainerProps = Pick<RenderDividerProps, 'layout' | 'size'>
