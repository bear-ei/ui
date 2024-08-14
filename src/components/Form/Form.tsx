import {ForwardedRef, forwardRef} from 'react'
import {View} from 'react-native'
import {FormBase} from './Form-base'
import {FormComponent, FormProps, FormStorage, RenderFormProps} from './Form.interface'
import {Container} from './Form.styles'
import {useForm} from './use-form'
import {FormContext} from './use-form-context'

const render = <T,>({form, id, itemElements, ...containerProps}: RenderFormProps<T>) => (
    <FormContext.Provider value={form as FormStorage<Record<string, unknown>>}>
        <Container
            {...containerProps}
            testID={`form--${id}`}
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
