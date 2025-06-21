import type {RefAttributes} from 'react'
import type {View, ViewProps} from 'react-native'
import type {LayoutRectangle} from '../Common'
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

	/**
	 * MacOS
	 * In native iOS and macOS systems, animations that need to loop should be disabled by default for the
	 * ProgressActiveIndicatorCircular component to prevent abnormally high CPU usage.
	 * This is because the ProgressActiveIndicatorCircular component relies on SVG implementation,
	 * which frequently re-renders the SVG during looped animations.
	 * Animations should be explicitly enabled when needed and disabled when not in use.
	 */
	enableAnimated?: boolean
}

export type RenderProgressProps = ProgressProps
export type ProgressBaseProps = ProgressProps
export interface ProgressState {
	layout: LayoutRectangle
}

export interface ProgressContainerProps extends Pick<ProgressProps, 'type' | 'size'>, RefAttributes<View> {
	progressing?: boolean
}
