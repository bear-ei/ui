import {Meta, StoryObj} from '@storybook/react'
import React from 'react'
import {Icon as EIIcon} from '../Icon'
import {Button} from './Button'
import {ButtonProps} from './Button.interface'

export const Filled: StoryObj<ButtonProps> = {
    args: {
        labelText: 'Label'
    }
}

export const Outlined: StoryObj<ButtonProps> = {
    args: {
        labelText: 'Label',
        type: 'outlined'
    }
}

export const Text: StoryObj<ButtonProps> = {
    args: {
        labelText: 'Label',
        type: 'text'
    }
}

export const TextIcon: StoryObj<ButtonProps> = {
    args: {
        icon: (
            <EIIcon
                type='filled'
                iconStyle='outlined'
            />
        ),
        labelText: 'Label',
        type: 'text'
    }
}

export const Tonal: StoryObj<ButtonProps> = {
    args: {
        labelText: 'Label',
        type: 'tonal'
    }
}

export const Elevated: StoryObj<ButtonProps> = {
    args: {
        labelText: 'Label',
        type: 'elevated'
    }
}

export const Link: StoryObj<ButtonProps> = {
    args: {
        labelText: 'Label',
        type: 'link'
    }
}

export const Icon: StoryObj<ButtonProps> = {
    args: {
        icon: <EIIcon />,
        labelText: 'Label'
    }
}

export const DensityScale: StoryObj<ButtonProps> = {
    args: {
        labelText: 'Label',
        densityScale: -2
    }
}

export const Block: StoryObj<ButtonProps> = {
    args: {
        labelText: 'Label',
        horizontalStretch: true
    }
}

export default {
    title: 'components/Button',
    argTypes: {onPress: {action: 'pressed'}},
    component: Button
} as Meta<typeof Button>
