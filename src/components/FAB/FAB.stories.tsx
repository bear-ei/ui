import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import {Circle} from 'lucide-react-native'

import type {FABProps} from './FAB.interface'

import {DENSITY_SIZE} from '../../theme'
import {FAB} from './FAB.component'
import {FAB_TYPE} from './FAB.enum'

export const Primary: StoryObj<FABProps> = {
	args: {
		icon: <Circle />,
		type: FAB_TYPE.PRIMARY
	}
}

export const Secondary: StoryObj<FABProps> = {
	args: {
		icon: <Circle />,
		type: FAB_TYPE.SECONDARY
	}
}

export const Surface: StoryObj<FABProps> = {
	args: {
		icon: <Circle />,
		type: FAB_TYPE.SURFACE
	}
}

export const Tertiary: StoryObj<FABProps> = {
	args: {
		icon: <Circle />,
		type: FAB_TYPE.TERTIARY
	}
}

export const Extended: StoryObj<FABProps> = {
	args: {
		icon: <Circle />,
		labelText: 'Label',
		type: FAB_TYPE.TERTIARY
	}
}

export const ExtraLarge: StoryObj<FABProps> = {
	args: {icon: <Circle />, size: DENSITY_SIZE.X_LARGE}
}

export const Large: StoryObj<FABProps> = {
	args: {icon: <Circle />, size: DENSITY_SIZE.LARGE}
}

export const Medium: StoryObj<FABProps> = {
	args: {icon: <Circle />, size: DENSITY_SIZE.MEDIUM}
}

export const Small: StoryObj<FABProps> = {
	args: {icon: <Circle />, size: DENSITY_SIZE.SMALL}
}

export const ExtraSmall: StoryObj<FABProps> = {
	args: {icon: <Circle />, size: DENSITY_SIZE.X_SMALL}
}

export const ElevatedFalse: StoryObj<FABProps> = {
	args: {
		elevated: false,
		icon: <Circle />
	}
}

export const Disabled: StoryObj<FABProps> = {
	args: {
		disabled: true,
		icon: <Circle />
	}
}

export default {
	argTypes: {onPress: {action: 'pressed'}},
	component: FAB,
	title: 'components/FAB'
} as Meta<typeof FAB>
