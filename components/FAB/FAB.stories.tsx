import {SIZE} from '@bearei/theme-token'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import type {Meta, StoryObj} from '@storybook/react'
import {Fab} from './FAB.component'
import {FAB_TYPE} from './FAB.enum'
import type {FABProps} from './FAB.interface'

export const Primary: StoryObj<FABProps> = {
        args: {
                type: FAB_TYPE.PRIMARY,
                icon: <MaterialCommunityIcons name='circle' />
        }
}

export const Secondary: StoryObj<FABProps> = {
        args: {
                type: FAB_TYPE.SECONDARY,
                icon: <MaterialCommunityIcons name='circle' />
        }
}

export const Surface: StoryObj<FABProps> = {
        args: {
                type: FAB_TYPE.SURFACE,
                icon: <MaterialCommunityIcons name='circle' />
        }
}

export const Tertiary: StoryObj<FABProps> = {
        args: {
                type: FAB_TYPE.TERTIARY,
                icon: <MaterialCommunityIcons name='circle' />
        }
}

export const Extended: StoryObj<FABProps> = {
        args: {
                labelText: 'Label',
                type: FAB_TYPE.TERTIARY,
                icon: <MaterialCommunityIcons name='circle' />
        }
}

export const Medium: StoryObj<FABProps> = {
        args: {size: SIZE.MEDIUM, icon: <MaterialCommunityIcons name='circle' />}
}

export const Large: StoryObj<FABProps> = {
        args: {size: SIZE.LARGE, icon: <MaterialCommunityIcons name='circle' />}
}

export const Small: StoryObj<FABProps> = {
        args: {size: SIZE.SMALL, icon: <MaterialCommunityIcons name='circle' />}
}

export default {
        title: 'components/FAB',
        argTypes: {onPress: {action: 'pressed'}},
        component: Fab
} as Meta<typeof Fab>
