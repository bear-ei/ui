import type {RefAttributes} from 'react'
import type {View, ViewProps} from 'react-native'
import type {CommonProps, LayoutType} from '../../constants'

export interface DividerProps extends ViewProps, RefAttributes<View>, CommonProps {
	layoutType?: LayoutType
	subheader?: string
}

export type RenderDividerProps = DividerProps
export type DividerBaseProps = DividerProps
