import {forwardRef} from 'react'
import type {View} from 'react-native'
import {typedMemo} from '../../utils'
import {DividerBase} from './Divider-base.component'
import type {DividerProps} from './Divider.interface'

const DividerWithRef = forwardRef<View, DividerProps>((props, ref) => (
	<DividerBase
		{...props}
		ref={ref}
	/>
))

export const Divider = typedMemo(DividerWithRef)()
