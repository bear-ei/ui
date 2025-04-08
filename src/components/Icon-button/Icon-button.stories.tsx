import {Meta, StoryObj} from '@storybook/react'
import {IconButton} from './Icon-button.component'
import {IconButtonType} from './Icon-button.enum'
import {IconButtonProps} from './Icon-button.interface'

export const Filled: StoryObj<IconButtonProps> = {
        args: {loading: true}
}

export const Outlined: StoryObj<IconButtonProps> = {
        args: {
                type: IconButtonType.OUTLINED
        }
}

export const Standard: StoryObj<IconButtonProps> = {
        args: {
                type: IconButtonType.STANDARD,
                loading: true
        }
}

export const Tonal: StoryObj<IconButtonProps> = {
        args: {
                type: IconButtonType.TONAL
        }
}

export const Active: StoryObj<IconButtonProps> = {
        args: {
                type: IconButtonType.ACTIVE
        }
}

export default {
        title: 'components/IconButton',
        argTypes: {onPress: {action: 'pressed'}},
        component: IconButton
} as Meta<typeof IconButton>
