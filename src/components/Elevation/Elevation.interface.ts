import type {RefAttributes} from 'react'
import type {View, ViewProps, ViewStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'

import type {ComponentStatus} from '../../constants'
import type {AnimatedTiming, AnimatedTimingOptions} from '../../hooks'
import type {ThemeProps} from '../../theme'
import type {ELEVATION_VALUE} from './Elevation.enum'

export type ElevationValue = (typeof ELEVATION_VALUE)[keyof typeof ELEVATION_VALUE]
export interface ElevationProps extends ViewProps, RefAttributes<View>, ThemeProps {
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

export interface AnimateElevationOptions extends Pick<
	UseElevationAnimatedOptions,
	'onAnimationFinished' | 'entry' | 'exit'
> {
	animatedTiming: AnimatedTiming
}
