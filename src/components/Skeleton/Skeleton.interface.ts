import type {FC, ReactNode} from 'react'
import type {ViewStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'
import type {AnimatedTiming, HandleStateEventChangeOptions} from '../../hooks'
import type {LayoutType} from '../Common'
import type {LayoutAnimatedProps} from '../Layout-animated'
import type {SkeletonElementProps} from './Skeleton-element'

export interface SkeletonProps extends Omit<LayoutAnimatedProps, 'duration'> {
	layout?: LayoutType
	duration?: number
	enableAnimated?: boolean
	skeleton?: ReactNode
}

export interface RenderSkeletonProps extends SkeletonProps {
	containerAnimatedStyle: AnimatedStyle<ViewStyle>
	visible?: boolean
}

export interface SkeletonBaseProps extends SkeletonProps {
	renderSkeleton: (props: RenderSkeletonProps) => React.JSX.Element
}

export interface SkeletonState {
	nextSkeletonVisibilityEvent?: () => void
	visible: boolean
}

export type HandleSkeletonStateChangeOptions = HandleStateEventChangeOptions & Pick<SkeletonProps, 'duration'>
export type UseSkeletonAnimatedOptions = Pick<RenderSkeletonProps, 'enableAnimated'> & Pick<SkeletonState, 'visible'>
export interface AnimateSkeletonOptions extends Pick<UseSkeletonAnimatedOptions, 'enableAnimated'> {
	animatedTiming: AnimatedTiming
}

export interface SkeletonComponent extends FC<SkeletonProps> {
	Circle: FC<SkeletonElementProps>
	Rectangular: FC<SkeletonElementProps>
	Square: FC<SkeletonElementProps>
}

export type SkeletonContainerProps = {
	layoutType?: LayoutType
	showChildren?: boolean
}
