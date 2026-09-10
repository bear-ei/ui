import {SIZE} from '@bearei/theme-token'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Circle} from 'lucide-react-native'
import {Fab} from './FAB.component'
import {FAB_TYPE} from './FAB.enum'
import type {FABProps} from './FAB.interface'

export const Primary: StoryObj<FABProps> = {
	args: {
		type: FAB_TYPE.PRIMARY,
		icon: <Circle />
	}
}

export const Secondary: StoryObj<FABProps> = {
	args: {
		type: FAB_TYPE.SECONDARY,
		icon: <Circle />
	}
}

export const Surface: StoryObj<FABProps> = {
	args: {
		type: FAB_TYPE.SURFACE,
		icon: <Circle />
	}
}

export const Tertiary: StoryObj<FABProps> = {
	args: {
		type: FAB_TYPE.TERTIARY,
		icon: <Circle />
	}
}

export const Extended: StoryObj<FABProps> = {
	args: {
		labelText: 'Label',
		type: FAB_TYPE.TERTIARY,
		icon: <Circle />
	}
}

export const ExtraLarge: StoryObj<FABProps> = {
	args: {size: SIZE.EXTRA_LARGE, icon: <Circle />}
}

export const Large: StoryObj<FABProps> = {
	args: {size: SIZE.LARGE, icon: <Circle />}
}

export const Medium: StoryObj<FABProps> = {
	args: {size: SIZE.MEDIUM, icon: <Circle />}
}

export const Small: StoryObj<FABProps> = {
	args: {size: SIZE.SMALL, icon: <Circle />}
}

export const ExtraSmall: StoryObj<FABProps> = {
	args: {size: SIZE.EXTRA_SMALL, icon: <Circle />}
}

export default {
	title: 'components/FAB',
	argTypes: {onPress: {action: 'pressed'}},
	component: Fab
} as Meta<typeof Fab>
