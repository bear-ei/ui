import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {IconButton} from './Icon-button.component'
import {ICON_BUTTON_TYPE} from './Icon-button.enum'
import type {IconButtonProps} from './Icon-button.interface'
import {DENSITY_SIZE} from '../../theme'
import {Download} from 'lucide-react-native'

export const Filled: StoryObj<IconButtonProps> = {
	args: {
		type: ICON_BUTTON_TYPE.FILLED
	}
}

export const Outlined: StoryObj<IconButtonProps> = {
	args: {
		type: ICON_BUTTON_TYPE.OUTLINED
	}
}

export const Standard: StoryObj<IconButtonProps> = {
	args: {
		type: ICON_BUTTON_TYPE.STANDARD
	}
}

export const Tonal: StoryObj<IconButtonProps> = {
	args: {
		type: ICON_BUTTON_TYPE.TONAL
	}
}

export const Active: StoryObj<IconButtonProps> = {
	args: {
		type: ICON_BUTTON_TYPE.ACTIVE
	}
}

export const Loading: StoryObj<IconButtonProps> = {
	args: {
		loading: true,
		icon: <Download />
	}
}

export const ExtraLarge: StoryObj<IconButtonProps> = {
	args: {size: DENSITY_SIZE.X_LARGE}
}

export const Large: StoryObj<IconButtonProps> = {
	args: {size: DENSITY_SIZE.LARGE}
}

export const Medium: StoryObj<IconButtonProps> = {
	args: {size: DENSITY_SIZE.MEDIUM}
}

export const Small: StoryObj<IconButtonProps> = {
	args: {size: DENSITY_SIZE.SMALL}
}

export const ExtraSmall: StoryObj<IconButtonProps> = {
	args: {size: DENSITY_SIZE.X_SMALL}
}

export default {
	title: 'components/IconButton',
	argTypes: {onPress: {action: 'pressed'}},
	component: IconButton
} as Meta<typeof IconButton>
