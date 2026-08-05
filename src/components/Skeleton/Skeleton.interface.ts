import type {LayoutType} from '@/constants'
import type {AnimateSharedValueTo, HandleStateEventChangeOptions} from '@/hooks'
import type {FC, ReactNode} from 'react'
import type {ViewStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'
import type {LayoutAnimatedProps} from '../Layout-animated'
import type {SkeletonElementProps} from './Skeleton-element'

export interface SkeletonProps extends Omit<LayoutAnimatedProps, 'duration'> {
    layoutType?: LayoutType
    duration?: number
    enableAnimated?: boolean
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
    animateSharedValueTo: AnimateSharedValueTo
}

export interface SkeletonComponent extends FC<SkeletonProps> {
    Circle: FC<SkeletonElementProps>
    Rectangular: FC<SkeletonElementProps>
    Square: FC<SkeletonElementProps>
}
