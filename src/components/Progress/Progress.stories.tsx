import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Progress} from './Progress.component'
import {PROGRESS_ANIMATED, PROGRESS_TYPE} from './Progress.enum'
import type {ProgressProps} from './Progress.interface'
import {SIZE} from '../../theme'

export const LinearDeterminate: StoryObj<ProgressProps> = {
	args: {
		value: 0,
		animatedType: PROGRESS_ANIMATED.DETERMINATE
	}
}

export const CircularDeterminate: StoryObj<ProgressProps> = {
	args: {
		enableAnimated: true,
		type: PROGRESS_TYPE.CIRCULAR
	}
}

export const ExtraLarge: StoryObj<ProgressProps> = {
	args: {size: SIZE.X_LARGE, type: PROGRESS_TYPE.CIRCULAR, enableAnimated: true}
}

export const Large: StoryObj<ProgressProps> = {
	args: {size: SIZE.LARGE, type: PROGRESS_TYPE.CIRCULAR, enableAnimated: true}
}

export const Medium: StoryObj<ProgressProps> = {
	args: {size: SIZE.MEDIUM, type: PROGRESS_TYPE.CIRCULAR, enableAnimated: true}
}

export const Small: StoryObj<ProgressProps> = {
	args: {size: SIZE.SMALL, type: PROGRESS_TYPE.CIRCULAR, enableAnimated: true}
}

export const ExtraSmall: StoryObj<ProgressProps> = {
	args: {size: SIZE.X_SMALL, type: PROGRESS_TYPE.CIRCULAR, enableAnimated: true}
}

export default {
	title: 'components/Progress',
	component: Progress
} as Meta<typeof Progress>
