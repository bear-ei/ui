import type {RefAttributes} from 'react'
import type {LayoutRectangle, View, ViewProps} from 'react-native'
import type {PROGRESS_ANIMATED, PROGRESS_TYPE} from './Progress.enum'

export type ProgressType = (typeof PROGRESS_TYPE)[keyof typeof PROGRESS_TYPE]
export type ProgressAnimated = (typeof PROGRESS_ANIMATED)[keyof typeof PROGRESS_ANIMATED]
export interface ProgressProps extends ViewProps, RefAttributes<View> {
	animatedType?: ProgressAnimated
	content?: React.JSX.Element
	defaultValue?: number
	size?: number
	strokeWidth?: number
	type?: ProgressType
	value?: number
}

export type RenderProgressProps = ProgressProps
export interface ProgressBaseProps extends ProgressProps {
	renderProgress: (props: RenderProgressProps) => React.JSX.Element
}

export interface ProgressState {
	layout: LayoutRectangle
}

export interface ProgressContainerProps extends Pick<ProgressProps, 'type' | 'size'> {
	progressing?: boolean
}
