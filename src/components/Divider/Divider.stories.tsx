import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import type {DividerProps} from './Divider.interface'

import {ORIENTATION} from '../../constants'
import {DENSITY_SIZE} from '../../theme'
import {Divider} from './Divider.component'

export const Horizontal: StoryObj<DividerProps> = {
	args: {orientation: ORIENTATION.HORIZONTAL}
}

export const Subheader: StoryObj<DividerProps> = {
	args: {orientation: ORIENTATION.HORIZONTAL, subheaderText: 'Subheader'}
}

export const Vertical: StoryObj<DividerProps> = {
	args: {orientation: ORIENTATION.VERTICAL}
}

export const Medium: StoryObj<DividerProps> = {
	args: {size: DENSITY_SIZE.MEDIUM}
}

export const Large: StoryObj<DividerProps> = {
	args: {size: DENSITY_SIZE.LARGE}
}

export const Small: StoryObj<DividerProps> = {
	args: {size: DENSITY_SIZE.SMALL}
}

export const LargeSubheader: StoryObj<DividerProps> = {
	args: {orientation: ORIENTATION.HORIZONTAL, size: DENSITY_SIZE.LARGE, subheaderText: 'Subheader'}
}

export default {
	component: Divider,
	title: 'components/Divider'
} as Meta<typeof Divider>
