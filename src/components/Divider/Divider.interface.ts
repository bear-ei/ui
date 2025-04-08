import {Size} from '@bearei/material-token'
import {RefAttributes} from 'react'
import {View, ViewProps} from 'react-native'
import {Layout} from '../Common'

export interface DividerProps extends ViewProps, RefAttributes<View> {
        layout?: Layout
        size?: Size
        subheader?: string
        verticalStretch?: boolean
}

export type RenderDividerProps = DividerProps
export interface DividerBaseProps extends DividerProps {
        render: (props: RenderDividerProps) => React.JSX.Element
}

export type DividerLayoutProps = Pick<RenderDividerProps, 'layout' | 'size'>
