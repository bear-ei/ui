import type {FormProps} from './Form.interface'

import {typedMemo} from '../../utils'
import {FormBase} from './Form-base.component'

const FormInner = <T,>(props: FormProps<T>) => <FormBase {...props} />
FormInner.displayName = 'Form'

export const Form = typedMemo(FormInner) as <T>(props: FormProps<T>) => ReturnType<typeof FormInner>
