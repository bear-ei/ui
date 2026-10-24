import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import {Circle} from 'lucide-react-native'

import type {ListProps} from './List.interface'

import {DENSITY_SIZE, RADIUS, SHAPE} from '../../theme'
import {IconButton} from '../Icon-button'
import {List} from './List.component'
import {LIST_SELECTION_TYPE} from './List.enum'

export const Leading: StoryObj<ListProps> = {
	args: {
		activeKey: 'TitleA',
		data: [
			{
				headline: 'TitleA',
				itemKey: 'TitleA',
				leading: <Circle />
			},
			{
				headline: 'TitleB',
				itemKey: 'TitleB',
				leading: <Circle />
			},
			{
				headline: 'TitleC',
				itemKey: 'TitleC',
				leading: <Circle />
			},
			{
				headline: 'TitleD',
				itemKey: 'TitleD',
				leading: <Circle />
			}
		],
		defaultActiveKey: 'TitleB',
		radius: RADIUS.MEDIUM
	}
}

export const Trailing: StoryObj<ListProps> = {
	args: {
		activeKey: 'TitleA',
		data: [
			{
				headline: 'TitleA',
				itemKey: 'TitleA'
				// trailing: <IconButton />
			},
			{
				headline: 'TitleB',
				itemKey: 'TitleB',
				leading: <Circle />
			},
			{
				headline: 'TitleC',
				itemKey: 'TitleC',
				trailing: <IconButton />
			},
			{
				headline: 'TitleD',
				itemKey: 'TitleD',
				trailing: <IconButton />
			}
		],
		defaultActiveKey: 'TitleB',
		radius: RADIUS.MEDIUM,
		size: DENSITY_SIZE.LARGE
	}
}

export const AfterAffordance: StoryObj<ListProps> = {
	args: {
		activeKey: 'TitleA',
		afterAffordance: true,
		data: [
			{
				headline: 'TitleA',
				itemKey: 'TitleA',
				primaryButtonLabelText: 'Action',
				secondaryButtonLabelText: 'More'
			},
			{
				headline: 'TitleB',
				itemKey: 'TitleB'
			},
			{
				headline: 'TitleC',
				itemKey: 'TitleC'
			},
			{
				headline: 'TitleD',
				itemKey: 'TitleD'
			}
		],
		defaultActiveKey: 'TitleB',
		radius: RADIUS.MEDIUM,
		selectionType: LIST_SELECTION_TYPE.SINGLE,
		shape: SHAPE.ALL,
		size: DENSITY_SIZE.MEDIUM
	}
}

export const TrailingClose: StoryObj<ListProps> = {
	args: {
		activeKey: 'TitleA',
		data: [
			{
				headline: 'TitleA',
				itemKey: 'TitleA'
			},
			{
				headline: 'TitleB',
				itemKey: 'TitleB'
			},
			{
				headline: 'TitleC',
				itemKey: 'TitleC'
			},
			{
				headline: 'TitleD',
				itemKey: 'TitleD'
			}
		],
		defaultActiveKey: 'TitleB',
		enableTrailingClose: true,
		radius: RADIUS.MEDIUM,
		size: DENSITY_SIZE.MEDIUM,
		trailingTriggerOn: 'HOVER'
	}
}

export const ExtraLarge: StoryObj<ListProps> = {
	args: {
		activeKey: 'TitleA',
		data: [
			{
				headline: 'TitleA',
				itemKey: 'TitleA'
			},
			{
				headline: 'TitleB',
				itemKey: 'TitleB'
			},
			{
				headline: 'TitleC',
				itemKey: 'TitleC'
			},
			{
				headline: 'TitleD',
				itemKey: 'TitleD'
			}
		],
		defaultActiveKey: 'TitleB',
		enableTrailingClose: true,
		size: DENSITY_SIZE.X_LARGE
	}
}

export const Large: StoryObj<ListProps> = {
	args: {
		activeKey: 'TitleA',
		data: [
			{
				headline: 'TitleA',
				itemKey: 'TitleA'
			},
			{
				headline: 'TitleB',
				itemKey: 'TitleB'
			},
			{
				headline: 'TitleC',
				itemKey: 'TitleC'
			},
			{
				headline: 'TitleD',
				itemKey: 'TitleD'
			}
		],
		defaultActiveKey: 'TitleB',
		enableTrailingClose: true,
		size: DENSITY_SIZE.LARGE
	}
}

export const Medium: StoryObj<ListProps> = {
	args: {
		activeKey: 'TitleA',
		data: [
			{
				headline: 'TitleA',
				itemKey: 'TitleA'
			},
			{
				headline: 'TitleB',
				itemKey: 'TitleB'
			},
			{
				headline: 'TitleC',
				itemKey: 'TitleC'
			},
			{
				headline: 'TitleD',
				itemKey: 'TitleD'
			}
		],
		defaultActiveKey: 'TitleB',
		enableTrailingClose: true,
		size: DENSITY_SIZE.MEDIUM
	}
}

export const Small: StoryObj<ListProps> = {
	args: {
		activeKey: 'TitleA',
		data: [
			{
				headline: 'TitleA',
				itemKey: 'TitleA'
			},
			{
				headline: 'TitleB',
				itemKey: 'TitleB'
			},
			{
				headline: 'TitleC',
				itemKey: 'TitleC'
			},
			{
				headline: 'TitleD',
				itemKey: 'TitleD'
			}
		],
		defaultActiveKey: 'TitleB',
		enableTrailingClose: true,
		size: DENSITY_SIZE.SMALL
	}
}

export const ExtraSmall: StoryObj<ListProps> = {
	args: {
		activeKey: 'TitleA',
		data: [
			{
				headline: 'TitleA',
				itemKey: 'TitleA'
			},
			{
				headline: 'TitleB',
				itemKey: 'TitleB'
			},
			{
				headline: 'TitleC',
				itemKey: 'TitleC'
			},
			{
				headline: 'TitleD',
				itemKey: 'TitleD'
			}
		],
		defaultActiveKey: 'TitleB',
		enableTrailingClose: true,
		size: DENSITY_SIZE.X_SMALL
	}
}

export const Multiple: StoryObj<ListProps> = {
	args: {
		activeKeys: ['TitleA', 'TitleB'],
		data: [
			{
				headline: 'TitleA',
				itemKey: 'TitleA'
			},
			{
				headline: 'TitleB',
				itemKey: 'TitleB'
			},
			{
				headline: 'TitleC',
				itemKey: 'TitleC'
			},
			{
				headline: 'TitleD',
				itemKey: 'TitleD'
			}
		],
		enableTrailingClose: true,
		selectionType: LIST_SELECTION_TYPE.MULTIPLE
	}
}

export const Deselect: StoryObj<ListProps> = {
	args: {
		activeKey: 'TitleA',
		data: [
			{
				headline: 'TitleA',
				itemKey: 'TitleA'
			},
			{
				headline: 'TitleB',
				itemKey: 'TitleB'
			},
			{
				headline: 'TitleC',
				itemKey: 'TitleC'
			},
			{
				headline: 'TitleD',
				itemKey: 'TitleD'
			}
		],
		deselectable: true
	}
}

export default {
	component: List,
	title: 'components/List'
} as Meta<typeof List>
