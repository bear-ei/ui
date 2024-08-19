import {Meta, StoryObj} from '@storybook/react'
import React from 'react'
import {FAB} from '../FAB'
import {Icon} from '../Icon'
import {IconButton} from '../Icon-button'
import {NavigationRail} from './Navigation-rail.component'
import {NavigationRailProps} from './Navigation-rail.interface'

export const Rail: StoryObj<NavigationRailProps> = {
    args: {
        defaultActiveKey: 'A',
        menu: (
            <IconButton
                icon={<Icon name='menu' />}
                type='standard'
            />
        ),
        fab: <FAB icon={<Icon />} />,
        data: [
            {
                labelText: 'Label1',
                indexKey: 'A'
            },
            {
                labelText: 'Label2',
                indexKey: 'B'
            },
            {
                labelText: 'Label3',
                indexKey: 'C'
            }
        ]
    }
}

export const BlockRail: StoryObj<NavigationRailProps> = {
    args: {
        defaultActiveKey: 'name',
        fab: <FAB icon={<Icon />} />,
        type: 'block',
        data: [
            {
                labelText: 'Label1',
                indexKey: 'name'
            },
            {
                labelText: 'Label2',
                indexKey: 'age'
            },
            {
                labelText: 'Label3',
                indexKey: 'sex'
            }
        ]
    }
}

export const TopRail: StoryObj<NavigationRailProps> = {
    args: {
        defaultActiveKey: 'A',
        destinationPosition: 'top',
        menu: (
            <IconButton
                icon={<Icon name='menu' />}
                type='standard'
            />
        ),
        fab: <FAB icon={<Icon />} />,
        data: [
            {
                labelText: 'Label1',
                indexKey: 'A'
            },
            {
                labelText: 'Label2',
                indexKey: 'B'
            },
            {
                labelText: 'Label3',
                indexKey: 'C'
            }
        ]
    }
}

export const MiddleRail: StoryObj<NavigationRailProps> = {
    args: {
        defaultActiveKey: 'A',
        destinationPosition: 'middle',
        menu: (
            <IconButton
                icon={<Icon name='menu' />}
                type='standard'
            />
        ),
        fab: <FAB icon={<Icon />} />,
        data: [
            {
                labelText: 'Label1',
                indexKey: 'A'
            },
            {
                labelText: 'Label2',
                indexKey: 'B'
            },
            {
                labelText: 'Label3',
                indexKey: 'C'
            }
        ]
    }
}

export const BottomRail: StoryObj<NavigationRailProps> = {
    args: {
        defaultActiveKey: 'A',
        destinationPosition: 'bottom',
        menu: (
            <IconButton
                icon={<Icon name='menu' />}
                type='standard'
            />
        ),
        fab: <FAB icon={<Icon />} />,
        data: [
            {
                labelText: 'Label1',
                indexKey: 'A'
            },
            {
                labelText: 'Label2',
                indexKey: 'B'
            },
            {
                labelText: 'Label3',
                indexKey: 'C'
            }
        ]
    }
}

export default {
    title: 'components/NavigationRail',
    component: NavigationRail
} as Meta<typeof NavigationRail>
