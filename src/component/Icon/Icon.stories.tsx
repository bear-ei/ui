import {Meta, StoryObj} from '@storybook/react'
import {Icon} from './Icon.component'
import {IconProps} from './Icon.interface'

export const Filled: StoryObj<IconProps> = {
    args: {
        iconStyle: 'outlined',
        type: 'filled'
    }
}

export const Outlined: StoryObj<IconProps> = {
    args: {
        iconStyle: 'outlined',
        type: 'outlined'
    }
}

export const Label: StoryObj<IconProps> = {
    args: {
        iconStyle: 'outlined',
        type: 'outlined',
        name: 'label'
    }
}

export const AddHome: StoryObj<IconProps> = {
    args: {
        iconStyle: 'outlined',
        type: 'outlined',
        name: 'addHome'
    }
}

export default {
    title: 'components/Icon',
    component: Icon
} as Meta<typeof Icon>
