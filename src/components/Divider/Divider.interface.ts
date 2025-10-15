import type {LayoutType} from '@/constants'
import type {Size} from '@bearei/theme-token'
import type {RefAttributes} from 'react'
import type {View, ViewProps} from 'react-native'

export interface DividerProps extends ViewProps, RefAttributes<View> {
        layoutType?: LayoutType
        size?: Size
        subheader?: string
        verticalStretch?: boolean
}

export type RenderDividerProps = DividerProps
export type DividerBaseProps = DividerProps
