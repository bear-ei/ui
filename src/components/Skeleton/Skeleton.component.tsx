import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {SkeletonBase} from './Skeleton-base.component'
import {SkeletonElement, SkeletonElementProps} from './Skeleton-element'
import {RenderSkeletonProps, SkeletonComponent, SkeletonProps} from './Skeleton.interface'
import {Container} from './Skeleton.styles'

const AnimatedContainer = Animated.createAnimatedComponent(Container)
const render = ({
        containerAnimatedStyle,
        children,
        content,
        id,
        onStateEvent,
        skeletonVisible,
        style,
        ...containerProps
}: RenderSkeletonProps) => (
        <>
                {content && skeletonVisible ?
                        <AnimatedContainer
                                {...containerProps}
                                {...onStateEvent}
                                style={[style, containerAnimatedStyle]}
                                testID={`skeleton--${id}`}
                        >
                                {content}
                        </AnimatedContainer>
                :       children}
        </>
)

const ForwardRefSkeleton = forwardRef<View, SkeletonProps>((props, ref) => (
        <SkeletonBase
                {...props}
                ref={ref}
                render={render}
        />
))

const Circle: FC<SkeletonElementProps> = (props: SkeletonElementProps) => {
        const theme = useTheme()
        const {
                width = theme.adaptFontSize(theme.token.spacing.extraSmall * 10),
                height = theme.adaptFontSize(theme.token.spacing.extraSmall * 10),
                shape = 'full',
                ...skeletonElementProps
        } = props

        return (
                <SkeletonElement
                        height={height}
                        shape={shape}
                        width={width}
                        {...skeletonElementProps}
                />
        )
}

const Square: FC<SkeletonElementProps> = (props: SkeletonElementProps) => {
        const theme = useTheme()
        const {
                width = theme.adaptFontSize(theme.token.spacing.extraSmall * 10),
                height = theme.adaptFontSize(theme.token.spacing.extraSmall * 10),
                shape = 'small',
                ...skeletonElementProps
        } = props

        return (
                <SkeletonElement
                        height={height}
                        shape={shape}
                        width={width}
                        {...skeletonElementProps}
                />
        )
}

const Rectangular: FC<SkeletonElementProps> = (props: SkeletonElementProps) => {
        const theme = useTheme()
        const {
                width,
                height = theme.adaptFontSize(theme.token.spacing.extraSmall * 12),
                shape = 'small',
                ...skeletonElementProps
        } = props

        return (
                <SkeletonElement
                        height={height}
                        shape={shape}
                        width={width}
                        {...skeletonElementProps}
                />
        )
}

Object.defineProperty(ForwardRefSkeleton, 'Circle', {value: Circle})
Object.defineProperty(ForwardRefSkeleton, 'Rectangular', {value: Rectangular})
Object.defineProperty(ForwardRefSkeleton, 'Square', {value: Square})

export const Skeleton = ForwardRefSkeleton as FC<SkeletonProps> as SkeletonComponent
