import {forwardRef, useId, useMemo} from 'react'
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
		const id = useId()
		const theme = useTheme()
		const {containerAnimatedStyle} = useSideSheetContentAnimated({type, visible})
		const leadingElement = useMemo(
			() => renderSideSheetContentLeading({headlineLeading, back, position, id})(onBack),
			[back, headlineLeading, id, onBack, position]
		)

		const trailingElement = useMemo(
			() => renderSideSheetContentTrailing({headlineTrailing, close, id})(onClose),
			[close, headlineTrailing, id, onClose]
		)

		return renderSideSheetContent({
			...renderSideSheetContentProps,
			containerAnimatedStyle,
			footerVisible,
			headlineText,
			id,
			leadingElement,
			position,
			ref,
			theme,
			trailingElement,
			type
		})
	}
)
