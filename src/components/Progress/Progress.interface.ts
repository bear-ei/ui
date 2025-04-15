import type {RefAttributes} from 'react'
import type {LayoutRectangle, View, ViewProps} from 'react-native'
import type {HandleStateEventChangeOptions, InteractionHandlers} from '../../hooks'
import type {PROGRESS_ANIMATED, PROGRESS_TYPE} from './Progress.enum'

export type ProgressType = (typeof PROGRESS_TYPE)[keyof typeof PROGRESS_TYPE]
export type ProgressAnimated = (typeof PROGRESS_ANIMATED)[keyof typeof PROGRESS_ANIMATED]
export interface ProgressProps extends ViewProps, RefAttributes<View> {
	animatedType?: ProgressAnimated
	content?: React.JSX.Element
	defaultValue?: number
	increment?: number
	size?: number
	strokeWidth?: number
	type?: ProgressType
	value?: number
}

export interface RenderProgressProps extends ProgressProps {
	layout: LayoutRectangle
	stateOnEvent: InteractionHandlers
}

export interface ProgressBaseProps extends ProgressProps {
	render: (props: RenderProgressProps) => React.JSX.Element
}

export interface ProgressState {
	layout: LayoutRectangle
}

export interface HandleProgressStateChangeOptions extends HandleStateEventChangeOptions {
	onLayoutChange: (layout: LayoutRectangle) => void
}

export interface ProgressContainerProps extends Pick<ProgressProps, 'type' | 'size'> {
	progressing?: boolean
}
