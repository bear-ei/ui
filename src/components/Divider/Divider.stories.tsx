import {SIZE} from '@bearei/element-token'
import type {Meta, StoryObj} from '@storybook/react'
import {LAYOUT} from '../Common'
import {Divider} from './Divider.component'
import type {DividerProps} from './Divider.interface'

export const Horizontal: StoryObj<DividerProps> = {
	args: {size: SIZE.LARGE}
}

export const Subheader: StoryObj<DividerProps> = {
	args: {layout: LAYOUT.HORIZONTAL, subheader: 'Subheader'}
}

export const Vertical: StoryObj<DividerProps> = {
	args: {size: SIZE.LARGE, layout: LAYOUT.VERTICAL}
}

export default {
	title: 'components/Divider',
	component: Divider
} as Meta<typeof Divider>
