import {forwardRef} from 'react'
import type {View} from 'react-native'
import {SheetContent} from './Sheet-content'
import {SIDE_SHEET_TYPE} from './Sheet.enum'
import type {RenderSheetProps} from './Sheet.interface'
import {Container} from './Sheet.styles'

export const RenderSheet = forwardRef<View, RenderSheetProps>(
	({id, testID, type = SIDE_SHEET_TYPE.STANDARD, visible, ...sheetProps}, ref) => {
		const sheetContentElement = typeof visible === 'boolean' && (
			<SheetContent
				{...sheetProps}
				ref={ref}
				testID={`sheet__sheetContent--${id}`}
				type={type}
				visible={visible}
			/>
		)

		const sheetTypes = [SIDE_SHEET_TYPE.STANDARD, SIDE_SHEET_TYPE.SIDEBAR] as const

		return (
			<>
				{sheetTypes.includes(type as (typeof sheetTypes)[number]) ?
					sheetContentElement
				:	<Container testID={testID ?? `sheet--${id}`}>{sheetContentElement}</Container>}
			</>
		)
	}
)
