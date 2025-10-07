import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
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
                icon: <MaterialCommunityIcons name='circle' />,
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
                icon: <MaterialCommunityIcons name='circle' />,
                labelText: 'Label'
        }
}

export const Err: StoryObj<ButtonProps> = {
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
