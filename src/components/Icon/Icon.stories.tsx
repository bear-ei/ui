import {Meta, StoryObj} from '@storybook/react'
import {Icon} from './Icon.component'
import {IconName, IconStyle, IconType} from './Icon.enum'
import {IconProps} from './Icon.interface'

export const Filled: StoryObj<IconProps> = {
        args: {
                iconStyle: IconStyle.ROUNDED,
                type: IconType.FILLED
        }
}

export const Outlined: StoryObj<IconProps> = {
        args: {
                iconStyle: IconStyle.ROUNDED,
                type: IconType.OUTLINED
        }
}

export const Home: StoryObj<IconProps> = {
        args: {
                iconStyle: IconStyle.ROUNDED,
                type: IconType.OUTLINED,
                name: IconName.HOME
        }
}

export default {
        title: 'components/Icon',
        component: Icon
} as Meta<typeof Icon>
