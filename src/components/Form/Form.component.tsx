import type {ForwardedRef} from 'react'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import {FormBase} from './Form-base.component'
import type {FormComponent, FormProps, FormStore, RenderFormProps} from './Form.interface'
import {Container} from './Form.styles'
import {FormContext} from './use-form-context.hook'
import {useForm} from './use-form.hook'

const render = <T,>({form, itemElements, id, testID, ...containerProps}: RenderFormProps<T>) => (
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
		render={render}
	/>
)

export const ForwardRefForm = forwardRef(FormInner) as typeof FormInner

Object.defineProperty(ForwardRefForm, 'useForm', {value: useForm})

export const Form = ForwardRefForm as FormComponent
