import {forwardRef} from 'react'
import type {View} from 'react-native'
import {typedMemo} from '../../../utils'
import {FormItemBase} from './Form-item-base.component'
import type {FormItemProps} from './Form-item.interface'

const FormItemWithRef = forwardRef<View, FormItemProps>((props, ref) => (
	<FormItemBase
		{...props}
		ref={ref}
	/>
))

export const FormItem = typedMemo(FormItemWithRef)()
