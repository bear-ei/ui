import {Meta, StoryObj} from '@storybook/react'
import {Icon as EIIcon} from '../Icon'
import {Button} from './Button.component'
import {ButtonProps, ButtonType} from './Button.interface'

export const Filled: StoryObj<ButtonProps> = {
        args: {
                labelText: 'Label'
        }
}

export const Outlined: StoryObj<ButtonProps> = {
        args: {
                labelText: 'Label',
                type: ButtonType.OUTLINED
        }
}

export const Text: StoryObj<ButtonProps> = {
        args: {
                labelText: 'Label',
                type: ButtonType.TEXT
        }
}

export const TextIcon: StoryObj<ButtonProps> = {
        args: {
                icon: (
                        <EIIcon
                                type='filled'
                                iconStyle='rounded'
                        />
                ),
                labelText: 'Label',
                type: ButtonType.TEXT
        }
}

export const Tonal: StoryObj<ButtonProps> = {
        args: {
                labelText: 'Label',
                type: ButtonType.TONAL
        }
}

export const Elevated: StoryObj<ButtonProps> = {
        args: {
                labelText: 'Label',
                type: ButtonType.ELEVATED
        }
}

export const Link: StoryObj<ButtonProps> = {
        args: {
                labelText: 'Label',
                type: ButtonType.LINK
        }
}

export const Icon: StoryObj<ButtonProps> = {
        args: {
                icon: <EIIcon />,
                labelText: 'Label'
        }
}

export const Error: StoryObj<ButtonProps> = {
        args: {
                labelText: 'Label',
                error: true
        }
}

export default {
        title: 'components/Button',
        argTypes: {onPress: {action: 'pressed'}},
        component: Button
} as Meta<typeof Button>
