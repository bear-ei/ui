import Chat from '@material-symbols/svg-400/outlined/chat.svg'
import type {Meta, StoryObj} from '@storybook/react'
import {DENSITY} from '../Common'
import {Avatar} from './Avatar.component'
import type {AvatarProps} from './Avatar.interface'

export const NoneContentText: StoryObj<AvatarProps> = {
	args: {}
}

export const ContentText: StoryObj<AvatarProps> = {
	args: {labelText: 'Bearei'}
}

export const ContentSVG: StoryObj<AvatarProps> = {
	args: {svgElement: <Chat />}
}

export const DensityScale: StoryObj<AvatarProps> = {
	args: {density: DENSITY.COMPACT}
}

export default {
	component: Avatar,
	title: 'components/Avatar'
} as Meta<typeof Avatar>
