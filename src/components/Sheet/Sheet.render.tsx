import {forwardRef} from 'react'
import {View} from 'react-native'
import {SheetContent} from './Sheet-content'
import {SIDE_SHEET_TYPE} from './Sheet.enum'
import type {RenderSheetProps} from './Sheet.interface'

export const RenderSheet = forwardRef<View, RenderSheetProps>(
	({id, testID, type = SIDE_SHEET_TYPE.SIDEBAR, visible, ...sheetProps}, ref) => {
		const sheetContentElement = typeof visible === 'boolean' && (
			<SheetContent
				{...sheetProps}
				ref={ref}
				testID={`sheet__sheetContent--${id}`}
				type={type}
				visible={visible}
			/>
		)

		return (
			<>
				{type === SIDE_SHEET_TYPE.SIDEBAR ?
					sheetContentElement
				:	<View
						className='absolute bottom-0 left-0 right-0 top-0 z-40 overflow-hidden'
						testID={testID ?? `sheet--${id}`}
					>
						{sheetContentElement}
					</View>
				}
			</>
		)
	}
)

RenderSheet.displayName = 'RenderSheet'
