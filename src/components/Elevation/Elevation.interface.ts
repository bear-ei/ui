import type {CommonProps} from '@/constants'
import type {RefAttributes} from 'react'
import type {View, ViewProps, ViewStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'
import type {ELEVATION} from './Elevation.enum'

export type ElevationLevel = (typeof ELEVATION)[keyof typeof ELEVATION]
export interface ElevationProps extends ViewProps, RefAttributes<View>, CommonProps {
    defaultLevel?: ElevationLevel
    level?: ElevationLevel
    onAnimationFinished?: (elevation?: ElevationLevel) => void
}

export interface RenderElevationProps extends Omit<ElevationProps, 'renderStyle'> {
    shadowAnimatedStyle?: AnimatedStyle<ViewStyle>
}

export type ElevationBaseProps = ElevationProps
export type UseElevationAnimatedOptions = Pick<RenderElevationProps, 'level' | 'onAnimationFinished'>
export type GetWebBoxShadowOptions = {
    color: string
    offsetX: number
    offsetY: number
    opacity: number
    radius: number
}
