import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {SkeletonBase} from './Skeleton-base.component'
import {SkeletonElement, SkeletonElementProps} from './Skeleton-element'
import {RenderSkeletonProps, SkeletonComponent, SkeletonProps} from './Skeleton.interface'
import {ContentItem, SkeletonContainer} from './Skeleton.styles'

const AnimatedSkeletonContainer = Animated.createAnimatedComponent(SkeletonContainer)
const render = ({
        children,
        containerAnimatedStyle,
        id,
        skeleton,
        style,
        testID,
        visible,
        ...containerProps
}: RenderSkeletonProps) => {
        const skeletonVisible = !!(skeleton && visible)

        return (
                <>
                        <ContentItem
                                testID={`skeleton__contentItem--${id}`}
                                unmount={true}
                                visible={skeletonVisible}
                        >
                                <AnimatedSkeletonContainer
                                        {...containerProps}
                                        style={[style, containerAnimatedStyle]}
                                        testID={testID ?? `skeleton__skeletonContainer--${id}`}
                                >
                                        {skeleton}
                                </AnimatedSkeletonContainer>
                        </ContentItem>

                        <ContentItem
                                testID={`skeleton__contentItem--${id}`}
                                visible={!skeletonVisible}
                        >
                                {children}
                        </ContentItem>
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
        const {
                height = theme.adaptFontSize(theme.token.spacing.extraSmall * 10),
                shape = 'full',
                width = theme.adaptFontSize(theme.token.spacing.extraSmall * 10),
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
                height = theme.adaptFontSize(theme.token.spacing.extraSmall * 10),
                shape = 'small',
                width = theme.adaptFontSize(theme.token.spacing.extraSmall * 10),
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
                height = theme.adaptFontSize(theme.token.spacing.extraSmall * 12),
                shape = 'small',
                width,
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
