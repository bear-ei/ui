import type {ViewStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'
import type {SheetProps} from '../Sheet.interface'

export type SheetContentProps = SheetProps
export interface RenderSheetContentProps extends SheetContentProps {
	containerAnimatedStyle: AnimatedStyle<ViewStyle>
	leadingElement?: React.JSX.Element
	trailingElement?: React.JSX.Element
}

export type HandleSheetWasVisibilityOptions = Pick<SheetContentProps, 'onVisible'>
export type UseSheetContentAnimatedOptions = Pick<RenderSheetContentProps, 'visible' | 'type'>
export interface RenderSheetContentLeadingProps
	extends Pick<SheetContentProps, 'headlineLeading' | 'back' | 'position' | 'id'> {
	onBack?: () => void
}

export interface RenderSheetContentTrailingProps extends Pick<SheetContentProps, 'headlineTrailing' | 'close' | 'id'> {
	onClose?: () => void
}

export type SheetContainerProps = Pick<RenderSheetContentProps, 'position' | 'type'>
export type SheetHeaderProps = {leadingShow?: boolean; trailingShow?: boolean} & Pick<RenderSheetContentProps, 'type'>
export type SheetViewContentProps = Pick<RenderSheetContentProps, 'type'>
export type SheetFooterProps = Pick<RenderSheetContentProps, 'type'>
