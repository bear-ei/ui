import type {Meta, StoryObj} from '@storybook/react'
import {IconButton} from './Icon-button.component'
import {ICON_BUTTON_TYPE} from './Icon-button.enum'
import type {IconButtonProps} from './Icon-button.interface'

export const Filled: StoryObj<IconButtonProps> = {
        args: {
                type: ICON_BUTTON_TYPE.FILLED
        }
}

export const Outlined: StoryObj<IconButtonProps> = {
        args: {
                type: ICON_BUTTON_TYPE.OUTLINED
        }
}

export const Standard: StoryObj<IconButtonProps> = {
        args: {
                type: ICON_BUTTON_TYPE.STANDARD
        }
}

export const Tonal: StoryObj<IconButtonProps> = {
        args: {
                type: ICON_BUTTON_TYPE.TONAL
        }
}

export const Active: StoryObj<IconButtonProps> = {
        args: {
                type: ICON_BUTTON_TYPE.ACTIVE
        }
}

export const Loading: StoryObj<IconButtonProps> = {
        args: {
                loading: true
        }
}

export default {
        title: 'components/IconButton',
        argTypes: {onPress: {action: 'pressed'}},
        component: IconButton
} as Meta<typeof IconButton>
