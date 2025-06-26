import {forwardRef} from 'react'
import type {View} from 'react-native'
import {typedMemo} from '../../utils'
import {SheetBase} from './Sheet-base.component'
import type {SheetProps} from './Sheet.interface'

const SheetWithRef = forwardRef<View, SheetProps>((props, ref) => (
	<SheetBase
		{...props}
		ref={ref}
	/>
))

export const Sheet = typedMemo(SheetWithRef)()
