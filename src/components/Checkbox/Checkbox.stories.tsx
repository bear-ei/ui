import {Meta, StoryObj} from '@storybook/react'
import {Checkbox} from './Checkbox.component'
import {CheckboxProps} from './Checkbox.interface'

export const Selected: StoryObj<CheckboxProps> = {
        args: {
                active: true
        }
}

export const Indeterminate: StoryObj<CheckboxProps> = {
        args: {indeterminate: true}
}

export const Err: StoryObj<CheckboxProps> = {
        args: {error: true}
}

export const DensityScale: StoryObj<CheckboxProps> = {
        args: {densityScale: -2}
}

export default {
        title: 'components/Checkbox',
        argTypes: {onActive: {action: 'active'}},
        component: Checkbox
} as Meta<typeof Checkbox>
