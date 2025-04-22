import {forwardRef} from 'react'
import type {View} from 'react-native'
import {SkeletonElementBase} from './Skeleton-element-base.component'
import type {RenderSkeletonElementProps, SkeletonElementProps} from './Skeleton-element.interface'
import {Container} from './Skeleton-element.styles'

const renderSkeletonElement = ({children, id, testID, ...props}: RenderSkeletonElementProps) => (
	<Container
		{...props}
		showChildren={!!children}
		testID={testID ?? `skeletonElement--${id}`}
	>
		{children}
	</Container>
)

const SkeletonElementWithRef = forwardRef<View, SkeletonElementProps>((props, ref) => (
	<SkeletonElementBase
		{...props}
		ref={ref}
		renderSkeletonElement={renderSkeletonElement}
	/>
))

export const SkeletonElement = SkeletonElementWithRef
