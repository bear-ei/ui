import type {JSX} from 'react'
import type {ViewStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'

import type {SheetProps} from '../Sheet.interface'

export type SheetContentProps = SheetProps
export interface RenderSheetContentProps extends SheetContentProps {
	containerAnimatedStyle: AnimatedStyle<ViewStyle>
	leadingElement?: JSX.Element
	trailingElement?: JSX.Element
}

export type UseSheetContentAnimatedOptions = Pick<RenderSheetContentProps, 'visible' | 'type'>
export interface RenderSheetContentLeadingProps extends Pick<
	SheetContentProps,
	'headlineLeading' | 'back' | 'position' | 'id'
> {
	onBack?: () => void
	disabled?: boolean
}

export interface RenderSheetContentTrailingProps extends Pick<SheetContentProps, 'headlineTrailing' | 'close' | 'id'> {
	onClose?: () => void
}
