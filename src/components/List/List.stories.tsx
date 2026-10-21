import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Circle} from 'lucide-react-native'

import {DENSITY_SIZE, RADIUS, SHAPE} from '../../theme'
import {IconButton} from '../Icon-button'

import {List} from './List.component'
import {LIST_SELECT_TYPE} from './List.enum'
import type {ListProps} from './List.interface'

export const Leading: StoryObj<ListProps> = {
	args: {
		radius: RADIUS.MEDIUM,
		defaultActiveKey: 'TitleB',
		activeKey: 'TitleA',
		data: [
			{
				indexKey: 'TitleA',
				headline: 'TitleA',
				leading: <Circle />
			},
			{
				indexKey: 'TitleB',
				headline: 'TitleB',
				leading: <Circle />
			},
			{
				indexKey: 'TitleC',
				headline: 'TitleC',
				leading: <Circle />
			},
			{
				indexKey: 'TitleD',
				headline: 'TitleD',
				leading: <Circle />
			}
		]
	}
}

export const Trailing: StoryObj<ListProps> = {
	args: {
		radius: RADIUS.MEDIUM,
		size: DENSITY_SIZE.LARGE,
		defaultActiveKey: 'TitleB',
		activeKey: 'TitleA',
		data: [
			{
				indexKey: 'TitleA',
				headline: 'TitleA'
				// trailing: <IconButton />
			},
			{
				indexKey: 'TitleB',
				headline: 'TitleB',
				leading: <Circle />
			},
			{
				indexKey: 'TitleC',
				headline: 'TitleC',
				trailing: <IconButton />
			},
			{
				indexKey: 'TitleD',
				headline: 'TitleD',
				trailing: <IconButton />
			}
		]
	}
}

export const AfterAffordance: StoryObj<ListProps> = {
	args: {
		activeKey: 'TitleA',
		afterAffordance: true,
		defaultActiveKey: 'TitleB',
		selectType: LIST_SELECT_TYPE.SINGLE,
		shape: SHAPE.ALL,
		radius: RADIUS.MEDIUM,
		size: DENSITY_SIZE.MEDIUM,
		data: [
			{
				indexKey: 'TitleA',
				headline: 'TitleA',
				primaryButtonLabelText: 'Action',
				secondaryButtonLabelText: 'More'
			},
			{
				indexKey: 'TitleB',
				headline: 'TitleB'
			},
			{
				indexKey: 'TitleC',
				headline: 'TitleC'
			},
			{
				indexKey: 'TitleD',
				headline: 'TitleD'
			}
		]
	}
}

export const TrailingClose: StoryObj<ListProps> = {
	args: {
		activeKey: 'TitleA',
		closeTrailing: true,
		defaultActiveKey: 'TitleB',
		radius: RADIUS.MEDIUM,
		size: DENSITY_SIZE.MEDIUM,
		trailingTriggerOn: 'HOVER',
		data: [
			{
				indexKey: 'TitleA',
				headline: 'TitleA'
			},
			{
				indexKey: 'TitleB',
				headline: 'TitleB'
			},
			{
				indexKey: 'TitleC',
				headline: 'TitleC'
			},
			{
				indexKey: 'TitleD',
				headline: 'TitleD'
			}
		]
	}
}

export const ExtraLarge: StoryObj<ListProps> = {
	args: {
		size: DENSITY_SIZE.X_LARGE,
		defaultActiveKey: 'TitleB',
		activeKey: 'TitleA',
		closeTrailing: true,
		data: [
			{
				indexKey: 'TitleA',
				headline: 'TitleA'
			},
			{
				indexKey: 'TitleB',
				headline: 'TitleB'
			},
			{
				indexKey: 'TitleC',
				headline: 'TitleC'
			},
			{
				indexKey: 'TitleD',
				headline: 'TitleD'
			}
		]
	}
}

export const Large: StoryObj<ListProps> = {
	args: {
		size: DENSITY_SIZE.LARGE,
		defaultActiveKey: 'TitleB',
		activeKey: 'TitleA',
		closeTrailing: true,
		data: [
			{
				indexKey: 'TitleA',
				headline: 'TitleA'
			},
			{
				indexKey: 'TitleB',
				headline: 'TitleB'
			},
			{
				indexKey: 'TitleC',
				headline: 'TitleC'
			},
			{
				indexKey: 'TitleD',
				headline: 'TitleD'
			}
		]
	}
}

export const Medium: StoryObj<ListProps> = {
	args: {
		size: DENSITY_SIZE.MEDIUM,
		defaultActiveKey: 'TitleB',
		activeKey: 'TitleA',
		closeTrailing: true,
		data: [
			{
				indexKey: 'TitleA',
				headline: 'TitleA'
			},
			{
				indexKey: 'TitleB',
				headline: 'TitleB'
			},
			{
				indexKey: 'TitleC',
				headline: 'TitleC'
			},
			{
				indexKey: 'TitleD',
				headline: 'TitleD'
			}
		]
	}
}

export const Small: StoryObj<ListProps> = {
	args: {
		size: DENSITY_SIZE.SMALL,
		defaultActiveKey: 'TitleB',
		activeKey: 'TitleA',
		closeTrailing: true,
		data: [
			{
				indexKey: 'TitleA',
				headline: 'TitleA'
			},
			{
				indexKey: 'TitleB',
				headline: 'TitleB'
			},
			{
				indexKey: 'TitleC',
				headline: 'TitleC'
			},
			{
				indexKey: 'TitleD',
				headline: 'TitleD'
			}
		]
	}
}

export const ExtraSmall: StoryObj<ListProps> = {
	args: {
		size: DENSITY_SIZE.X_SMALL,
		defaultActiveKey: 'TitleB',
		activeKey: 'TitleA',
		closeTrailing: true,
		data: [
			{
				indexKey: 'TitleA',
				headline: 'TitleA'
			},
			{
				indexKey: 'TitleB',
				headline: 'TitleB'
			},
			{
				indexKey: 'TitleC',
				headline: 'TitleC'
			},
			{
				indexKey: 'TitleD',
				headline: 'TitleD'
			}
		]
	}
}

export default {
	title: 'components/List',
	component: List
} as Meta<typeof List>
