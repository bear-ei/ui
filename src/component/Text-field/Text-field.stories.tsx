import {Meta, StoryObj} from '@storybook/react'
import React from 'react'
import {Icon} from '../Icon'
import {TextField} from './Text-field.component'
import {TextFieldProps} from './Text-field.interface'

export const Filled: StoryObj<TextFieldProps> = {
    args: {
        labelText: 'name',
        supportingText: 'supportingText'
    }
}

export const IconTextField: StoryObj<TextFieldProps> = {
    args: {
        labelText: 'name',
        supportingText: 'supportingText',
        leading: <Icon />
    }
}

export default {
    title: 'components/TextField',
    component: TextField
} as Meta<typeof TextField>
