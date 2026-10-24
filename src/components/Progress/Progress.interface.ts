import type {JSX, RefAttributes} from 'react'
import type {View, ViewProps} from 'react-native'

import type {MeasuredLayoutRectangle} from '../../constants'
import type {ThemeableProps} from '../../theme'
import type {PROGRESS_MODE, PROGRESS_TYPE} from './Progress.enum'

export type ProgressType = (typeof PROGRESS_TYPE)[keyof typeof PROGRESS_TYPE]
export type ProgressMode = (typeof PROGRESS_MODE)[keyof typeof PROGRESS_MODE]
export interface ProgressProps extends ViewProps, RefAttributes<View>, ThemeableProps {
	defaultValue?: number

	/**
	 * Looping animations are disabled by default on native iOS/macOS to avoid
	 * abnormally high CPU usage — the circular indicator uses SVG, which
	 * re-renders heavily during looped animations.
	 *
	 * Enable explicitly when needed; disable when not in use.
	 *
	 * @default false
	 */
	enableLoop?: boolean

	/**
	 * @remarks
	 * Not all combinations are implemented yet.
	 * Currently available:
	 *   - CIRCULAR + INDETERMINATE
	 *   - LINEAR + DETERMINATE
	 *
	 * Passing other combinations will fall back to the implemented behavior.
	 */
	mode?: ProgressMode
	overlayContent?: JSX.Element
	strokeWidth?: number
	type?: ProgressType
	value?: number
}

export type RenderProgressProps = ProgressProps
export type ProgressBaseProps = ProgressProps
export interface ProgressState {
	layout: MeasuredLayoutRectangle
}
