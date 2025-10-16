import {SHAPE, SIZE} from '@bearei/theme-token'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Circle} from 'lucide-react-native'
import {IconButton} from '../Icon-button'
import {List} from './List.component'
import type {ListProps} from './List.interface'

export const Leading: StoryObj<ListProps> = {
        args: {
                shape: SHAPE.MEDIUM,
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
                shape: SHAPE.MEDIUM,
                defaultActiveKey: 'TitleB',
                activeKey: 'TitleA',
                data: [
                        {
                                indexKey: 'TitleA',
                                headline: 'TitleA',
                                trailing: <IconButton />
                        },
                        {
                                indexKey: 'TitleB',
                                headline: 'TitleB',
                                trailing: <IconButton />
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

export const ExtraLarge: StoryObj<ListProps> = {
        args: {
                size: SIZE.EXTRA_LARGE,
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
                size: SIZE.LARGE,
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
                size: SIZE.MEDIUM,
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
                size: SIZE.SMALL,
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
                size: SIZE.EXTRA_SMALL,
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
