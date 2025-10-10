import {SIZE} from '@bearei/theme-token'
import type {Meta, StoryObj} from '@storybook/react'
import {Checkbox} from './Checkbox.component'
import type {CheckboxProps} from './Checkbox.interface'

export const Selected: StoryObj<CheckboxProps> = {
        args: {active: true, indeterminate: false}
}

export const Indeterminate: StoryObj<CheckboxProps> = {
        args: {indeterminate: true}
}

export const Err: StoryObj<CheckboxProps> = {
        args: {error: true}
}

export const Disabled: StoryObj<CheckboxProps> = {
        args: {disabled: true}
}

export const ExtraLarge: StoryObj<CheckboxProps> = {
        args: {size: SIZE.EXTRA_LARGE}
}

export const Large: StoryObj<CheckboxProps> = {
        args: {size: SIZE.LARGE}
}

export const Medium: StoryObj<CheckboxProps> = {
        args: {size: SIZE.MEDIUM}
}

export const Small: StoryObj<CheckboxProps> = {
        args: {size: SIZE.SMALL}
}

export const ExtraSmall: StoryObj<CheckboxProps> = {
        args: {size: SIZE.EXTRA_SMALL}
}

export default {
        title: 'components/Checkbox',
        argTypes: {onActive: {action: 'active'}},
        component: Checkbox
} as Meta<typeof Checkbox>
