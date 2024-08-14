import {Meta, StoryObj} from '@storybook/react'
import React from 'react'
import {IconButton} from '../Icon-button'
import {Search} from './Search'
import {SearchProps} from './Search.interface'

export const SearchBar: StoryObj<SearchProps> = {
    args: {
        placeholder: 'Hinted search text',
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

export const SearchBarStandard: StoryObj<SearchProps> = {
    args: {
        placeholder: 'Hinted search text',
        trailing: <IconButton type='standard' />,
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

export const SearchBarDensityScale: StoryObj<SearchProps> = {
    args: {
        densityScale: -5,
        placeholder: 'Hinted search text'
    }
}

export default {
    title: 'components/Search',
    component: Search
} as Meta<typeof Search>
