import {Meta, StoryObj} from '@storybook/react'
import {FAB} from '../FAB'
import {Icon, IconName} from '../Icon'
import {IconButton, IconButtonType} from '../Icon-button'
import {NavigationRail} from './Navigation-rail.component'
import {DestinationPosition, NavigationRailAnimatedType, NavigationRailType} from './Navigation-rail.enum'
import {NavigationRailProps} from './Navigation-rail.interface'

export const Standard: StoryObj<NavigationRailProps> = {
        args: {
                defaultActiveKey: 'A',
                menu: (
                        <IconButton
                                icon={<Icon name={IconName.MENU} />}
                                type={IconButtonType.STANDARD}
                        />
                ),
                fab: <FAB icon={<Icon name={IconName.MENU} />} />,
                animatedType: NavigationRailAnimatedType.COLLAPSE,

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

export const Block: StoryObj<NavigationRailProps> = {
        args: {
                defaultActiveKey: 'name',
                fab: <FAB icon={<Icon />} />,
                type: NavigationRailType.BLOCK,
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
                destinationPosition: DestinationPosition.TOP,
                menu: (
                        <IconButton
                                icon={<Icon name={IconName.MENU} />}
                                type={IconButtonType.STANDARD}
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

export const Center: StoryObj<NavigationRailProps> = {
        args: {
                defaultActiveKey: 'A',
                destinationPosition: DestinationPosition.CENTER,
                menu: (
                        <IconButton
                                icon={<Icon name={IconName.MENU} />}
                                type={IconButtonType.STANDARD}
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

export const Bottom: StoryObj<NavigationRailProps> = {
        args: {
                defaultActiveKey: 'A',
                destinationPosition: DestinationPosition.BOTTOM,
                menu: (
                        <IconButton
                                icon={<Icon name={IconName.MENU} />}
                                type={IconButtonType.STANDARD}
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
