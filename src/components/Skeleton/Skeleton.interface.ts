import {Layout} from '@bearei/material-token'
import {FC, ReactNode} from 'react'
import {ViewStyle} from 'react-native'
import {AnimatedStyle} from 'react-native-reanimated'
import {AnimatedTiming, HandleStateEventChangeOptions} from '../../hooks'
import {LayoutAnimatedProps} from '../Layout-animated'
import {SkeletonElementProps} from './Skeleton-element'

export interface SkeletonProps extends Omit<LayoutAnimatedProps, 'duration'> {
        containerLayout?: Layout
        duration?: number
        enableAnimated?: boolean
        skeleton?: ReactNode
}

export interface RenderSkeletonProps extends SkeletonProps {
        containerAnimatedStyle: AnimatedStyle<ViewStyle>
        visible?: boolean
}

export interface SkeletonBaseProps extends SkeletonProps {
        render: (props: RenderSkeletonProps) => React.JSX.Element
}

export interface SkeletonState {
        nextSkeletonVisibleEvent?: () => void
        visible: boolean
}

export type HandleSkeletonStateChangeOptions = HandleStateEventChangeOptions & Pick<SkeletonProps, 'duration'>
export type UseSkeletonAnimatedOptions = Pick<RenderSkeletonProps, 'enableAnimated'> & Pick<SkeletonState, 'visible'>
export interface HandleSkeletonAnimatedTimingOptions extends Pick<UseSkeletonAnimatedOptions, 'enableAnimated'> {
        animatedTiming: AnimatedTiming
}

export interface SkeletonComponent extends FC<SkeletonProps> {
        Circle: FC<SkeletonElementProps>
        Rectangular: FC<SkeletonElementProps>
        Square: FC<SkeletonElementProps>
}

export type SkeletonContainerProps = Pick<RenderSkeletonProps, 'containerLayout'> & {
        showChildren?: boolean
}
