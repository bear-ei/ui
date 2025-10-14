import {SIZE} from '@bearei/theme-token'
import MaterialIcons from '@react-native-vector-icons/material-design-icons'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {IconButton} from '../Icon-button'
import {TextInput} from './Text-input.component'
import type {TextInputProps} from './Text-input.interface'

export const Filled: StoryObj<TextInputProps> = {
        args: {}
}

export const Leading: StoryObj<TextInputProps> = {
        args: {
                supportingText: 'supportingText',
                leading: <MaterialIcons name='circle' />
        }
}

export const Trailing: StoryObj<TextInputProps> = {
        args: {
                supportingText: 'supportingText',
                trailing: <IconButton />
        }
}

export const Err: StoryObj<TextInputProps> = {
        args: {
                error: true,
                supportingText: 'supportingText'
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
