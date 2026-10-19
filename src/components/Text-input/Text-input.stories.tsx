import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Circle} from 'lucide-react-native'
import {DENSITY_SIZE} from '../../theme'
import {IconButton} from '../Icon-button'
import {TextInput} from './Text-input.component'
import type {TextInputProps} from './Text-input.interface'

export const Filled: StoryObj<TextInputProps> = {
	args: {}
}

export const Leading: StoryObj<TextInputProps> = {
	args: {
		supportingText: 'supportingText',
		leading: <Circle />
	}
}

export const Trailing: StoryObj<TextInputProps> = {
	args: {
		supportingText: 'supportingText',
		trailing: <IconButton />
	}
}

export const Err: StoryObj<TextInputProps> = {
	args: {
		error: true,
		supportingText: 'supportingText'
	}
}

export const ExtraLarge: StoryObj<TextInputProps> = {
	args: {
		size: DENSITY_SIZE.X_LARGE
	}
}

export const LARGE: StoryObj<TextInputProps> = {
	args: {
		size: DENSITY_SIZE.LARGE
	}
}

export const MEDIUM: StoryObj<TextInputProps> = {
	args: {
		size: DENSITY_SIZE.MEDIUM
	}
}

export const SMALL: StoryObj<TextInputProps> = {
	args: {
		size: DENSITY_SIZE.SMALL
	}
}

export const X_SMALL: StoryObj<TextInputProps> = {
	args: {
		size: DENSITY_SIZE.X_SMALL
	}
}

export default {
	title: 'components/TextInput',
	component: TextInput
} as Meta<typeof TextInput>
