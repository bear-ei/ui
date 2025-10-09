import {SHAPE, SIZE} from '@bearei/theme-token'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import type {Meta, StoryObj} from '@storybook/react'
import {List} from './List.component'
import type {ListProps} from './List.interface'

export const Leading: StoryObj<ListProps> = {
        args: {
                size: SIZE.MEDIUM,
                shape: SHAPE.MEDIUM,
                defaultActiveKey: 'TitleB',
                activeKey: 'TitleA',

                data: [
                        {
                                indexKey: 'TitleA',
                                headline: 'TitleA',
                                leading: (
                                        <MaterialCommunityIcons
                                                name='circle'
                                                size={24}
                                        />
                                )
                        },
                        {
                                indexKey: 'TitleB',
                                headline: 'TitleB',
                                leading: (
                                        <MaterialCommunityIcons
                                                name='circle'
                                                size={24}
                                        />
                                )
                        },
                        {
                                indexKey: 'TitleC',
                                headline: 'TitleC',
                                leading: (
                                        <MaterialCommunityIcons
                                                name='circle'
                                                size={24}
                                        />
                                )
                        },
                        {
                                indexKey: 'TitleD',
                                headline: 'TitleD',
                                leading: (
                                        <MaterialCommunityIcons
                                                name='circle'
                                                size={24}
                                        />
                                )
                        }
                ]
        }
}

export const Trailing: StoryObj<ListProps> = {
        args: {
                size: SIZE.MEDIUM,
                shape: SHAPE.MEDIUM,
                defaultActiveKey: 'TitleB',
                activeKey: 'TitleA',
                data: [
                        {
                                indexKey: 'TitleA',
                                headline: 'TitleA',
                                trailing: (
                                        <MaterialCommunityIcons
                                                name='circle'
                                                size={24}
                                        />
                                )
                        },
                        {
                                indexKey: 'TitleB',
                                headline: 'TitleB',
                                trailing: (
                                        <MaterialCommunityIcons
                                                name='circle'
                                                size={24}
                                        />
                                )
                        },
                        {
                                indexKey: 'TitleC',
                                headline: 'TitleC',
                                trailing: (
                                        <MaterialCommunityIcons
                                                name='circle'
                                                size={24}
                                        />
                                )
                        },
                        {
                                indexKey: 'TitleD',
                                headline: 'TitleD',
                                trailing: (
                                        <MaterialCommunityIcons
                                                name='circle'
                                                size={24}
                                        />
                                )
                        }
                ]
        }
}

export const AfterAffordance: StoryObj<ListProps> = {
        args: {
                size: SIZE.MEDIUM,
                shape: SHAPE.MEDIUM,
                defaultActiveKey: 'TitleB',
                activeKey: 'TitleA',
                afterAffordance: true,
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
                size: SIZE.MEDIUM,
                shape: SHAPE.MEDIUM,
                defaultActiveKey: 'TitleB',
                activeKey: 'TitleA',
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
                size: SIZE.LARGE,
                defaultActiveKey: 'TitleB',
                activeKey: 'TitleA',
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
                size: SIZE.SMALL,
                defaultActiveKey: 'TitleB',
                activeKey: 'TitleA',
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
