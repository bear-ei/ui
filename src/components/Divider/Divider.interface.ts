import type {Size} from '@bearei/element-token'
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
export type DividerBaseProps = DividerProps
export type DividerLayoutProps = Pick<RenderDividerProps, 'layout' | 'size'> & RefAttributes<View>
