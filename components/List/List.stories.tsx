import {SHAPE, SIZE} from '@bearei/theme-token'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
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
                                        <MaterialIcons
                                                name='circle'
                                                size={24}
                                        />
                                )
                        },
                        {
                                indexKey: 'TitleB',
                                headline: 'TitleB',
                                leading: (
                                        <MaterialIcons
                                                name='circle'
                                                size={24}
                                        />
                                )
                        },
                        {
                                indexKey: 'TitleC',
                                headline: 'TitleC',
                                leading: (
                                        <MaterialIcons
                                                name='circle'
                                                size={24}
                                        />
                                )
                        },
                        {
                                indexKey: 'TitleD',
                                headline: 'TitleD',
                                leading: (
                                        <MaterialIcons
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
                                        <MaterialIcons
                                                name='circle'
                                                size={24}
                                        />
                                )
                        },
                        {
                                indexKey: 'TitleB',
                                headline: 'TitleB',
                                trailing: (
                                        <MaterialIcons
                                                name='circle'
                                                size={24}
                                        />
                                )
                        },
                        {
                                indexKey: 'TitleC',
                                headline: 'TitleC',
                                trailing: (
                                        <MaterialIcons
                                                name='circle'
                                                size={24}
                                        />
                                )
                        },
                        {
                                indexKey: 'TitleD',
                                headline: 'TitleD',
                                trailing: (
                                        <MaterialIcons
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

export const TrailingClose: StoryObj<ListProps> = {
        args: {
                activeKey: 'TitleA',
                closeTrailing: true,
                defaultActiveKey: 'TitleB',
                shape: SHAPE.MEDIUM,
                size: SIZE.MEDIUM,
                trailingTriggerEvent: 'HOVER',
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
