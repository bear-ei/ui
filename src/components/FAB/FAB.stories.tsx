import {Size} from '@bearei/material-token'
import {Meta, StoryObj} from '@storybook/react'
import {Icon} from '../Icon'
import {FAB as Fab} from './FAB.component'
import {FABType} from './FAB.enum'
import {FABProps} from './FAB.interface'

export const Primary: StoryObj<FABProps> = {
        args: {
                type: FABType.PRIMARY,
                icon: <Icon />
        }
}

export const Secondary: StoryObj<FABProps> = {
        args: {
                type: FABType.SECONDARY,
                icon: <Icon />
        }
}

export const Surface: StoryObj<FABProps> = {
        args: {
                type: FABType.SURFACE,
                icon: <Icon />
        }
}

export const Tertiary: StoryObj<FABProps> = {
        args: {
                type: FABType.TERTIARY,
                icon: <Icon />
        }
}

export const TertiaryLabel: StoryObj<FABProps> = {
        args: {
                labelText: 'Label',
                type: FABType.TERTIARY,
                icon: <Icon />
        }
}

export const Large: StoryObj<FABProps> = {
        args: {
                icon: <Icon />,
                size: Size.LARGE,
                type: FABType.PRIMARY
        }
}

export const Small: StoryObj<FABProps> = {
        args: {
                icon: <Icon />,
                size: Size.SMALL,
                type: FABType.PRIMARY
        }
}

export const DensityScale: StoryObj<FABProps> = {
        args: {densityScale: -2}
}

export default {
        title: 'components/FAB',
        argTypes: {onPress: {action: 'pressed'}},
        component: Fab
} as Meta<typeof Fab>
