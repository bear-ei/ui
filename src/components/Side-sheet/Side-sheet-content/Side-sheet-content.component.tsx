import {forwardRef} from 'react'
import type {View} from 'react-native'
import {typedMemo} from '../../../utils'
import {SideSheetContentBase} from './Side-sheet-content-base.component'
import type {SideSheetContentProps} from './Side-sheet-content.interface'
import {renderSideSheetContent} from './Side-sheet-content.render'

const SideSheetContentWithRef = forwardRef<View, SideSheetContentProps>((props, ref) => (
	<SideSheetContentBase
		{...props}
		ref={ref}
		renderSideSheetContent={renderSideSheetContent}
	/>
))

export const SideSheetContent = typedMemo(SideSheetContentWithRef)()
