import type {Meta, StoryObj} from '@storybook/react'
import {Progress} from './Progress.component'
import {PROGRESS_ANIMATED, PROGRESS_TYPE} from './Progress.enum'
import type {ProgressProps} from './Progress.interface'

export const LinearDeterminate: StoryObj<ProgressProps> = {
	args: {
		value: 0,
		animatedType: PROGRESS_ANIMATED.DETERMINATE
	}
}

export const CircularDeterminate: StoryObj<ProgressProps> = {
	args: {
		enableAnimated: true,
		type: PROGRESS_TYPE.CIRCULAR,
		value: 0
	}
}

export default {
	title: 'components/Progress',
	component: Progress
} as Meta<typeof Progress>
