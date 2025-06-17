import {forwardRef} from 'react'
import type {View} from 'react-native'
import type {RenderSkeletonElementProps} from './Skeleton-element.interface'
import {Container} from './Skeleton-element.styles'

export const RenderSkeletonElement = forwardRef<View, RenderSkeletonElementProps>(
	({children, id, testID, ...props}, ref) => (
		<Container
			{...props}
			ref={ref}
			testID={testID ?? `skeletonElement--${id}`}
			visible={!!children}
		>
			{children}
		</Container>
	)
)
