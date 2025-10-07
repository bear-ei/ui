import {LAYOUT} from '@/constants'
import {SIZE} from '@bearei/theme-token'
import type {Meta, StoryObj} from '@storybook/react'
import {Divider} from './Divider.component'
import type {DividerProps} from './Divider.interface'

export const Horizontal: StoryObj<DividerProps> = {
        args: {size: SIZE.LARGE}
}

export const Subheader: StoryObj<DividerProps> = {
        args: {layoutType: LAYOUT.HORIZONTAL, subheader: 'Subheader'}
}

export const Vertical: StoryObj<DividerProps> = {
        args: {size: SIZE.LARGE, layoutType: LAYOUT.VERTICAL}
}

export default {
        title: 'components/Divider',
        component: Divider
} as Meta<typeof Divider>
