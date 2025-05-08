import {forwardRef} from 'react'
import type {View} from 'react-native'
import {FormItemBase} from './Form-item-base.component'
import type {FormItemProps} from './Form-item.interface'
import {renderFormItem} from './Form-item.render'

const FormItemWithRef = forwardRef<View, FormItemProps>((props, ref) => (
	<FormItemBase
		{...props}
		ref={ref}
		renderFormItem={renderFormItem}
	/>
))

export const FormItem = FormItemWithRef
