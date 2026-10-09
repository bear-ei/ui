import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import type {SupportingTextProps} from './Supporting-text.interface'
import {SupportingText} from './Supporting-text.component'

export const Supporting: StoryObj<SupportingTextProps> = {
	args: {
		children: 'Supporting text'
	}
}

export default {
	title: 'components/SupportingText',
	argTypes: {},
	component: SupportingText
} as Meta<typeof SupportingText>
