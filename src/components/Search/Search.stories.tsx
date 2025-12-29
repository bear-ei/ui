import {TRIGGER_ON} from '@/constants'
import {SIZE} from '@bearei/theme-token'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Circle} from 'lucide-react-native'
import {IconButton} from '../Icon-button'
import {LIST_SELECT_TYPE} from '../List'
import {Search} from './Search.component'
import type {SearchProps} from './Search.interface'

export const Leading: StoryObj<SearchProps> = {
        args: {
                placeholder: 'Hinted search text',
                leading: <Circle />
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

export const MediumList: StoryObj<SearchProps> = {
        args: {
                listActiveKey: 'TitleB',
                listCloseTrailing: true,
                listSelectType: LIST_SELECT_TYPE.SINGLE,
                listTrailingTriggerOn: TRIGGER_ON.HOVER,
                placeholder: 'Hinted search text',
                size: SIZE.MEDIUM,
                filter: true,
                data: [
                        {
                                headline: 'TitleA',
                                indexKey: 'TitleA',
                                leading: <Circle />,
                                supporting: 'TitleA'
                        },
                        {
                                headline: 'TitleB',
                                indexKey: 'TitleB',
                                leading: <Circle />,
                                supporting: 'TitleB'
                        },
                        {
                                headline: 'TitleC',
                                indexKey: 'TitleC',
                                leading: <Circle />,
                                supporting: 'TitleC'
                        },
                        {
                                headline: 'TitleD',
                                indexKey: 'TitleD',
                                leading: <Circle />,
                                supporting: 'TitleD'
                        }
                ]
        }
}

export default {
        title: 'components/Search',
        component: Search
} as Meta<typeof Search>
