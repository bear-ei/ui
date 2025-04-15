import type {Size} from '@bearei/material-token'
import type {RefAttributes} from 'react'
import type {View, ViewProps} from 'react-native'
import type {LayoutType} from '../Common'

export interface DividerProps extends ViewProps, RefAttributes<View> {
	layout?: LayoutType
	size?: Size
	subheader?: string
	verticalStretch?: boolean
}

export type RenderDividerProps = DividerProps
export interface DividerBaseProps extends DividerProps {
	render: (props: RenderDividerProps) => React.JSX.Element
}

export type DividerLayoutProps = Pick<RenderDividerProps, 'layout' | 'size'>
