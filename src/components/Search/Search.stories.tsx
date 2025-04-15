import {Meta, StoryObj} from '@storybook/react'
import {IconButton} from '../Icon-button'
import {Search} from './Search.component'
import {SearchProps} from './Search.interface'

export const Standard: StoryObj<SearchProps> = {
	args: {
		placeholder: 'Hinted search text',
		trailing: <IconButton type={IconBUTTON_TYPE.STANDARD} />,
		listProps: {
			data: [
				{
					indexKey: 'TitleA',
					headline: 'TitleA'
				},
				{
					indexKey: 'TitleB',
					headline: 'TitleB',
					supporting: 'Supporting line text lorem ipsum dolor sit amet, consectetur.'
				},
				{
					indexKey: 'TitleC',
					headline: 'TitleC',
					supporting: 'Supporting line text lorem ipsum dolor sit amet, consectetur.'
				},
				{
					indexKey: 'TitleD',
					headline: 'TitleD',
					supporting: 'Supporting line text lorem ipsum dolor sit amet, consectetur.'
				},
				{
					indexKey: 'TitleE',
					headline: 'TitleE',
					supporting: 'Supporting line text lorem ipsum dolor sit amet, consectetur.'
				}
			]
		}
	}
}

export const DensityScale: StoryObj<SearchProps> = {
	args: {
		placeholder: 'Hinted search text',
		trailing: <IconButton type={IconBUTTON_TYPE.STANDARD} />,
		density: Density.COMPACT,
		listProps: {
			data: [
				{
					indexKey: 'TitleA',
					headline: 'TitleA'
				},
				{
					indexKey: 'TitleB',
					headline: 'TitleB',
					supporting: 'Supporting line text lorem ipsum dolor sit amet, consectetur.'
				},
				{
					indexKey: 'TitleC',
					headline: 'TitleC',
					supporting: 'Supporting line text lorem ipsum dolor sit amet, consectetur.'
				},
				{
					indexKey: 'TitleD',
					headline: 'TitleD',
					supporting: 'Supporting line text lorem ipsum dolor sit amet, consectetur.'
				},
				{
					indexKey: 'TitleE',
					headline: 'TitleE',
					supporting: 'Supporting line text lorem ipsum dolor sit amet, consectetur.'
				}
			]
		}
	}
}

export default {
	title: 'components/Search',
	component: Search
} as Meta<typeof Search>
