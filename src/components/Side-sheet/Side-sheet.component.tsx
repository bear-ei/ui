import {forwardRef} from 'react'
import type {View} from 'react-native'
import {SideSheetBase} from './Side-sheet-base.component'
import {SideSheetContent} from './Side-sheet-content'
import {SIDE_SHEET_TYPE} from './Side-sheet.enum'
import type {RenderSideSheetProps, SideSheetProps} from './Side-sheet.interface'
import {Container} from './Side-sheet.styles'

const renderSideSheet = ({
	visible,
	type = SIDE_SHEET_TYPE.STANDARD,
	id,
	testID,
	...sheetProps
}: RenderSideSheetProps) => {
	const sideSheetContentElement = typeof visible === 'boolean' && (
		<SideSheetContent
			{...sheetProps}
			testID={`sideSheet__sideSheetContent--${id}`}
			type={type}
			visible={visible}
		/>
	)

	const sideSheetTypes = [SIDE_SHEET_TYPE.STANDARD, SIDE_SHEET_TYPE.SIDEBAR] as const

	return (
		<>
			{sideSheetTypes.includes(type as (typeof sideSheetTypes)[number]) ?
				sideSheetContentElement
			:	<Container testID={testID ?? `sideSheet--${id}`}>{sideSheetContentElement}</Container>}
		</>
	)
}

const SideSheetWithRef = forwardRef<View, SideSheetProps>((props, ref) => (
	<SideSheetBase
		{...props}
		ref={ref}
		renderSideSheet={renderSideSheet}
	/>
))

export const SideSheet = SideSheetWithRef
