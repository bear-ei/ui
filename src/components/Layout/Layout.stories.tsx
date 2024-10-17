import {Meta, StoryObj} from '@storybook/react'
import {LayoutPane} from './Layout-pane'
import {Layout} from './Layout.component'
import {LayoutProps} from './Layout.interface'

export const Pane: StoryObj<LayoutProps> = {
    args: {
        children: (
            <>
                <LayoutPane />
                <LayoutPane />
                <LayoutPane />
            </>
        )
    }
}

export default {
    title: 'components/Layout',
    component: Layout
} as Meta<typeof Layout>
