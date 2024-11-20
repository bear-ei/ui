import {Meta, StoryObj} from '@storybook/react'
import {Avatar} from '../Avatar'
import {Icon} from '../Icon'
import {Chip} from './Chip.component'
import {ChipProps} from './Chip.interface'

export const Input: StoryObj<ChipProps> = {
        args: {
                labelText: 'Label',
                type: 'input'
        }
}

export const InputLeadingIcon: StoryObj<ChipProps> = {
        args: {
                labelText: 'Label',
                leadingIcon: (
                        <Icon
                                type='outlined'
                                iconStyle='rounded'
                                name='cottage'
                        />
                ),
                type: 'input'
        }
}

export const InputLeadingAvatar: StoryObj<ChipProps> = {
        args: {
                active: true,
                avatar: <Avatar />,
                labelText: 'Label',
                type: 'input'
        }
}

export const Assist: StoryObj<ChipProps> = {
        args: {
                close: true,
                labelText: 'Label',
                type: 'assist'
        }
}

export const AssistElevated: StoryObj<ChipProps> = {
        args: {
                elevated: true,
                labelText: 'Label',
                type: 'assist'
        }
}

export const Filter: StoryObj<ChipProps> = {
        args: {
                labelText: 'Label',
                type: 'filter'
        }
}

export const FilterActive: StoryObj<ChipProps> = {
        args: {
                labelText: 'Label',
                type: 'filter',
                active: true
        }
}

export const FilterElevated: StoryObj<ChipProps> = {
        args: {
                labelText: 'Label',
                type: 'filter',
                elevated: true
        }
}

export const Suggestion: StoryObj<ChipProps> = {
        args: {
                labelText: 'Label',
                type: 'suggestion'
        }
}

export default {
        title: 'components/Chip',
        argTypes: {onPress: {action: 'pressed'}},
        component: Chip
} as Meta<typeof Chip>
