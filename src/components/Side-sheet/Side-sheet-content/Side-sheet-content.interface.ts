import type {ViewStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'
import type {SideSheetProps} from '../Side-sheet.interface'

export type SideSheetContentProps = SideSheetProps
export interface RenderSideSheetContentProps extends SideSheetContentProps {
	containerAnimatedStyle: AnimatedStyle<ViewStyle>
	leadingElement?: React.JSX.Element
	trailingElement?: React.JSX.Element
}

export type SideSheetContentBaseProps = SideSheetContentProps
export type HandleSheetWasVisibilityOptions = Pick<SideSheetContentProps, 'onVisible'>
export type UseSideSheetContentAnimatedOptions = Pick<RenderSideSheetContentProps, 'visible' | 'type'>
export interface RenderSideSheetContentLeadingProps
	extends Pick<SideSheetContentProps, 'headlineLeading' | 'back' | 'position' | 'id'> {
	onBack?: () => void
}

export interface RenderSideSheetContentTrailingProps
	extends Pick<SideSheetContentProps, 'headlineTrailing' | 'close' | 'id'> {
	onClose?: () => void
}

export type SheetContainerProps = Pick<RenderSideSheetContentProps, 'position' | 'type'>
export type SheetHeaderProps = {leadingShow?: boolean; trailingShow?: boolean}
export type SheetViewContentProps = Pick<RenderSideSheetContentProps, 'type'>
export type SheetFooterProps = Pick<RenderSideSheetContentProps, 'type'>
