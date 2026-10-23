import type {FormProps} from './Form.interface'

import {typedMemo} from '../../utils'
import {FormBase} from './Form-base.component'

const FormInner = <T,>(props: FormProps<T>) => <FormBase {...props} />

export const Form = typedMemo(FormInner) as <T>(props: FormProps<T>) => ReturnType<typeof FormInner>
