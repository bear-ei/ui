import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import type {AvatarProps} from './Avatar.interface'

import {DENSITY_SIZE} from '../../theme'
import {Avatar} from './Avatar.component'

export const NoneContentText: StoryObj<AvatarProps> = {
	args: {}
}

export const ContentText: StoryObj<AvatarProps> = {
	args: {initialsText: 'Bearei'}
}

export const Medium: StoryObj<AvatarProps> = {
	args: {size: DENSITY_SIZE.MEDIUM}
}

export const ExtraLarge: StoryObj<AvatarProps> = {
	args: {size: DENSITY_SIZE.X_LARGE}
}

export const Large: StoryObj<AvatarProps> = {
	args: {size: DENSITY_SIZE.LARGE}
}

export const Small: StoryObj<AvatarProps> = {
	args: {size: DENSITY_SIZE.SMALL}
}

export const ExtraSmall: StoryObj<AvatarProps> = {
	args: {size: DENSITY_SIZE.X_SMALL}
}

export default {
	component: Avatar,
	title: 'components/Avatar'
} as Meta<typeof Avatar>
