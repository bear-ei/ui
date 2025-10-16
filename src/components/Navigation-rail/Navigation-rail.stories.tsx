import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Circle} from 'lucide-react-native'
import {Fab} from '../FAB'
import {ICON_BUTTON_TYPE, IconButton} from '../Icon-button'
import {NavigationRail} from './Navigation-rail.component'
import {NAVIGATION_DESTINATION_POSITION, NAVIGATION_RAIL_ANIMATED, NAVIGATION_RAIL_TYPE} from './Navigation-rail.enum'
import type {NavigationRailProps} from './Navigation-rail.interface'

export const Standard: StoryObj<NavigationRailProps> = {
        args: {
                defaultActiveKey: 'A',
                menu: (
                        <IconButton
                                icon={<Circle />}
                                type={ICON_BUTTON_TYPE.STANDARD}
                        />
                ),
                fab: <Fab icon={<Circle />} />,
                animatedType: NAVIGATION_RAIL_ANIMATED.COLLAPSE,
                data: [
                        {
                                labelText: 'Bookmark',
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

export const Block: StoryObj<NavigationRailProps> = {
        args: {
                defaultActiveKey: 'name',
                fab: <Fab icon={<Circle />} />,
                type: NAVIGATION_RAIL_TYPE.BLOCK,
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

export const Top: StoryObj<NavigationRailProps> = {
        args: {
                defaultActiveKey: 'A',
                destinationPosition: NAVIGATION_DESTINATION_POSITION.TOP,
                menu: (
                        <IconButton
                                icon={<Circle />}
                                type={ICON_BUTTON_TYPE.STANDARD}
                        />
                ),
                fab: <Fab icon={<Circle />} />,
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

export const Center: StoryObj<NavigationRailProps> = {
        args: {
                defaultActiveKey: 'A',
                destinationPosition: NAVIGATION_DESTINATION_POSITION.CENTER,
                menu: (
                        <IconButton
                                icon={<Circle />}
                                type={ICON_BUTTON_TYPE.STANDARD}
                        />
                ),
                fab: <Fab icon={<Circle />} />,
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

export const Bottom: StoryObj<NavigationRailProps> = {
        args: {
                defaultActiveKey: 'A',
                destinationPosition: NAVIGATION_DESTINATION_POSITION.BOTTOM,
                menu: (
                        <IconButton
                                icon={<Circle />}
                                type={ICON_BUTTON_TYPE.STANDARD}
                        />
                ),
                fab: <Fab icon={<Circle />} />,
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
