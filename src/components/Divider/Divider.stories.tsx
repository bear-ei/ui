import {Meta, StoryObj} from '@storybook/react'
import {Divider} from './Divider.component'
import {DividerProps} from './Divider.interface'

export const DividerHorizontal: StoryObj<DividerProps> = {
        args: {size: 'large'}
}

export const DividerSubheader: StoryObj<DividerProps> = {
        args: {layout: 'horizontal', subheader: 'Subheader'}
}

export const DividerVertical: StoryObj<DividerProps> = {
        args: {size: 'large', layout: 'vertical'}
}

export default {
        title: 'components/Divider',
        component: Divider
} as Meta<typeof Divider>
