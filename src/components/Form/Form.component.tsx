import type {ForwardedRef} from 'react'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import {typedMemo} from '../../utils'
import {FormBase} from './Form-base.component'
import type {FormProps} from './Form.interface'
import {useForm} from './use-form.hook'

const FormInner = <T,>(props: FormProps<T>, ref: ForwardedRef<View>) => (
	<FormBase
		{...props}
		ref={ref}
	/>
)

const FormInnerWithRef = forwardRef(FormInner)

FormInnerWithRef.displayName = 'Form'

export const Form = Object.assign(
	typedMemo(FormInnerWithRef) as <T>(
		props: FormProps<T> & {ref?: ForwardedRef<View>}
	) => ReturnType<typeof FormInner>,
	{useForm}
)
