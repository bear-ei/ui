import type {RefAttributes} from 'react'
import type {View, ViewProps, ViewStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'

import type {ComponentStatus} from '../../constants'
import type {AnimatedTimingOptions} from '../../hooks'
import type {ThemeableProps} from '../../theme'
import type {ELEVATION_VALUE} from './Elevation.enum'

export type ElevationValue = (typeof ELEVATION_VALUE)[keyof typeof ELEVATION_VALUE]
export interface ElevationProps extends ViewProps, RefAttributes<View>, ThemeableProps {
	defaultLevel?: ElevationValue
	entry?: AnimatedTimingOptions
	exit?: AnimatedTimingOptions
	level?: ElevationValue
	onAnimationFinished?: (visible?: boolean) => void
}

export interface RenderElevationProps extends ElevationProps {
	shadowAnimatedStyle?: AnimatedStyle<ViewStyle>
}

export interface ElevationState {
	level?: ElevationValue
	status: ComponentStatus
}

export type ElevationBaseProps = ElevationProps
export type UseElevationAnimatedOptions = Pick<
	RenderElevationProps,
	'level' | 'onAnimationFinished' | 'entry' | 'exit'
> &
	Pick<ElevationState, 'status'>

export type GetWebBoxShadowOptions = {
	blurRadius: number
	color: string
	offsetX: number
	offsetY: number
	opacity: number
}

export type AnimateElevationOptions = Pick<UseElevationAnimatedOptions, 'onAnimationFinished' | 'entry' | 'exit'>
