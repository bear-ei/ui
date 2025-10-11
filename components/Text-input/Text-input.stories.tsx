import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import type {Meta, StoryObj} from '@storybook/react'
import {TextInput} from './Text-input.component'
import type {TextInputProps} from './Text-input.interface'

export const Filled: StoryObj<TextInputProps> = {
        args: {
                labelText: 'Name',
                supportingText: 'supportingText',
                filled: true
        }
}

export const IconTextInput: StoryObj<TextInputProps> = {
        args: {
                labelText: 'Name',
                supportingText: 'supportingText',
                leading: (
                        <MaterialIcons
                                name='circle'
                                size={24}
                        />
                )
        }
}

export default {
        title: 'components/TextInput',
        component: TextInput
} as Meta<typeof TextInput>
