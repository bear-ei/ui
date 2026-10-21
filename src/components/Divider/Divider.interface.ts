import type {RefAttributes} from 'react'
import type {View, ViewProps} from 'react-native'

import type {LayoutType} from '../../constants'
import type {ThemeProps} from '../../theme'

export interface DividerProps extends ViewProps, RefAttributes<View>, ThemeProps {
	layoutType?: LayoutType
	subheader?: string
}

export type RenderDividerProps = DividerProps
export type DividerBaseProps = DividerProps
