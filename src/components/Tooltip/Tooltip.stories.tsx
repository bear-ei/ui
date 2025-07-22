import type {Meta, StoryObj} from '@storybook/react'
import {Icon, ICON_NAME} from '../Icon'
import {SUPPORTING_POSITION} from './Tooltip-supporting'
import {Tooltip} from './Tooltip.component'
import type {TooltipProps} from './Tooltip.interface'

export const PlainVerticalEnd: StoryObj<TooltipProps> = {
	args: {
		children: <Icon name={ICON_NAME.ADD_HOME} />,
		defaultVisible: true,
		supporting: 'Supporting Text',
		supportingPosition: SUPPORTING_POSITION.VERTICAL_END
	}
}

export const PlainVerticalStart: StoryObj<TooltipProps> = {
	args: {
		children: <Icon name={ICON_NAME.ADD_HOME} />,
		supporting: 'Supporting Text',
		supportingPosition: SUPPORTING_POSITION.VERTICAL_START,
		visible: true
	}
}

export const PlainHorizontalStart: StoryObj<TooltipProps> = {
	args: {
		children: <Icon name={ICON_NAME.ADD_HOME} />,
		supporting: 'Supporting Text',
		supportingPosition: SUPPORTING_POSITION.HORIZONTAL_START,
		visible: true
	}
}

export const PlainHorizontalEnd: StoryObj<TooltipProps> = {
	args: {
		children: <Icon name={ICON_NAME.ADD_HOME} />,
		supporting: 'Supporting Text',
		supportingPosition: SUPPORTING_POSITION.HORIZONTAL_END,
		visible: true
	}
}

export default {
	title: 'components/Tooltip',
	argTypes: {onPress: {action: 'pressed'}},
	component: Tooltip
} as Meta<typeof Tooltip>
