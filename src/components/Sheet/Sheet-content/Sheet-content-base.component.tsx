import {forwardRef, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {SIDE_SHEET_POSITION} from '../Sheet.enum'
import type {SheetContentProps} from './Sheet-content.interface'
import {RenderSheetContent, RenderSheetContentLeading, RenderSheetContentTrailing} from './Sheet-content.render'
import {useSheetContentAnimated} from './use-sheet-content-animated.hook'

export const SheetContentBase = forwardRef<View, SheetContentProps>(
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
			...renderSheetContentProps
		},
		ref
	) => {
		const id = useId()
		const {containerAnimatedStyle} = useSheetContentAnimated({type, visible})
		const leadingElement = useMemo(
			() =>
				back || headlineLeading ?
					<RenderSheetContentLeading
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
					<RenderSheetContentTrailing
						close={close}
						headlineTrailing={headlineTrailing}
						id={id}
						onClose={onClose}
					/>
				:	undefined,
			[close, headlineTrailing, id, onClose]
		)

		return (
			<RenderSheetContent
				{...renderSheetContentProps}
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
