import {Meta, StoryObj} from '@storybook/react'
import {TextInputPicker} from './Text-input-picker.component'
import {TextInputPickerProps} from './Text-input-picker.interface'

export const SelectTextInput: StoryObj<TextInputPickerProps> = {
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

export const MultiselectTextInput: StoryObj<TextInputPickerProps> = {
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
        title: 'components/TextInputPicker',
        component: TextInputPicker
} as Meta<typeof TextInputPicker>
