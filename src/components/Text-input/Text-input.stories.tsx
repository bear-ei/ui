import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import {Circle} from 'lucide-react-native'

import type {TextInputProps} from './Text-input.interface'

import {DENSITY_SIZE} from '../../theme'
import {IconButton} from '../Icon-button'
import {TextInput} from './Text-input.component'
import {TEXT_INPUT_TYPE} from './Text-input.enum'

export const Filled: StoryObj<TextInputProps> = {
	args: {}
}

export const Leading: StoryObj<TextInputProps> = {
	args: {
		leading: <Circle />,
		supportingText: 'supportingText'
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

export const Large: StoryObj<TextInputProps> = {
	args: {
		size: DENSITY_SIZE.LARGE
	}
}

export const Medium: StoryObj<TextInputProps> = {
	args: {
		size: DENSITY_SIZE.MEDIUM
	}
}

export const Small: StoryObj<TextInputProps> = {
	args: {
		size: DENSITY_SIZE.SMALL
	}
}

export const ExtraSmall: StoryObj<TextInputProps> = {
	args: {
		size: DENSITY_SIZE.X_SMALL
	}
}

export const Outlined: StoryObj<TextInputProps> = {
	args: {
		type: TEXT_INPUT_TYPE.OUTLINED
	}
}

export const OutlinedErr: StoryObj<TextInputProps> = {
	args: {
		error: true,
		supportingText: 'supportingText',
		type: TEXT_INPUT_TYPE.OUTLINED
	}
}

export const OutlinedLeading: StoryObj<TextInputProps> = {
	args: {
		leading: <Circle />,
		type: TEXT_INPUT_TYPE.OUTLINED
	}
}

export default {
	component: TextInput,
	title: 'components/TextInput'
} as Meta<typeof TextInput>
