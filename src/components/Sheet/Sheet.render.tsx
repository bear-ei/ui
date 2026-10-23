import {type FC} from 'react'
import {View} from 'react-native'

import type {RenderSheetProps} from './Sheet.interface'

import {SheetContent} from './Sheet-content'
import {SIDE_SHEET_TYPE} from './Sheet.enum'

export const RenderSheet: FC<RenderSheetProps> = ({
	id,
	testID,
	type = SIDE_SHEET_TYPE.SIDEBAR,
	visible,
	...sheetProps
}) => {
	const sheetContentElement = typeof visible === 'boolean' && (
		<SheetContent
			{...sheetProps}
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
