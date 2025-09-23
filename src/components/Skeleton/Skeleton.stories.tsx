import type {Meta, StoryObj} from '@storybook/react'
import {LAYOUT} from '../Common'
import {Circle, Rectangular, Skeleton, Square} from './Skeleton.component'
import type {SkeletonProps} from './Skeleton.interface'

const SkeletonComponent = (props: SkeletonProps) => {
	const skeletonStyle = {gap: 16, height: 56}
	const skeleton = (
		<>
			<Square />
			<Rectangular
				layoutType={LAYOUT.VERTICAL}
				size={56}
			>
				<Rectangular size={24} />
				<Rectangular size={24} />
			</Rectangular>
			<Circle />
		</>
	)

	return (
		<Skeleton
			{...props}
			skeleton={skeleton}
			duration={-1}
			style={skeletonStyle}
		/>
	)
}

export const Default: StoryObj<SkeletonProps> = {
	args: {}
}

export default {
	title: 'components/Skeleton',
	argTypes: {onPress: {action: 'pressed'}},
	component: SkeletonComponent
} as Meta<typeof Skeleton>
