import {SIZE} from '@bearei/element-token'
import type {Meta, StoryObj} from '@storybook/react'
import {DENSITY} from '../Common'
import {Icon} from '../Icon'
import {Fab} from './FAB.component'
import {FAB_TYPE} from './FAB.enum'
import type {FABProps} from './FAB.interface'

export const Primary: StoryObj<FABProps> = {
	args: {
		type: FAB_TYPE.PRIMARY,
		icon: <Icon />
	}
}

export const Secondary: StoryObj<FABProps> = {
	args: {
		type: FAB_TYPE.SECONDARY,
		icon: <Icon />
	}
}

export const Surface: StoryObj<FABProps> = {
	args: {
		type: FAB_TYPE.SURFACE,
		icon: <Icon />
	}
}

export const Tertiary: StoryObj<FABProps> = {
	args: {
		type: FAB_TYPE.TERTIARY,
		icon: <Icon />
	}
}

export const Label: StoryObj<FABProps> = {
	args: {
		labelText: 'Label',
		type: FAB_TYPE.TERTIARY,
		icon: <Icon />
	}
}

export const Large: StoryObj<FABProps> = {
	args: {
		icon: <Icon />,
		size: SIZE.LARGE,
		type: FAB_TYPE.PRIMARY
	}
}

export const Small: StoryObj<FABProps> = {
	args: {
		icon: <Icon />,
		size: SIZE.SMALL,
		type: FAB_TYPE.PRIMARY
	}
}

export const DensityScale: StoryObj<FABProps> = {
	args: {density: DENSITY.COMPACT, icon: <Icon />, size: SIZE.SMALL}
}

export default {
	title: 'components/FAB',
	argTypes: {onPress: {action: 'pressed'}},
	component: Fab
} as Meta<typeof Fab>
