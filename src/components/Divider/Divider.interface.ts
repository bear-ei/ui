import type {RefAttributes} from 'react'
import type {View, ViewProps} from 'react-native'

import type {Orientation} from '../../constants'
import type {ThemeableProps} from '../../theme'

export interface DividerProps extends ViewProps, RefAttributes<View>, ThemeableProps {
	orientation?: Orientation
	subheaderText?: string
}

export type RenderDividerProps = DividerProps
export type DividerBaseProps = DividerProps
