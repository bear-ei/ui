import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import type {SkeletonProps} from './Skeleton.interface'

import {LAYOUT} from '../../constants'
import {Circle, Rectangular, Skeleton, Square} from './Skeleton.component'

const SkeletonComponent = (props: SkeletonProps) => {
	const skeleton = (
		<>
			<Square />
			<Rectangular
				layoutType={LAYOUT.VERTICAL}
				size={{height: 48, width: 56}}
			>
				<Rectangular size={{height: 24}} />
				<Rectangular size={{height: 24}} />
			</Rectangular>
			<Circle />
		</>
	)

	return (
		<Skeleton
			{...props}
			className='h-14 gap-2'
			duration={-1}
			skeleton={skeleton}
		/>
	)
}

export const DefaultSkeleton: StoryObj<SkeletonProps> = {
	args: {}
}

export const AutoHide = () => (
	<Skeleton
		className='h-14'
		duration={300}
		skeleton={<Rectangular size={{height: 48, width: 56}} />}
	/>
)

export default {
	argTypes: {onPress: {action: 'pressed'}},
	component: SkeletonComponent,
	title: 'components/Skeleton'
} as Meta<typeof Skeleton>
