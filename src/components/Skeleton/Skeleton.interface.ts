import type {ReactNode} from 'react'
import type {ViewStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'

import type {Orientation} from '../../constants'
import type {HandleInteractionStateChangeOptions} from '../../hooks'
import type {LayoutAnimatedProps} from '../Layout-animated'
import type {SkeletonElementProps} from './Skeleton-element'

export interface SkeletonProps extends LayoutAnimatedProps {
	autoHideDelay?: number
	enableLoop?: boolean
	orientation?: Orientation
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

export type HandleSkeletonInteractionStateChangeOptions = HandleInteractionStateChangeOptions &
	Pick<SkeletonProps, 'autoHideDelay'>

export type UseSkeletonAnimatedOptions = Pick<RenderSkeletonProps, 'enableLoop'> & Pick<SkeletonState, 'visible'>
export type AnimateSkeletonOptions = Pick<UseSkeletonAnimatedOptions, 'enableLoop'>
export interface SkeletonCircleProps extends SkeletonElementProps {
	size?: number
}

export type SkeletonSquareProps = SkeletonCircleProps
export interface SkeletonRectangularProps extends SkeletonElementProps {
	size?: {height: number; width?: number}
}
