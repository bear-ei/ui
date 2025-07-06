import type {Meta, StoryObj} from '@storybook/react'
import {DENSITY} from '../Common'
import {Checkbox} from './Checkbox.component'
import type {CheckboxProps} from './Checkbox.interface'

export const Selected: StoryObj<CheckboxProps> = {
	args: {active: true, indeterminate: false}
}

export const Indeterminate: StoryObj<CheckboxProps> = {
	args: {indeterminate: true}
}

export const Err: StoryObj<CheckboxProps> = {
	args: {error: true}
}

export const DensityScale: StoryObj<CheckboxProps> = {
	args: {density: DENSITY.COMPACT}
}

export const Disabled: StoryObj<CheckboxProps> = {
	args: {disabled: true}
}

export default {
	title: 'components/Checkbox',
	argTypes: {onActive: {action: 'active'}},
	component: Checkbox
} as Meta<typeof Checkbox>
