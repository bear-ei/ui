import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import type {SheetProps} from './Sheet.interface'

import {Sheet} from './Sheet.component'
import {SHEET_TYPE} from './Sheet.enum'

export const Footer: StoryObj<SheetProps> = {
	args: {footerVisible: false, type: SHEET_TYPE.SIDEBAR, visible: true}
}

export const Sidebar: StoryObj<SheetProps> = {
	args: {footerVisible: false, type: SHEET_TYPE.SIDEBAR, visible: true}
}

export const Close: StoryObj<SheetProps> = {
	args: {
		backButtonVisible: true,
		closeButtonVisible: true,
		footerVisible: true,
		type: SHEET_TYPE.SIDEBAR,
		visible: true
	}
}

export const Modal: StoryObj<SheetProps> = {
	args: {footerVisible: true, type: SHEET_TYPE.MODAL, visible: true}
}

export const DisabledBack: StoryObj<SheetProps> = {
	args: {
		backButtonDisabled: true,
		backButtonVisible: true,
		footerVisible: true,
		type: SHEET_TYPE.SIDEBAR,
		visible: true
	}
}

export default {
	component: Sheet,
	title: 'components/Sheet'
} as Meta<typeof Sheet>
