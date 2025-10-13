import type {Meta, StoryObj} from '@storybook/react'
import {LayoutNavigation} from './Layout-navigation'
import {LayoutPane} from './Layout-pane'
import {Layout} from './Layout.component'
import type {LayoutProps} from './Layout.interface'

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

export const Navigation: StoryObj<LayoutProps> = {
        args: {
                children: <LayoutNavigation />
        }
}

export default {
        title: 'components/Layout',
        component: Layout
} as Meta<typeof Layout>
