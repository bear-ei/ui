import type {RefAttributes} from 'react'
import type {View, ViewProps, ViewStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'
import type {CommonProps, ComponentStatus} from '../../constants'
import type {ELEVATION_VALUE} from './Elevation.enum'
import type {AnimatedTimingOptions, AnimateSharedValueTo} from '../../hooks'

export type ElevationValue = (typeof ELEVATION_VALUE)[keyof typeof ELEVATION_VALUE]
export interface ElevationProps extends ViewProps, RefAttributes<View>, CommonProps {
	defaultLevel?: ElevationValue
	level?: ElevationValue
	onAnimationFinished?: (elevation?: ElevationValue) => void
}

export interface RenderElevationProps extends ElevationProps {
	shadowAnimatedStyle?: AnimatedStyle<ViewStyle>
}

export interface ElevationState {
	level?: ElevationValue
	status: ComponentStatus
}

export type ElevationBaseProps = ElevationProps
export type UseElevationAnimatedOptions = Pick<RenderElevationProps, 'level' | 'onAnimationFinished'> &
	Pick<ElevationState, 'status'>

export type GetWebBoxShadowOptions = {
	blurRadius: number
	color: string
	offsetX: number
	offsetY: number
	opacity: number
}

export interface AnimateElevationOptions extends Pick<UseElevationAnimatedOptions, 'onAnimationFinished'> {
	animatedTiming: (options?: AnimatedTimingOptions) => AnimateSharedValueTo
}
