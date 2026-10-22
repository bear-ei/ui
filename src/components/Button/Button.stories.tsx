import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import {Circle} from 'lucide-react-native'

import type {ButtonProps} from './Button.interface'

import {DENSITY_SIZE} from '../../theme'
import {Button} from './Button.component'
import {BUTTON_TYPE} from './Button.enum'

export const Filled: StoryObj<ButtonProps> = {
	args: {
		labelText: 'Label'
	}
}

export const Outlined: StoryObj<ButtonProps> = {
	args: {
		labelText: 'Label',
		type: BUTTON_TYPE.OUTLINED
	}
}

export const Text: StoryObj<ButtonProps> = {
	args: {
		labelText: 'Label',
		type: BUTTON_TYPE.TEXT
	}
}

export const TextIcon: StoryObj<ButtonProps> = {
	args: {
		icon: <Circle />,
		labelText: 'Label',
		type: BUTTON_TYPE.TEXT
	}
}

export const Tonal: StoryObj<ButtonProps> = {
	args: {
		labelText: 'Label',
		type: BUTTON_TYPE.TONAL
	}
}

export const Elevated: StoryObj<ButtonProps> = {
	args: {
		labelText: 'Label',
		type: BUTTON_TYPE.ELEVATED
	}
}

export const Link: StoryObj<ButtonProps> = {
	args: {
		disabled: true,
		labelText: 'Label',
		type: BUTTON_TYPE.LINK
	}
}

export const Icon: StoryObj<ButtonProps> = {
	args: {
		icon: <Circle />,
		labelText: 'Label'
	}
}

export const Err: StoryObj<ButtonProps> = {
	args: {
		error: true,
		labelText: 'Label'
	}
}

export const ExtraLarge: StoryObj<ButtonProps> = {
	args: {size: DENSITY_SIZE.X_LARGE}
}

export const Large: StoryObj<ButtonProps> = {
	args: {size: DENSITY_SIZE.LARGE}
}

export const Medium: StoryObj<ButtonProps> = {
	args: {size: DENSITY_SIZE.MEDIUM}
}

export const Small: StoryObj<ButtonProps> = {
	args: {size: DENSITY_SIZE.SMALL}
}

export const ExtraSmall: StoryObj<ButtonProps> = {
	args: {size: DENSITY_SIZE.X_SMALL}
}

export const Loading: StoryObj<ButtonProps> = {
	args: {
		labelText: 'Label',
		loading: true
	}
}

export default {
	argTypes: {onPress: {action: 'pressed'}},
	component: Button,
	title: 'components/Button'
} as Meta<typeof Button>
