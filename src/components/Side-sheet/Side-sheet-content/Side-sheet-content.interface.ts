import {ViewStyle} from 'react-native'
import {AnimatedStyle} from 'react-native-reanimated'
import {SideSheetProps} from '../Side-sheet.interface'

export type SideSheetContentProps = SideSheetProps
export interface RenderSideSheetContentProps extends SideSheetContentProps {
        containerAnimatedStyle: AnimatedStyle<ViewStyle>
        footerAnimatedStyle: AnimatedStyle<ViewStyle>
        leading?: JSX.Element
        trailing?: JSX.Element
}

export interface SideSheetContentBaseProps extends SideSheetContentProps {
        render: (props: RenderSideSheetContentProps) => JSX.Element
}

export type HandleSheetWasVisibleOptions = Pick<SideSheetContentProps, 'onVisible'>
export type UseSideSheetContentAnimatedOptions = Pick<RenderSideSheetContentProps, 'visible' | 'type' | 'footerVisible'>
export type HandleSideSheetContentLeadingOptions = Pick<
        SideSheetContentProps,
        'headlineLeading' | 'back' | 'sheetPosition' | 'id'
>

export type HandleSideSheetContentTrailingOptions = Pick<SideSheetContentProps, 'headlineTrailing' | 'close' | 'id'>
export type SheetContainerProps = Pick<RenderSideSheetContentProps, 'sheetPosition' | 'type'>
export type SheetHeaderProps = {leadingShow?: boolean; trailingShow?: boolean}
export type SheetViewContentProps = Pick<RenderSideSheetContentProps, 'type'>
export type SheetFooterProps = Pick<RenderSideSheetContentProps, 'type'>
