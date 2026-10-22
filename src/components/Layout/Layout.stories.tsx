import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import type {LayoutProps} from './Layout.interface'

import {LAYOUT} from '../../constants'
import {LayoutNavigation} from './Layout-navigation'
import {LayoutPane} from './Layout-pane'
import {Layout} from './Layout.component'

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

export const Vertical: StoryObj<LayoutProps> = {
	args: {
		children: (
			<>
				<LayoutPane />
				<LayoutPane />
			</>
		),
		layoutType: LAYOUT.VERTICAL
	}
}

export default {
	component: Layout,
	title: 'components/Layout'
} as Meta<typeof Layout>
