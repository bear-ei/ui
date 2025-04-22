import {forwardRef} from 'react'
import type {View} from 'react-native'
import {FormItemBase} from './Form-item-base.component'
import type {FormItemProps, RenderFormItemProps} from './Form-item.interface'
import {Container} from './Form-item.styles'

const renderFormItem = ({control, testID, id, ...containerProps}: RenderFormItemProps) => (
	<Container
		{...containerProps}
		testID={testID ?? `formItem--${id}`}
	>
		{control}
	</Container>
)

const FormItemWithRef = forwardRef<View, FormItemProps>((props, ref) => (
	<FormItemBase
		{...props}
		ref={ref}
		renderFormItem={renderFormItem}
	/>
))

export const FormItem = FormItemWithRef
