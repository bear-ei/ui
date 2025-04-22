import type {ForwardedRef} from 'react'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import {FormBase} from './Form-base.component'
import type {FormProps, FormStore, RenderFormProps} from './Form.interface'
import {Container} from './Form.styles'
import {FormContext} from './use-form-context.hook'
import {useForm} from './use-form.hook'

const renderForm = <T,>({form, itemElements, testID, id, ...containerProps}: RenderFormProps<T>) => (
	<FormContext.Provider value={form as FormStore<Record<string, unknown>>}>
		<Container
			{...containerProps}
			testID={testID ?? `form--${id}`}
		>
			{itemElements}
		</Container>
	</FormContext.Provider>
)

const FormInner = <T,>(props: FormProps<T>, ref: ForwardedRef<View>) => (
	<FormBase
		{...props}
		ref={ref}
		renderForm={renderForm}
	/>
)

export const Form = Object.assign(
	forwardRef(FormInner) as <T>(props: FormProps<T> & {ref?: ForwardedRef<View>}) => ReturnType<typeof FormInner>,
	{useForm}
)
