import type {FormItemProps} from './Form-item.interface'

import {typedMemo} from '../../../utils'
import {FormItemBase} from './Form-item-base.component'

export const FormItem = typedMemo((props: FormItemProps) => <FormItemBase {...props} />)

