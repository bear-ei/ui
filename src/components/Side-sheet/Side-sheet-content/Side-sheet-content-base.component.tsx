import {forwardRef, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {SIDE_SHEET_POSITION} from '../Side-sheet.enum'
import type {SideSheetContentBaseProps} from './Side-sheet-content.interface'
import {
	RenderSideSheetContent,
	RenderSideSheetContentLeading,
	RenderSideSheetContentTrailing
} from './Side-sheet-content.render'
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
			type,
			visible,
			...renderSideSheetContentProps
		},
		ref
	) => {
		const id = useId()
		const {containerAnimatedStyle} = useSideSheetContentAnimated({type, visible})
		const leadingElement = useMemo(
			() => (
				<RenderSideSheetContentLeading
					back={back}
					headlineLeading={headlineLeading}
					id={id}
					onBack={onBack}
					position={position}
				/>
			),
			[back, headlineLeading, id, onBack, position]
		)

		const trailingElement = useMemo(
			() => (
				<RenderSideSheetContentTrailing
					headlineTrailing={headlineTrailing}
					close={close}
					id={id}
					onClose={onClose}
				/>
			),
			[close, headlineTrailing, id, onClose]
		)

		return (
			<RenderSideSheetContent
				{...renderSideSheetContentProps}
				containerAnimatedStyle={containerAnimatedStyle}
				footerVisible={footerVisible}
				headlineText={headlineText}
				id={id}
				leadingElement={leadingElement}
				position={position}
				ref={ref}
				trailingElement={trailingElement}
				type={type}
			/>
		)
	}
)
