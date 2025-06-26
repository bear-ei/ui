import {forwardRef} from 'react'
import type {View} from 'react-native'
import {typedMemo} from '../../../utils'
import {SheetContentBase} from './Sheet-content-base.component'
import type {SheetContentProps} from './Sheet-content.interface'

const SheetContentWithRef = forwardRef<View, SheetContentProps>((props, ref) => (
	<SheetContentBase
		{...props}
		ref={ref}
	/>
))

export const SheetContent = typedMemo(SheetContentWithRef)()
