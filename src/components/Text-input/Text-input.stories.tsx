import {Meta, StoryObj} from '@storybook/react'
import {Density} from '../Common'
import {Icon} from '../Icon'
import {TextInput} from './Text-input.component'
import {TextInputProps} from './Text-input.interface'

export const Filled: StoryObj<TextInputProps> = {
        args: {
                labelText: 'name',
                supportingText: 'supportingText'
        }
}

export const IconTextInput: StoryObj<TextInputProps> = {
        args: {
                labelText: 'name',
                supportingText: 'supportingText',
                leading: <Icon />
        }
}

export const DensityScale: StoryObj<TextInputProps> = {
        args: {
                labelText: 'name',
                supportingText: 'supportingText',
                density: Density.COMPACT
        }
}

export default {
        title: 'components/TextInput',
        component: TextInput
} as Meta<typeof TextInput>
