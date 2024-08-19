import {Meta, StoryObj} from '@storybook/react'
import {Avatar} from './Avatar.component'
import {AvatarProps} from './Avatar.interface'

export const NoneContentText: StoryObj<AvatarProps> = {
    args: {}
}

export const ContentText: StoryObj<AvatarProps> = {
    args: {labelText: 'B'}
}

export default {
    component: Avatar,
    title: 'components/Avatar'
} as Meta<typeof Avatar>
