import {Meta, StoryObj} from '@storybook/react'
import {Checkbox} from './Checkbox.component'
import {CheckboxProps} from './Checkbox.interface'

export const CheckboxSelected: StoryObj<CheckboxProps> = {
    args: {
        active: true
    }
}

export const CheckboxIndeterminate: StoryObj<CheckboxProps> = {
    args: {indeterminate: true}
}

export const CheckboxError: StoryObj<CheckboxProps> = {
    args: {error: true}
}

export default {
    title: 'components/Checkbox',
    argTypes: {onActive: {action: 'active'}},
    component: Checkbox
} as Meta<typeof Checkbox>
