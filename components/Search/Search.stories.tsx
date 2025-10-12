import {SIZE} from '@bearei/theme-token'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import type {Meta, StoryObj} from '@storybook/react'
import {IconButton} from '../Icon-button'
import {Search} from './Search.component'
import type {SearchProps} from './Search.interface'

export const Leading: StoryObj<SearchProps> = {
        args: {
                placeholder: 'Hinted search text',
                leading: <MaterialIcons name='circle' />
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
                size: SIZE.EXTRA_LARGE
        }
}

export const Large: StoryObj<SearchProps> = {
        args: {
                placeholder: 'Hinted search text',
                size: SIZE.LARGE
        }
}

export const Medium: StoryObj<SearchProps> = {
        args: {
                placeholder: 'Hinted search text',
                size: SIZE.MEDIUM
        }
}

export const Small: StoryObj<SearchProps> = {
        args: {
                placeholder: 'Hinted search text',
                size: SIZE.SMALL
        }
}

export const ExtraSmall: StoryObj<SearchProps> = {
        args: {
                placeholder: 'Hinted search text',
                size: SIZE.EXTRA_SMALL
        }
}

export default {
        title: 'components/Search',
        component: Search
} as Meta<typeof Search>
