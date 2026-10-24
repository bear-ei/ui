import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import {Circle} from 'lucide-react-native'

import type {SearchProps} from './Search.interface'

import {TRIGGER_ON} from '../../constants'
import {DENSITY_SIZE} from '../../theme'
import {IconButton} from '../Icon-button'
import {LIST_SELECTION_TYPE} from '../List'
import {Search} from './Search.component'

export const Leading: StoryObj<SearchProps> = {
	args: {
		leading: <Circle />,
		placeholder: 'Hinted search text'
	}
}

export const Trailing: StoryObj<SearchProps> = {
	args: {
		placeholder: 'Hinted search text',
		trailing: <IconButton />
	}
}

export const ExtraLarge: StoryObj<SearchProps> = {
	args: {
		placeholder: 'Hinted search text',
		size: DENSITY_SIZE.X_LARGE
	}
}

export const Large: StoryObj<SearchProps> = {
	args: {
		placeholder: 'Hinted search text',
		size: DENSITY_SIZE.LARGE
	}
}

export const Medium: StoryObj<SearchProps> = {
	args: {
		placeholder: 'Hinted search text',
		size: DENSITY_SIZE.MEDIUM
	}
}

export const Small: StoryObj<SearchProps> = {
	args: {
		placeholder: 'Hinted search text',
		size: DENSITY_SIZE.SMALL
	}
}

export const ExtraSmall: StoryObj<SearchProps> = {
	args: {
		placeholder: 'Hinted search text',
		size: DENSITY_SIZE.X_SMALL
	}
}

export const SearchList: StoryObj<SearchProps> = {
	args: {
		activeKey: 'TitleB',
		data: [
			{
				headline: 'TitleA',
				itemKey: 'TitleA',
				leading: <Circle />
				// supporting: 'www.bilibili.com'
			},
			{
				headline: 'TitleB',
				itemKey: 'TitleB',
				leading: <Circle />
				// supporting: 'www.baidu.com'
			},
			{
				headline: 'TitleC',
				itemKey: 'TitleC',
				leading: <Circle />
				// supporting: 'www.github.com'
			},
			{
				headline: 'TitleD',
				itemKey: 'TitleD',
				leading: <Circle />
				// supporting: 'www.xiaohongshu.com'
			}
		],
		enableLocalFilter: true,
		enableTrailingClose: true,
		placeholder: 'Hinted search text',
		selectionType: LIST_SELECTION_TYPE.SINGLE,
		size: DENSITY_SIZE.LARGE,
		trailingTriggerOn: TRIGGER_ON.HOVER
	}
}

export default {
	component: Search,
	title: 'components/Search'
} as Meta<typeof Search>
