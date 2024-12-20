import {Meta, StoryObj} from '@storybook/react'
import {Loading} from './Loading.component'
import {LoadingProps} from './Loading.interface'

export const NoneContentText: StoryObj<LoadingProps> = {
        args: {}
}

export default {
        component: Loading,
        title: 'components/Loading'
} as Meta<typeof Loading>
