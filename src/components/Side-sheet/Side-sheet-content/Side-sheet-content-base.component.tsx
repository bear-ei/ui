import {forwardRef, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {SIDE_SHEET_POSITION} from '../Side-sheet.enum'
import type {SideSheetContentProps} from './Side-sheet-content.interface'
import {
	RenderSideSheetContent,
	RenderSideSheetContentLeading,
	RenderSideSheetContentTrailing
} from './Side-sheet-content.render'
import {useSideSheetContentAnimated} from './use-side-sheet-content-animated.hook'

export const SideSheetContentBase = forwardRef<View, SideSheetContentProps>(
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
			() =>
				back || headlineLeading ?
					<RenderSideSheetContentLeading
						back={back}
						headlineLeading={headlineLeading}
						id={id}
						onBack={onBack}
						position={position}
					/>
				:	undefined,
			[back, headlineLeading, id, onBack, position]
		)

		const trailingElement = useMemo(
			() =>
				close || headlineTrailing ?
					<RenderSideSheetContentTrailing
						close={close}
						headlineTrailing={headlineTrailing}
						id={id}
						onClose={onClose}
					/>
				:	undefined,
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
