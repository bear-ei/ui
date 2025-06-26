import type {Meta, StoryObj} from '@storybook/react'
import {SideSheet} from './Side-sheet.component'
import {SIDE_SHEET_TYPE} from './Side-sheet.enum'
import type {SideSheetProps} from './Side-sheet.interface'

export const Footer: StoryObj<SideSheetProps> = {
	args: {footerVisible: true, visible: true, type: SIDE_SHEET_TYPE.STANDARD}
}

export const Standard: StoryObj<SideSheetProps> = {
	args: {footerVisible: false, visible: true, type: SIDE_SHEET_TYPE.STANDARD}
}

export const Sidebar: StoryObj<SideSheetProps> = {
	args: {footerVisible: false, visible: true, type: SIDE_SHEET_TYPE.SIDEBAR}
}

export const Close: StoryObj<SideSheetProps> = {
	args: {
		back: true,
		close: true,
		footerVisible: true,
		type: SIDE_SHEET_TYPE.STANDARD,
		visible: true
	}
}

export default {
	title: 'components/SideSheet',
	component: SideSheet
} as Meta<typeof SideSheet>
