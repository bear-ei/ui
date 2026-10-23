import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import type {SheetProps} from './Sheet.interface'

import {Sheet} from './Sheet.component'
import {SIDE_SHEET_TYPE} from './Sheet.enum'

export const Footer: StoryObj<SheetProps> = {
    args: {footerVisible: false, type: SIDE_SHEET_TYPE.SIDEBAR, visible: true}
}

export const Sidebar: StoryObj<SheetProps> = {
    args: {footerVisible: false, type: SIDE_SHEET_TYPE.SIDEBAR, visible: true}
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

export const Modal: StoryObj<SheetProps> = {
    args: {footerVisible: true, type: SIDE_SHEET_TYPE.MODAL, visible: true}
}

export const DisabledBack: StoryObj<SheetProps> = {
    args: {
        back: true,
        disabledBack: true,
        footerVisible: true,
        type: SIDE_SHEET_TYPE.SIDEBAR,
        visible: true
    }
}

export default {
    component: Sheet,
    title: 'components/Sheet'
} as Meta<typeof Sheet>
