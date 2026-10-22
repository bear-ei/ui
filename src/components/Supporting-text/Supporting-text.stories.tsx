import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import type {SupportingTextProps} from './Supporting-text.interface'

import {ALIGNMENT} from '../../constants'
import {SupportingText} from './Supporting-text.component'

export const Supporting: StoryObj<SupportingTextProps> = {
	args: {
		children: 'Supporting text'
	}
}

export const ErrorSupporting: StoryObj<SupportingTextProps> = {
	args: {
		children: 'Supporting text',
		error: true
	}
}

export const DisabledSupporting: StoryObj<SupportingTextProps> = {
	args: {
		children: 'Supporting text',
		disabled: true
	}
}

export const Hidden: StoryObj<SupportingTextProps> = {
	args: {
		children: 'Supporting text',
		visible: false
	}
}

export const Centered: StoryObj<SupportingTextProps> = {
	args: {
		alignment: ALIGNMENT.CENTER,
		children: 'Supporting text'
	}
}

export default {
	argTypes: {},
	component: SupportingText,
	title: 'components/SupportingText'
} as Meta<typeof SupportingText>
