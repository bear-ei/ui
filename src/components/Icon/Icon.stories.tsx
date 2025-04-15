import type {Meta, StoryObj} from '@storybook/react'
import {Icon} from './Icon.component'
import {ICON_NAME, ICON_STYLE, ICON_TYPE} from './Icon.enum'
import type {IconProps} from './Icon.interface'

export const Filled: StoryObj<IconProps> = {
	args: {
		iconStyle: ICON_STYLE.ROUNDED,
		type: ICON_TYPE.FILLED
	}
}

export const Outlined: StoryObj<IconProps> = {
	args: {
		iconStyle: ICON_STYLE.ROUNDED,
		type: ICON_TYPE.OUTLINED
	}
}

export const Home: StoryObj<IconProps> = {
	args: {
		iconStyle: ICON_STYLE.ROUNDED,
		type: ICON_TYPE.OUTLINED,
		name: ICON_NAME.HOME
	}
}

export default {
	title: 'components/Icon',
	component: Icon
} as Meta<typeof Icon>
