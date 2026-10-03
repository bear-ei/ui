import type {RefAttributes} from 'react'
import type {View, ViewProps, ViewStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'
import type {CommonProps, ComponentStatus} from '../../constants'
import type {ELEVATION, ELEVATION_ACTION} from './Elevation.enum'
import type {AnimatedTimingOptions, AnimateSharedValueTo} from '../../hooks'

export type ElevationLevel = (typeof ELEVATION)[keyof typeof ELEVATION]
export type ElevationAction = (typeof ELEVATION_ACTION)[keyof typeof ELEVATION_ACTION]
export interface ElevationProps extends ViewProps, RefAttributes<View>, CommonProps {
	defaultLevel?: ElevationLevel
	level?: ElevationLevel
	onAnimationFinished?: (elevation?: ElevationLevel) => void
}

export interface RenderElevationProps extends ElevationProps {
	shadowAnimatedStyle?: AnimatedStyle<ViewStyle>
}

export interface ElevationState {
	action?: ElevationAction
	level?: ElevationLevel
	status: ComponentStatus
}

export type ElevationBaseProps = ElevationProps
export type UseElevationAnimatedOptions = Pick<RenderElevationProps, 'level' | 'onAnimationFinished'> &
	Pick<ElevationState, 'action' | 'status'>

export type GetWebBoxShadowOptions = {
	color: string
	offsetX: number
	offsetY: number
	opacity: number
	radius: number
}

export interface AnimateElevationOptions extends Pick<UseElevationAnimatedOptions, 'onAnimationFinished' | 'action'> {
	animatedTiming: (options?: AnimatedTimingOptions) => AnimateSharedValueTo
}
