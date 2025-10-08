import {SIZE} from '@bearei/theme-token'
import type {Meta, StoryObj} from '@storybook/react'
import {Avatar} from './Avatar.component'
import {AvatarProps} from './Avatar.interface'

export const NoneContentText: StoryObj<AvatarProps> = {
        args: {}
}

export const ContentText: StoryObj<AvatarProps> = {
        args: {labelText: 'Bearei'}
}

export const Medium: StoryObj<AvatarProps> = {
        args: {size: SIZE.MEDIUM}
}

export const Large: StoryObj<AvatarProps> = {
        args: {size: SIZE.LARGE}
}

export const Small: StoryObj<AvatarProps> = {
        args: {size: SIZE.SMALL}
}

export default {
        component: Avatar,
        title: 'components/Avatar'
} as Meta<typeof Avatar>
