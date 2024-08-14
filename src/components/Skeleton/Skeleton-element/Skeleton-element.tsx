import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import {SkeletonElementBase} from './Skeleton-element-base'
import {RenderSkeletonElementProps, SkeletonElementProps} from './Skeleton-element.interface'
import {Container} from './Skeleton-element.styles'

const render = ({children, id, ...props}: RenderSkeletonElementProps) => (
    <Container
        {...props}
        showChildren={!!children}
        testID={`skeletonElement--${id}`}
    >
        {children}
    </Container>
)

const ForwardRefSkeletonElement = forwardRef<View, SkeletonElementProps>((props, ref) => (
    <SkeletonElementBase
        {...props}
        ref={ref}
        render={render}
    />
))

export const SkeletonElement: FC<SkeletonElementProps> = ForwardRefSkeletonElement
