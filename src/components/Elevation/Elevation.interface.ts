import type {RefAttributes} from 'react'
import type {View, ViewProps, ViewStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'
import type {ShapeProps} from '../Common'
import type {ELEVATION} from './Elevation.enum'

export type ElevationLevel = (typeof ELEVATION)[keyof typeof ELEVATION]
export interface ElevationProps extends ViewProps, RefAttributes<View>, Pick<ShapeProps, 'shape'> {
	defaultLevel?: ElevationLevel
	level?: ElevationLevel
}

export interface RenderElevationProps extends Omit<ElevationProps, 'renderStyle'> {
	shadowAnimatedStyle?: AnimatedStyle<ViewStyle>
}

export interface ElevationBaseProps extends ElevationProps {
	renderElevation: (props: RenderElevationProps) => React.JSX.Element
}

export type UseElevationAnimatedOptions = Pick<RenderElevationProps, 'level'>
export type ElevationShadowProps = Pick<RenderElevationProps, 'level'>
