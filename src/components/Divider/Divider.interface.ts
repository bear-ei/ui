import type {RefAttributes} from 'react'
import type {View, ViewProps} from 'react-native'
import type {LayoutType} from '../../constants'
import type {Size} from '../../theme'

export interface DividerProps extends ViewProps, RefAttributes<View> {
	layoutType?: LayoutType
	size?: Size
	subheader?: string
}

export type RenderDividerProps = DividerProps
export type DividerBaseProps = DividerProps
