import {Meta, StoryObj} from '@storybook/react'
import {IconButton} from './Icon-button'
import {IconButtonProps} from './Icon-button.interface'

export const Filled: StoryObj<IconButtonProps> = {
    args: {}
}

export const Outlined: StoryObj<IconButtonProps> = {
    args: {
        type: 'outlined'
    }
}

export const Standard: StoryObj<IconButtonProps> = {
    args: {
        type: 'standard'
    }
}

export const Tonal: StoryObj<IconButtonProps> = {
    args: {
        type: 'tonal'
    }
}

export const Active: StoryObj<IconButtonProps> = {
    args: {
        type: 'active'
    }
}

export default {
    title: 'components/IconButton',
    argTypes: {onPress: {action: 'pressed'}},
    component: IconButton
} as Meta<typeof IconButton>
