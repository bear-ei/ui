import {Meta, StoryObj} from '@storybook/react'
import {Icon} from '../Icon'
import {TextFieldPicker} from './Text-field-picker.component'
import {TextFieldPickerProps} from './Text-field-picker.interface'

export const IconTextField: StoryObj<TextFieldPickerProps> = {
    args: {
        labelText: 'name',
        supportingText: 'supportingText',
        leading: <Icon />,
        data: [
            {
                indexKey: 'TitleA',
                headline: 'TitleA'
            },
            {
                indexKey: 'TitleB',
                headline: 'TitleB'
            },
            {
                indexKey: 'TitleC',
                headline: 'TitleC'
            },
            {
                indexKey: 'TitleD',
                headline: 'TitleD'
            }
        ]
    }
}

export default {
    title: 'components/TextFieldPicker',
    component: TextFieldPicker
} as Meta<typeof TextFieldPicker>
