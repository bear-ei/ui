import {Meta, StoryObj} from '@storybook/react'
import {Icon} from '../Icon'
import {Tooltip} from './Tooltip.component'
import {TooltipProps} from './Tooltip.interface'

export const PlainVerticalEnd: StoryObj<TooltipProps> = {
        args: {
                children: <Icon name='addHome' />,
                supportingPosition: 'verticalEnd',
                supporting: 'Supporting Text',
                defaultVisible: true
        }
}

export const PlainVerticalStart: StoryObj<TooltipProps> = {
        args: {
                children: <Icon name='addHome' />,
                supportingPosition: 'verticalStart',
                supporting: 'Supporting Text',
                visible: true
        }
}

export const PlainHorizontalStart: StoryObj<TooltipProps> = {
        args: {
                children: <Icon name='addHome' />,
                supportingPosition: 'horizontalStart',
                supporting: 'Supporting Text',
                visible: true
        }
}

export const PlainHorizontalEnd: StoryObj<TooltipProps> = {
        args: {
                children: <Icon name='addHome' />,
                supportingPosition: 'horizontalEnd',
                supporting: 'Supporting Text',
                visible: true
        }
}

export default {
        title: 'components/Tooltip',
        argTypes: {onPress: {action: 'pressed'}},
        component: Tooltip
} as Meta<typeof Tooltip>
