import {useId, type FC} from 'react'

import type {SheetContentProps} from './Sheet-content.interface'

import {SHEET_POSITION} from '../Sheet.enum'
import {RenderSheetContent, RenderSheetContentLeading, RenderSheetContentTrailing} from './Sheet-content.render'
import {useSheetContentAnimated} from './use-sheet-content-animated.hook'

export const SheetContentBase: FC<SheetContentProps> = ({
	backButtonDisabled,
	backButtonVisible,
	closeButtonVisible,
	footerVisible,
	headlineLeading,
	headlineText = 'Title',
	headlineTrailing,
	onBack,
	onClose,
	position = SHEET_POSITION.HORIZONTAL_END,
	type,
	visible,
	...renderSheetContentProps
}) => {
	const id = useId()
	const {containerAnimatedStyle} = useSheetContentAnimated({type, visible})
	const leadingElement =
		backButtonVisible || headlineLeading ?
			<RenderSheetContentLeading
				backButtonVisible={backButtonVisible}
				disabled={backButtonDisabled}
				headlineLeading={headlineLeading}
				id={id}
				onBack={onBack}
				position={position}
			/>
		:	undefined

	const trailingElement =
		closeButtonVisible || headlineTrailing ?
			<RenderSheetContentTrailing
				closeButtonVisible={closeButtonVisible}
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
