import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Sheet} from './Sheet.component'
import {SIDE_SHEET_TYPE} from './Sheet.enum'
import type {SheetProps} from './Sheet.interface'

export const Footer: StoryObj<SheetProps> = {
	args: {footerVisible: true, visible: true, type: SIDE_SHEET_TYPE.SIDEBAR}
}

export const Sidebar: StoryObj<SheetProps> = {
	args: {footerVisible: false, visible: true, type: SIDE_SHEET_TYPE.SIDEBAR}
}

export const Close: StoryObj<SheetProps> = {
	args: {
		back: true,
		close: true,
		footerVisible: true,
		type: SIDE_SHEET_TYPE.SIDEBAR,
		visible: true
	}
}

export default {
	title: 'components/Sheet',
	component: Sheet
} as Meta<typeof Sheet>
