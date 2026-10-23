import type {FormProps} from './Form.interface'

import {typedMemo} from '../../utils'
import {FormBase} from './Form-base.component'

const FormComponent = <T,>(props: FormProps<T>) => <FormBase {...props} />
export const Form = typedMemo(FormComponent) as <T>(props: FormProps<T>) => ReturnType<typeof FormComponent>
