import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import {LAYOUT} from '../../constants'

import {Circle, Rectangular, Skeleton, Square} from './Skeleton.component'
import type {SkeletonProps} from './Skeleton.interface'

const SkeletonComponent = (props: SkeletonProps) => {
	const skeleton = (
		<>
			<Square />
			<Rectangular
				layoutType={LAYOUT.VERTICAL}
				size={{width: 56, height: 48}}
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

export default {
	title: 'components/Skeleton',
	argTypes: {onPress: {action: 'pressed'}},
	component: SkeletonComponent
} as Meta<typeof Skeleton>
