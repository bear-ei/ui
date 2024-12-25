import {Meta, StoryObj} from '@storybook/react'
import {SideSheet} from './Side-sheet.component'
import {SideSheetProps} from './Side-sheet.interface'

export const SheetSide: StoryObj<SideSheetProps> = {
        args: {visible: true}
}

export const SheetSideFooter: StoryObj<SideSheetProps> = {
        args: {footerVisible: true, visible: true, type: 'standard'}
}

export const SheetSideType: StoryObj<SideSheetProps> = {
        args: {footerVisible: false, visible: true, type: 'standard'}
}

export const SheetSideClose: StoryObj<SideSheetProps> = {
        args: {
                back: true,
                close: true,
                footerVisible: true,
                type: 'standard',
                visible: true
        }
}

export default {
        title: 'components/SideSheet',
        component: SideSheet
} as Meta<typeof SideSheet>
