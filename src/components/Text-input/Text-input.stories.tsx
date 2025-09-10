import type {Meta, StoryObj} from '@storybook/react'
import {Icon} from '../Icon'
import {TextInput} from './Text-input.component'
import type {TextInputProps} from './Text-input.interface'

export const Filled: StoryObj<TextInputProps> = {
	args: {
		labelText: 'Name',
		supportingText: 'supportingText',
		filled: true
	}
}

export const IconTextInput: StoryObj<TextInputProps> = {
	args: {
		labelText: 'Name',
		supportingText: 'supportingText',
		leading: <Icon />
	}
}

export const DensityScale: StoryObj<TextInputProps> = {
	args: {
		labelText: 'Name',
		supportingText: 'supportingText',
		density: -2
	}
}

export default {
	title: 'components/TextInput',
	component: TextInput
} as Meta<typeof TextInput>
