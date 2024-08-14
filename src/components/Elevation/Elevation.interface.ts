import {RefAttributes} from 'react'
import {View, ViewProps, ViewStyle} from 'react-native'
import {AnimatedStyle} from 'react-native-reanimated'
import {ShapeProps} from '../Common'

export type ElevationLevel = 0 | 1 | 2 | 3 | 4 | 5 | undefined
export interface ElevationProps extends ViewProps, RefAttributes<View>, Pick<ShapeProps, 'shape'> {
    defaultLevel?: ElevationLevel
    level?: ElevationLevel
}

export interface RenderElevationProps extends Omit<ElevationProps, 'renderStyle'> {
    shadowAnimatedStyle: AnimatedStyle<ViewStyle>
}

export interface ElevationBaseProps extends ElevationProps {
    render: (props: RenderElevationProps) => React.JSX.Element
}

export type UseElevationAnimatedOptions = Pick<RenderElevationProps, 'level'>
export type ElevationShadowProps = Pick<RenderElevationProps, 'level'>
