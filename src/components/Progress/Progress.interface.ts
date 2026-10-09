import type {RefAttributes} from 'react'
import type {View, ViewProps} from 'react-native'
import type {CommonProps, LayoutRectangle} from '../../constants'
import type {PROGRESS_ANIMATED, PROGRESS_TYPE} from './Progress.enum'

export type ProgressType = (typeof PROGRESS_TYPE)[keyof typeof PROGRESS_TYPE]
export type ProgressAnimated = (typeof PROGRESS_ANIMATED)[keyof typeof PROGRESS_ANIMATED]
export interface ProgressProps extends ViewProps, RefAttributes<View>, CommonProps {
	/**
	 * @remarks
	 * Not all combinations are implemented yet.
	 * Currently available:
	 *   - CIRCULAR + INDETERMINATE
	 *   - LINEAR + DETERMINATE
	 *
	 * Passing other combinations will fall back to the implemented behavior.
	 */
	animatedType?: ProgressAnimated
	content?: React.JSX.Element
	defaultValue?: number
	strokeWidth?: number
	type?: ProgressType
	value?: number

	/**
	 * Looping animations are disabled by default on native iOS/macOS to avoid
	 * abnormally high CPU usage — the circular indicator uses SVG, which
	 * re-renders heavily during looped animations.
	 *
	 * Enable explicitly when needed; disable when not in use.
	 *
	 * @default false
	 */
	enableAnimated?: boolean
}

export type RenderProgressProps = ProgressProps
export type ProgressBaseProps = ProgressProps
export interface ProgressState {
	layout: LayoutRectangle
}
