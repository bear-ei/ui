import {Size} from '@bearei/material-token'
import {Meta, StoryObj} from '@storybook/react'
import {Layout} from '../Common'
import {Divider} from './Divider.component'
import {DividerProps} from './Divider.interface'

export const Horizontal: StoryObj<DividerProps> = {
        args: {size: Size.LARGE}
}

export const Subheader: StoryObj<DividerProps> = {
        args: {layout: Layout.HORIZONTAL, subheader: 'Subheader'}
}

export const Vertical: StoryObj<DividerProps> = {
        args: {size: Size.LARGE, layout: Layout.VERTICAL}
}

export default {
        title: 'components/Divider',
        component: Divider
} as Meta<typeof Divider>
