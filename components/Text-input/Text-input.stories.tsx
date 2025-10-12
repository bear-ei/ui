import {SIZE} from '@bearei/theme-token'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import type {Meta, StoryObj} from '@storybook/react'
import {TextInput} from './Text-input.component'
import type {TextInputProps} from './Text-input.interface'

export const Filled: StoryObj<TextInputProps> = {
        args: {
                supportingText: 'supportingText',
                filled: true
        }
}

export const IconTextInput: StoryObj<TextInputProps> = {
        args: {
                supportingText: 'supportingText',
                leading: (
                        <MaterialIcons
                                name='circle'
                                size={24}
                        />
                )
        }
}

export const ExtraLarge: StoryObj<TextInputProps> = {
        args: {
                size: SIZE.EXTRA_LARGE
        }
}

export const LARGE: StoryObj<TextInputProps> = {
        args: {
                size: SIZE.LARGE
        }
}

export const MEDIUM: StoryObj<TextInputProps> = {
        args: {
                size: SIZE.MEDIUM
        }
}

export const SMALL: StoryObj<TextInputProps> = {
        args: {
                size: SIZE.SMALL
        }
}

export const EXTRA_SMALL: StoryObj<TextInputProps> = {
        args: {
                size: SIZE.EXTRA_SMALL
        }
}

export default {
        title: 'components/TextInput',
        component: TextInput
} as Meta<typeof TextInput>
