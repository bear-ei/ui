import {Meta, StoryObj} from '@storybook/react'
import {NavigationDrawer} from './Navigation-drawer.component'
import {NavigationDrawerProps} from './Navigation-drawer.interface'

export const Drawer: StoryObj<NavigationDrawerProps> = {
        args: {
                defaultActiveKey: 'A',
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
        title: 'components/NavigationDrawer',
        component: NavigationDrawer
} as Meta<typeof NavigationDrawer>
