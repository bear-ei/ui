import type {FC, ReactNode} from 'react'
import type {ViewStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'
import type {LayoutType} from '../../constants'
import type {AnimatedTimingOptions, AnimateSharedValueTo, HandleStateEventChangeOptions} from '../../hooks'
import type {LayoutAnimatedProps} from '../Layout-animated'
import type {SkeletonElementProps} from './Skeleton-element'

export interface SkeletonProps extends Omit<LayoutAnimatedProps, 'duration'> {
	duration?: number
	enableAnimated?: boolean
	layoutType?: LayoutType
	skeleton?: ReactNode
}

export interface RenderSkeletonProps extends SkeletonProps {
	containerAnimatedStyle: AnimatedStyle<ViewStyle>
	visible?: boolean
}

export type SkeletonBaseProps = SkeletonProps
export interface SkeletonState {
	visible: boolean
}

export type HandleSkeletonStateChangeOptions = HandleStateEventChangeOptions & Pick<SkeletonProps, 'duration'>
export type UseSkeletonAnimatedOptions = Pick<RenderSkeletonProps, 'enableAnimated'> & Pick<SkeletonState, 'visible'>
export interface AnimateSkeletonOptions extends Pick<UseSkeletonAnimatedOptions, 'enableAnimated'> {
	animatedTiming: (options?: AnimatedTimingOptions) => AnimateSharedValueTo
}

export interface SkeletonCircleProps extends SkeletonElementProps {
	size?: number
}

export type SkeletonSquareProps = SkeletonCircleProps
export interface SkeletonRectangularProps extends SkeletonElementProps {
	size?: {width?: number; height: number}
}

export interface SkeletonComponent extends FC<SkeletonProps> {
	Circle: FC<SkeletonElementProps>
	Rectangular: FC<SkeletonElementProps>
	Square: FC<SkeletonElementProps>
}
