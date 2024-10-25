import {Meta, StoryObj} from '@storybook/react'
import {Progress} from './Progress.component'
import {ProgressProps} from './Progress.interface'

export const LinearDeterminate: StoryObj<ProgressProps> = {
        args: {
                increment: 10
        }
}

export default {
        title: 'components/Progress',
        component: Progress
} as Meta<typeof Progress>
