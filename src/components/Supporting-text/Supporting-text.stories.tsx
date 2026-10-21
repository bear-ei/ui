import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import {SupportingText} from './Supporting-text.component'
import type {SupportingTextProps} from './Supporting-text.interface'

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

export default {
	title: 'components/SupportingText',
	argTypes: {},
	component: SupportingText
} as Meta<typeof SupportingText>
