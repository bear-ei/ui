import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {SkeletonBase} from './Skeleton-base.component'
import {SkeletonElement, SkeletonElementProps} from './Skeleton-element'
import {RenderSkeletonProps, SkeletonComponent, SkeletonProps} from './Skeleton.interface'
import {ContentItem, ContentItemLayout, SkeletonContainer} from './Skeleton.styles'

const AnimatedSkeletonContainer = Animated.createAnimatedComponent(SkeletonContainer)
const render = ({
        children,
        containerAnimatedStyle,
        skeleton,
        style,
        visible,
        ...containerProps
}: RenderSkeletonProps) => {
        const skeletonVisible = !!(skeleton && visible)

        return (
                <>
                        <ContentItemLayout
                                unmount={true}
                                visible={skeletonVisible}
                        >
                                <AnimatedSkeletonContainer
                                        {...containerProps}
                                        style={[style, containerAnimatedStyle]}
                                >
                                        {skeleton}
                                </AnimatedSkeletonContainer>
                        </ContentItemLayout>

                        <ContentItemLayout visible={!skeletonVisible}>
                                <ContentItem>{children}</ContentItem>
                        </ContentItemLayout>
                </>
        )
}

const ForwardRefSkeleton = forwardRef<View, SkeletonProps>((props, ref) => (
        <SkeletonBase
                {...props}
                ref={ref}
                render={render}
        />
))

const Circle: FC<SkeletonElementProps> = (props: SkeletonElementProps) => {
        const theme = useTheme()
        const {shape = 'full', size, style, ...skeletonElementProps} = props
        const defaultSize = theme.adaptFontSize(theme.token.spacing.extraSmall * 10)
        const circleSize = typeof size === 'number' ? (size ?? defaultSize) : defaultSize
        const circleStyle = {width: circleSize, height: circleSize}

        return (
                <SkeletonElement
                        shape={shape}
                        style={[circleStyle, style]}
                        {...skeletonElementProps}
                />
        )
}

const Square: FC<SkeletonElementProps> = (props: SkeletonElementProps) => {
        const theme = useTheme()
        const {shape = 'small', size, style, ...skeletonElementProps} = props
        const defaultSize = theme.adaptFontSize(theme.token.spacing.extraSmall * 10)
        const squareSize = typeof size === 'number' ? (size ?? defaultSize) : defaultSize
        const squareStyle = {width: squareSize, height: squareSize}

        return (
                <SkeletonElement
                        shape={shape}
                        style={[squareStyle, style]}
                        {...skeletonElementProps}
                />
        )
}

const Rectangular: FC<SkeletonElementProps> = (props: SkeletonElementProps) => {
        const theme = useTheme()
        const {shape = 'small', style, size, ...skeletonElementProps} = props
        const defaultSize = theme.adaptFontSize(theme.token.spacing.extraSmall * 10)
        const rectangularStyle =
                typeof size === 'object' ?
                        {width: size.width ?? defaultSize, height: size.height ?? defaultSize}
                :       {width: defaultSize, height: defaultSize}

        return (
                <SkeletonElement
                        shape={shape}
                        style={[rectangularStyle, style]}
                        {...skeletonElementProps}
                />
        )
}

Object.defineProperty(ForwardRefSkeleton, 'Circle', {value: Circle})
Object.defineProperty(ForwardRefSkeleton, 'Rectangular', {value: Rectangular})
Object.defineProperty(ForwardRefSkeleton, 'Square', {value: Square})

export const Skeleton = ForwardRefSkeleton as FC<SkeletonProps> as SkeletonComponent
