import {Meta, StoryObj} from '@storybook/react'
import {SideSheet} from './Side-sheet.component'
import {SheetType} from './Side-sheet.enum'
import {SideSheetProps} from './Side-sheet.interface'

export const Footer: StoryObj<SideSheetProps> = {
        args: {footerVisible: true, visible: true, type: SheetType.STANDARD}
}

export const Standard: StoryObj<SideSheetProps> = {
        args: {footerVisible: false, visible: true, type: SheetType.STANDARD}
}

export const Close: StoryObj<SideSheetProps> = {
        args: {
                back: true,
                close: true,
                footerVisible: true,
                type: SheetType.STANDARD,
                visible: true
        }
}

export default {
        title: 'components/SideSheet',
        component: SideSheet
} as Meta<typeof SideSheet>
