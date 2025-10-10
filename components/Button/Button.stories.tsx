import {SIZE} from '@bearei/theme-token'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import type {Meta, StoryObj} from '@storybook/react'
import {Button} from './Button.component'
import {BUTTON_TYPE} from './Button.enum'
import type {ButtonProps} from './Button.interface'

export const Filled: StoryObj<ButtonProps> = {
        args: {
                labelText: 'Label'
        }
}

export const Outlined: StoryObj<ButtonProps> = {
        args: {
                labelText: 'Label',
                type: BUTTON_TYPE.OUTLINED
        }
}

export const Text: StoryObj<ButtonProps> = {
        args: {
                labelText: 'Label',
                type: BUTTON_TYPE.TEXT
        }
}

export const TextIcon: StoryObj<ButtonProps> = {
        args: {
                icon: <MaterialIcons name='circle' />,
                labelText: 'Label',
                type: BUTTON_TYPE.TEXT
        }
}

export const Tonal: StoryObj<ButtonProps> = {
        args: {
                labelText: 'Label',
                type: BUTTON_TYPE.TONAL
        }
}

export const Elevated: StoryObj<ButtonProps> = {
        args: {
                labelText: 'Label',
                type: BUTTON_TYPE.ELEVATED
        }
}

export const Link: StoryObj<ButtonProps> = {
        args: {
                labelText: 'Label',
                type: BUTTON_TYPE.LINK
        }
}

export const Icon: StoryObj<ButtonProps> = {
        args: {
                icon: <MaterialIcons name='circle' />,
                labelText: 'Label'
        }
}

export const Err: StoryObj<ButtonProps> = {
        args: {
                labelText: 'Label',
                error: true
        }
}

export const Medium: StoryObj<ButtonProps> = {
        args: {size: SIZE.MEDIUM}
}

export const Large: StoryObj<ButtonProps> = {
        args: {size: SIZE.LARGE}
}

export const Small: StoryObj<ButtonProps> = {
        args: {size: SIZE.SMALL}
}

export default {
        title: 'components/Button',
        argTypes: {onPress: {action: 'pressed'}},
        component: Button
} as Meta<typeof Button>
