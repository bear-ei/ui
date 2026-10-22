import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import type {DividerProps} from './Divider.interface'

import {LAYOUT} from '../../constants'
import {DENSITY_SIZE} from '../../theme'
import {Divider} from './Divider.component'

export const Horizontal: StoryObj<DividerProps> = {
	args: {layoutType: LAYOUT.HORIZONTAL}
}

export const Subheader: StoryObj<DividerProps> = {
	args: {layoutType: LAYOUT.HORIZONTAL, subheader: 'Subheader'}
}

export const Vertical: StoryObj<DividerProps> = {
	args: {layoutType: LAYOUT.VERTICAL}
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
	args: {layoutType: LAYOUT.HORIZONTAL, size: DENSITY_SIZE.LARGE, subheader: 'Subheader'}
}

export default {
	component: Divider,
	title: 'components/Divider'
} as Meta<typeof Divider>
