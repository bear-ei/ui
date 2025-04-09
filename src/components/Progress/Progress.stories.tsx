import {Meta, StoryObj} from '@storybook/react'
import {Progress} from './Progress.component'
import {ProgressAnimated, ProgressType} from './Progress.enum'
import {ProgressProps} from './Progress.interface'

export const LinearDeterminate: StoryObj<ProgressProps> = {
        args: {
                increment: 1,
                value: 0,
                animatedType: ProgressAnimated.DETERMINATE
        }
}

export const CircularDeterminate: StoryObj<ProgressProps> = {
        args: {
                increment: 1,
                type: ProgressType.CIRCULAR,
                value: 0
        }
}

export default {
        title: 'components/Progress',
        component: Progress
} as Meta<typeof Progress>
