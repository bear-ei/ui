import {Meta, StoryObj} from '@storybook/react'
import {Icon} from '../Icon'
import {FAB as Fab} from './FAB.component'
import {FABProps} from './FAB.interface'

export const Primary: StoryObj<FABProps> = {
    args: {
        type: 'primary',
        icon: <Icon />
    }
}

export const Secondary: StoryObj<FABProps> = {
    args: {
        type: 'secondary',
        icon: <Icon />
    }
}

export const Surface: StoryObj<FABProps> = {
    args: {
        type: 'surface',
        icon: <Icon />
    }
}

export const Tertiary: StoryObj<FABProps> = {
    args: {
        type: 'tertiary',
        icon: <Icon />
    }
}

export const TertiaryLabel: StoryObj<FABProps> = {
    args: {
        labelText: 'Label',
        type: 'tertiary',
        icon: <Icon />
    }
}

export const Large: StoryObj<FABProps> = {
    args: {
        icon: <Icon />,
        size: 'large',
        type: 'primary'
    }
}

export const Small: StoryObj<FABProps> = {
    args: {
        icon: <Icon />,
        size: 'small',
        type: 'primary'
    }
}

export const DensityScale: StoryObj<FABProps> = {
    args: {
        icon: <Icon />,
        size: 'large',
        type: 'primary',
        densityScale: -4
    }
}

export default {
    title: 'components/FAB',
    argTypes: {onPress: {action: 'pressed'}},
    component: Fab
} as Meta<typeof Fab>
