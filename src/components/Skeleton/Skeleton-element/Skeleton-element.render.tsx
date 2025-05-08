import type {RenderSkeletonElementProps} from './Skeleton-element.interface'
import {Container} from './Skeleton-element.styles'

export const renderSkeletonElement = ({children, id, testID, ...props}: RenderSkeletonElementProps) => (
	<Container
		{...props}
		showChildren={!!children}
		testID={testID ?? `skeletonElement--${id}`}
	>
		{children}
	</Container>
)
