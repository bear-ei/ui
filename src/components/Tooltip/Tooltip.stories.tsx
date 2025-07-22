import type {Meta, StoryObj} from '@storybook/react'
import {Icon, ICON_NAME} from '../Icon'
import {ICON_BUTTON_TYPE, IconButton} from '../Icon-button'
import {SUPPORTING_POSITION} from './Tooltip-supporting'
import {Tooltip} from './Tooltip.component'
import type {TooltipProps} from './Tooltip.interface'

export const PlainVerticalEnd: StoryObj<TooltipProps> = {
	args: {
		children: (
			<IconButton
				icon={<Icon name={ICON_NAME.ADD_HOME} />}
				type={ICON_BUTTON_TYPE.STANDARD}
			/>
		),
		defaultVisible: true,
		supporting: 'Supporting Text',
		supportingPosition: SUPPORTING_POSITION.VERTICAL_END
	}
}

export const PlainVerticalStart: StoryObj<TooltipProps> = {
	args: {
		children: (
			<IconButton
				icon={<Icon name={ICON_NAME.ADD_HOME} />}
				type={ICON_BUTTON_TYPE.STANDARD}
			/>
		),
		supporting: 'Supporting Text',
		supportingPosition: SUPPORTING_POSITION.VERTICAL_START,
		visible: true
	}
}

export const PlainHorizontalStart: StoryObj<TooltipProps> = {
	args: {
		children: (
			<IconButton
				icon={<Icon name={ICON_NAME.ADD_HOME} />}
				type={ICON_BUTTON_TYPE.STANDARD}
			/>
		),
		supporting: 'Supporting Text',
		supportingPosition: SUPPORTING_POSITION.HORIZONTAL_START,
		visible: true
	}
}

export const PlainHorizontalEnd: StoryObj<TooltipProps> = {
	args: {
		children: (
			<IconButton
				icon={<Icon name={ICON_NAME.ADD_HOME} />}
				type={ICON_BUTTON_TYPE.STANDARD}
			/>
		),
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
