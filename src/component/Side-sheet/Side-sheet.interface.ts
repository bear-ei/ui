import {SideSheetContentProps} from './Side-sheet-content'

export type SheetType = 'standard' | 'modal'
export interface SideSheetProps extends SideSheetContentProps {
    defaultVisible?: boolean
}

export interface RenderSideSheetProps extends SideSheetProps {
    onVisibleSource?: () => void
}

export interface SideSheetBaseProps extends SideSheetProps {
    render: (props: RenderSideSheetProps) => React.JSX.Element
}

export interface InitialSideSheetState {
    nextCloseEvent?: () => void
    sideSheetVisible?: boolean
}

export type HandleSideSheetEmitOptions = Pick<SideSheetBaseProps, 'visible' | 'id' | 'type'>
