import {forwardRef} from 'react'
import type {View} from 'react-native'
import {SideSheetBase} from './Side-sheet-base.component'
import type {SideSheetProps} from './Side-sheet.interface'
import {renderSideSheet} from './Side-sheet.render'

const SideSheetWithRef = forwardRef<View, SideSheetProps>((props, ref) => (
	<SideSheetBase
		{...props}
		ref={ref}
		renderSideSheet={renderSideSheet}
	/>
))

export const SideSheet = SideSheetWithRef
