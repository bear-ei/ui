import {forwardRef, useId} from 'react'
import type {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {SIDE_SHEET_POSITION} from '../Side-sheet.enum'
import {renderSideSheetContentLeading, renderSideSheetContentTrailing} from './Side-sheet-content-handle'
import type {SideSheetContentBaseProps} from './Side-sheet-content.interface'
import {useSideSheetContentAnimated} from './use-side-sheet-content-animated.hook'

export const SideSheetContentBase = forwardRef<View, SideSheetContentBaseProps>(
	(
		{
			back,
			close,
			footerVisible,
			headlineLeading,
			headlineText = 'Title',
			headlineTrailing,
			onBack,
			onClose,
			position = SIDE_SHEET_POSITION.HORIZONTAL_END,
			renderSideSheetContent,
			type,
			visible,
			...renderSideSheetContentProps
		},
		ref
	) => {
		const {containerAnimatedStyle} = useSideSheetContentAnimated({type, visible})
		const id = useId()
		const theme = useTheme()
		const leadingElement = renderSideSheetContentLeading({headlineLeading, back, position, id})(onBack)
		const trailingElement = renderSideSheetContentTrailing({headlineTrailing, close, id})(onClose)

		return renderSideSheetContent({
			...renderSideSheetContentProps,
			containerAnimatedStyle,
			footerVisible,
			headlineText,
			id,
			leading: leadingElement,
			ref,
			position,
			theme,
			trailing: trailingElement,
			type
		})
	}
)
