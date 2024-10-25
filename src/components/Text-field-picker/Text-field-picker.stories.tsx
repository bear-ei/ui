import {Meta, StoryObj} from '@storybook/react'
import {TextFieldPicker} from './Text-field-picker.component'
import {TextFieldPickerProps} from './Text-field-picker.interface'

export const SelectTextField: StoryObj<TextFieldPickerProps> = {
        args: {
                labelText: 'name',
                supportingText: 'supportingText',
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

export const MultiselectTextField: StoryObj<TextFieldPickerProps> = {
        args: {
                labelText: 'name',
                multiple: true,
                supportingText: 'supportingText',
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
                        },
                        {
                                indexKey: 'TitleE',
                                headline: 'TitleE'
                        },
                        {
                                indexKey: 'TitleF',
                                headline: 'TitleF'
                        },
                        {
                                indexKey: 'TitleG',
                                headline: 'TitleG'
                        },
                        {
                                indexKey: 'TitleH',
                                headline: 'TitleH'
                        }
                ]
        }
}

export default {
        title: 'components/TextFieldPicker',
        component: TextFieldPicker
} as Meta<typeof TextFieldPicker>
