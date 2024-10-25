import {Meta, StoryObj} from '@storybook/react'
import {SideSheet} from './Side-sheet.component'
import {SideSheetProps} from './Side-sheet.interface'

export const SheetSide: StoryObj<SideSheetProps> = {
        args: {visible: true}
}

export const SheetSideFooter: StoryObj<SideSheetProps> = {
        args: {footerVisible: true, visible: true}
}

export const SheetSideType: StoryObj<SideSheetProps> = {
        args: {footerVisible: true, visible: true, type: 'standard'}
}

export const SheetSideClose: StoryObj<SideSheetProps> = {
        args: {
                footerVisible: true,
                visible: true,
                type: 'standard',
                close: true,
                back: true
        }
}

export default {
        title: 'components/SideSheet',
        component: SideSheet
} as Meta<typeof SideSheet>
