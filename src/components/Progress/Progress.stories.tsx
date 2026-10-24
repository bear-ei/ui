import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import type {ProgressProps} from './Progress.interface'

import {DENSITY_SIZE} from '../../theme'
import {Progress} from './Progress.component'
import {PROGRESS_MODE, PROGRESS_TYPE} from './Progress.enum'

export const LinearDeterminate: StoryObj<ProgressProps> = {
	args: {
		mode: PROGRESS_MODE.DETERMINATE,
		value: 0
	}
}

export const CircularIndeterminate: StoryObj<ProgressProps> = {
	args: {
		enableLoop: true,
		type: PROGRESS_TYPE.CIRCULAR
	}
}

export const ExtraLarge: StoryObj<ProgressProps> = {
	args: {enableLoop: true, size: DENSITY_SIZE.X_LARGE, type: PROGRESS_TYPE.CIRCULAR}
}

export const Large: StoryObj<ProgressProps> = {
	args: {enableLoop: true, size: DENSITY_SIZE.LARGE, type: PROGRESS_TYPE.CIRCULAR}
}

export const Medium: StoryObj<ProgressProps> = {
	args: {enableLoop: true, size: DENSITY_SIZE.MEDIUM, type: PROGRESS_TYPE.CIRCULAR}
}

export const Small: StoryObj<ProgressProps> = {
	args: {enableLoop: true, size: DENSITY_SIZE.SMALL, type: PROGRESS_TYPE.CIRCULAR}
}

export const ExtraSmall: StoryObj<ProgressProps> = {
	args: {enableLoop: true, size: DENSITY_SIZE.X_SMALL, type: PROGRESS_TYPE.CIRCULAR}
}

export const LinearLarge: StoryObj<ProgressProps> = {
	args: {
		mode: PROGRESS_MODE.DETERMINATE,
		size: DENSITY_SIZE.X_LARGE,
		value: 0.5
	}
}

export default {
	component: Progress,
	title: 'components/Progress'
} as Meta<typeof Progress>
