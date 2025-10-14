import {SIZE} from '@bearei/theme-token'
import MaterialIcons from '@react-native-vector-icons/material-icons'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Fab} from './FAB.component'
import {FAB_TYPE} from './FAB.enum'
import type {FABProps} from './FAB.interface'

export const Primary: StoryObj<FABProps> = {
        args: {
                type: FAB_TYPE.PRIMARY,
                icon: <MaterialIcons name='circle' />
        }
}

export const Secondary: StoryObj<FABProps> = {
        args: {
                type: FAB_TYPE.SECONDARY,
                icon: <MaterialIcons name='circle' />
        }
}

export const Surface: StoryObj<FABProps> = {
        args: {
                type: FAB_TYPE.SURFACE,
                icon: <MaterialIcons name='circle' />
        }
}

export const Tertiary: StoryObj<FABProps> = {
        args: {
                type: FAB_TYPE.TERTIARY,
                icon: <MaterialIcons name='circle' />
        }
}

export const Extended: StoryObj<FABProps> = {
        args: {
                labelText: 'Label',
                type: FAB_TYPE.TERTIARY,
                icon: <MaterialIcons name='circle' />
        }
}

export const ExtraLarge: StoryObj<FABProps> = {
        args: {size: SIZE.EXTRA_LARGE, icon: <MaterialIcons name='circle' />}
}

export const Large: StoryObj<FABProps> = {
        args: {size: SIZE.LARGE, icon: <MaterialIcons name='circle' />}
}

export const Medium: StoryObj<FABProps> = {
        args: {size: SIZE.MEDIUM, icon: <MaterialIcons name='circle' />}
}

export const Small: StoryObj<FABProps> = {
        args: {size: SIZE.SMALL, icon: <MaterialIcons name='circle' />}
}

export const ExtraSmall: StoryObj<FABProps> = {
        args: {size: SIZE.EXTRA_SMALL, icon: <MaterialIcons name='circle' />}
}

export default {
        title: 'components/FAB',
        argTypes: {onPress: {action: 'pressed'}},
        component: Fab
} as Meta<typeof Fab>
