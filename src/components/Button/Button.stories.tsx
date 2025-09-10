import type {Meta, StoryObj} from '@storybook/react'
import {Icon as EIIcon, ICON_TYPE} from '../Icon'
import {Button} from './Button.component'
import {BUTTON_TYPE} from './Button.enum'
import type {ButtonProps} from './Button.interface'

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
		icon: <EIIcon type={ICON_TYPE.FILLED} />,
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
		labelText: 'Label',
		type: BUTTON_TYPE.LINK
	}
}

export const Icon: StoryObj<ButtonProps> = {
	args: {
		icon: <EIIcon />,
		labelText: 'Label'
	}
}

export const Err: StoryObj<ButtonProps> = {
	args: {
		labelText: 'Label',
		error: true
	}
}

export const DensityScale: StoryObj<ButtonProps> = {
	args: {density: -2}
}

export default {
	title: 'components/Button',
	argTypes: {onPress: {action: 'pressed'}},
	component: Button
} as Meta<typeof Button>
