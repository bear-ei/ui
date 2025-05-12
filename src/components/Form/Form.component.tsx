import type {ForwardedRef} from 'react'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import {typedMemo} from '../../utils'
import {FormBase} from './Form-base.component'
import type {FormProps} from './Form.interface'
import {renderForm} from './Form.render'
import {useForm} from './use-form.hook'

const FormInner = <T,>(props: FormProps<T>, ref: ForwardedRef<View>) => (
	<FormBase
		{...props}
		ref={ref}
		renderForm={renderForm}
	/>
)

export const Form = Object.assign(
	typedMemo(forwardRef(FormInner))() as <T>(
		props: FormProps<T> & {ref?: ForwardedRef<View>}
	) => ReturnType<typeof FormInner>,
	{useForm}
)
