import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import type {SkeletonProps} from './Skeleton.interface'

import {ORIENTATION} from '../../constants'
import {Skeleton, SkeletonCircle, SkeletonRectangular, SkeletonSquare} from './Skeleton.component'

const SkeletonComponent = (props: SkeletonProps) => {
	const skeleton = (
		<>
			<SkeletonSquare />
			<SkeletonRectangular
				orientation={ORIENTATION.VERTICAL}
				size={{height: 48, width: 56}}
			>
				<SkeletonRectangular size={{height: 24}} />
				<SkeletonRectangular size={{height: 24}} />
			</SkeletonRectangular>
			<SkeletonCircle />
		</>
	)

	return (
		<Skeleton
			{...props}
			autoHideDelay={-1}
			className='h-14 gap-2'
			skeleton={skeleton}
		/>
	)
}

export const DefaultSkeleton: StoryObj<SkeletonProps> = {
	args: {}
}

export const AutoHide = () => (
	<Skeleton
		autoHideDelay={300}
		className='h-14'
		skeleton={<SkeletonRectangular size={{height: 48, width: 56}} />}
	/>
)

export default {
	argTypes: {onPress: {action: 'pressed'}},
	component: SkeletonComponent,
	title: 'components/Skeleton'
} as Meta<typeof Skeleton>
