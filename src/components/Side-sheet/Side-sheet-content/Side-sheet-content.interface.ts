import type {ViewStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'
import type {DefaultTheme} from 'styled-components/native'
import type {SideSheetProps} from '../Side-sheet.interface'

export type SideSheetContentProps = SideSheetProps
export interface RenderSideSheetContentProps extends SideSheetContentProps {
	containerAnimatedStyle: AnimatedStyle<ViewStyle>
	leadingElement?: React.JSX.Element
	theme: DefaultTheme
	trailingElement?: React.JSX.Element
}

export interface SideSheetContentBaseProps extends SideSheetContentProps {
	renderSideSheetContent: (props: RenderSideSheetContentProps) => React.JSX.Element
}

export type HandleSheetWasVisibleOptions = Pick<SideSheetContentProps, 'onVisible'>
export type UseSideSheetContentAnimatedOptions = Pick<RenderSideSheetContentProps, 'visible' | 'type'>
export type RenderSideSheetContentLeadingOptions = Pick<
	SideSheetContentProps,
	'headlineLeading' | 'back' | 'position' | 'id'
>

export type RenderSideSheetContentTrailingOptions = Pick<SideSheetContentProps, 'headlineTrailing' | 'close' | 'id'>
export type SheetContainerProps = Pick<RenderSideSheetContentProps, 'position' | 'type'>
export type SheetHeaderProps = {leadingShow?: boolean; trailingShow?: boolean}
export type SheetViewContentProps = Pick<RenderSideSheetContentProps, 'type'>
export type SheetFooterProps = Pick<RenderSideSheetContentProps, 'type'>
