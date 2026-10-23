import {useId, type FC} from 'react'

import type {SheetContentProps} from './Sheet-content.interface'

import {SIDE_SHEET_POSITION} from '../Sheet.enum'
import {RenderSheetContent, RenderSheetContentLeading, RenderSheetContentTrailing} from './Sheet-content.render'
import {useSheetContentAnimated} from './use-sheet-content-animated.hook'

export const SheetContentBase: FC<SheetContentProps> = ({
	back,
	close,
	disabledBack,
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
}) => {
	const id = useId()
	const {containerAnimatedStyle} = useSheetContentAnimated({type, visible})
	const leadingElement =
		back || headlineLeading ?
			<RenderSheetContentLeading
				back={back}
				disabled={disabledBack}
				headlineLeading={headlineLeading}
				id={id}
				onBack={onBack}
				position={position}
			/>
		:	undefined

	const trailingElement =
		close || headlineTrailing ?
			<RenderSheetContentTrailing
				close={close}
				headlineTrailing={headlineTrailing}
				id={id}
				onClose={onClose}
			/>
		:	undefined

	return (
		<RenderSheetContent
			{...renderSheetContentProps}
			containerAnimatedStyle={containerAnimatedStyle}
			footerVisible={footerVisible}
			headlineText={headlineText}
			id={id}
			leadingElement={leadingElement}
			position={position}
			trailingElement={trailingElement}
			type={type}
		/>
	)
}
