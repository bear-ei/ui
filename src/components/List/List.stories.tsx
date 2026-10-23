import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import {Circle} from 'lucide-react-native'

import type {ListProps} from './List.interface'

import {DENSITY_SIZE, RADIUS, SHAPE} from '../../theme'
import {IconButton} from '../Icon-button'
import {List} from './List.component'
import {LIST_SELECT_TYPE} from './List.enum'

export const Leading: StoryObj<ListProps> = {
	args: {
		activeKey: 'TitleA',
		data: [
			{
				headline: 'TitleA',
				indexKey: 'TitleA',
				leading: <Circle />
			},
			{
				headline: 'TitleB',
				indexKey: 'TitleB',
				leading: <Circle />
			},
			{
				headline: 'TitleC',
				indexKey: 'TitleC',
				leading: <Circle />
			},
			{
				headline: 'TitleD',
				indexKey: 'TitleD',
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
				indexKey: 'TitleA'
				// trailing: <IconButton />
			},
			{
				headline: 'TitleB',
				indexKey: 'TitleB',
				leading: <Circle />
			},
			{
				headline: 'TitleC',
				indexKey: 'TitleC',
				trailing: <IconButton />
			},
			{
				headline: 'TitleD',
				indexKey: 'TitleD',
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
				indexKey: 'TitleA',
				primaryButtonLabelText: 'Action',
				secondaryButtonLabelText: 'More'
			},
			{
				headline: 'TitleB',
				indexKey: 'TitleB'
			},
			{
				headline: 'TitleC',
				indexKey: 'TitleC'
			},
			{
				headline: 'TitleD',
				indexKey: 'TitleD'
			}
		],
		defaultActiveKey: 'TitleB',
		radius: RADIUS.MEDIUM,
		selectType: LIST_SELECT_TYPE.SINGLE,
		shape: SHAPE.ALL,
		size: DENSITY_SIZE.MEDIUM
	}
}

export const TrailingClose: StoryObj<ListProps> = {
	args: {
		activeKey: 'TitleA',
		closeTrailing: true,
		data: [
			{
				headline: 'TitleA',
				indexKey: 'TitleA'
			},
			{
				headline: 'TitleB',
				indexKey: 'TitleB'
			},
			{
				headline: 'TitleC',
				indexKey: 'TitleC'
			},
			{
				headline: 'TitleD',
				indexKey: 'TitleD'
			}
		],
		defaultActiveKey: 'TitleB',
		radius: RADIUS.MEDIUM,
		size: DENSITY_SIZE.MEDIUM,
		trailingTriggerOn: 'HOVER'
	}
}

export const ExtraLarge: StoryObj<ListProps> = {
	args: {
		activeKey: 'TitleA',
		closeTrailing: true,
		data: [
			{
				headline: 'TitleA',
				indexKey: 'TitleA'
			},
			{
				headline: 'TitleB',
				indexKey: 'TitleB'
			},
			{
				headline: 'TitleC',
				indexKey: 'TitleC'
			},
			{
				headline: 'TitleD',
				indexKey: 'TitleD'
			}
		],
		defaultActiveKey: 'TitleB',
		size: DENSITY_SIZE.X_LARGE
	}
}

export const Large: StoryObj<ListProps> = {
	args: {
		activeKey: 'TitleA',
		closeTrailing: true,
		data: [
			{
				headline: 'TitleA',
				indexKey: 'TitleA'
			},
			{
				headline: 'TitleB',
				indexKey: 'TitleB'
			},
			{
				headline: 'TitleC',
				indexKey: 'TitleC'
			},
			{
				headline: 'TitleD',
				indexKey: 'TitleD'
			}
		],
		defaultActiveKey: 'TitleB',
		size: DENSITY_SIZE.LARGE
	}
}

export const Medium: StoryObj<ListProps> = {
	args: {
		activeKey: 'TitleA',
		closeTrailing: true,
		data: [
			{
				headline: 'TitleA',
				indexKey: 'TitleA'
			},
			{
				headline: 'TitleB',
				indexKey: 'TitleB'
			},
			{
				headline: 'TitleC',
				indexKey: 'TitleC'
			},
			{
				headline: 'TitleD',
				indexKey: 'TitleD'
			}
		],
		defaultActiveKey: 'TitleB',
		size: DENSITY_SIZE.MEDIUM
	}
}

export const Small: StoryObj<ListProps> = {
	args: {
		activeKey: 'TitleA',
		closeTrailing: true,
		data: [
			{
				headline: 'TitleA',
				indexKey: 'TitleA'
			},
			{
				headline: 'TitleB',
				indexKey: 'TitleB'
			},
			{
				headline: 'TitleC',
				indexKey: 'TitleC'
			},
			{
				headline: 'TitleD',
				indexKey: 'TitleD'
			}
		],
		defaultActiveKey: 'TitleB',
		size: DENSITY_SIZE.SMALL
	}
}

export const ExtraSmall: StoryObj<ListProps> = {
	args: {
		activeKey: 'TitleA',
		closeTrailing: true,
		data: [
			{
				headline: 'TitleA',
				indexKey: 'TitleA'
			},
			{
				headline: 'TitleB',
				indexKey: 'TitleB'
			},
			{
				headline: 'TitleC',
				indexKey: 'TitleC'
			},
			{
				headline: 'TitleD',
				indexKey: 'TitleD'
			}
		],
		defaultActiveKey: 'TitleB',
		size: DENSITY_SIZE.X_SMALL
	}
}

export const Multiple: StoryObj<ListProps> = {
	args: {
		activeKeys: ['TitleA', 'TitleB'],
		closeTrailing: true,
		data: [
			{
				headline: 'TitleA',
				indexKey: 'TitleA'
			},
			{
				headline: 'TitleB',
				indexKey: 'TitleB'
			},
			{
				headline: 'TitleC',
				indexKey: 'TitleC'
			},
			{
				headline: 'TitleD',
				indexKey: 'TitleD'
			}
		],
		selectType: LIST_SELECT_TYPE.MULTIPLE
	}
}

export const Deselect: StoryObj<ListProps> = {
	args: {
		activeKey: 'TitleA',
		data: [
			{
				headline: 'TitleA',
				indexKey: 'TitleA'
			},
			{
				headline: 'TitleB',
				indexKey: 'TitleB'
			},
			{
				headline: 'TitleC',
				indexKey: 'TitleC'
			},
			{
				headline: 'TitleD',
				indexKey: 'TitleD'
			}
		],
		deselect: true
	}
}

export default {
	component: List,
	title: 'components/List'
} as Meta<typeof List>
