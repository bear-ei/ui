import {SideSheetContentProps} from './Side-sheet-content'

export type SheetType = 'standard' | 'modal' | 'standardContainer'
export interface SideSheetProps extends SideSheetContentProps {
    defaultVisible?: boolean
}

export interface RenderSideSheetProps extends SideSheetProps {
    onVisibleSource?: () => void
}

export interface SideSheetBaseProps extends SideSheetProps {
    render: (props: RenderSideSheetProps) => JSX.Element
}

export interface SideSheetState {
    nextCloseEvent?: () => void
    sideSheetVisible?: boolean
}

export type HandleSideSheetEmitOptions = Pick<SideSheetBaseProps, 'visible' | 'id' | 'type'>
