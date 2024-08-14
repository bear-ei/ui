import {Meta, StoryObj} from '@storybook/react'
import {Checkbox} from './Checkbox'
import {CheckboxProps} from './Checkbox.interface'

export const CheckboxSelected: StoryObj<CheckboxProps> = {
    args: {
        active: true,
        onActive: () => {
            console.info('99999')
        }
    }
}

export const CheckboxIndeterminate: StoryObj<CheckboxProps> = {
    args: {indeterminate: true}
}

export const CheckboxError: StoryObj<CheckboxProps> = {
    args: {error: true}
}

export const DensityScale: StoryObj<CheckboxProps> = {
    args: {error: true, densityScale: -2}
}

export default {
    title: 'components/Checkbox',
    argTypes: {onActive: {action: 'active'}},
    component: Checkbox
} as Meta<typeof Checkbox>
