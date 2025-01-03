import {Meta, StoryObj} from '@storybook/react'
import {Progress} from './Progress.component'
import {ProgressProps} from './Progress.interface'

export const LinearDeterminate: StoryObj<ProgressProps> = {
        args: {
                increment: 1,
                value: 0,
                animatedType: 'determinate'
        }
}

export const CircularDeterminate: StoryObj<ProgressProps> = {
        args: {
                increment: 1,
                type: 'circular',
                value: 0
        }
}

export default {
        title: 'components/Progress',
        component: Progress
} as Meta<typeof Progress>
