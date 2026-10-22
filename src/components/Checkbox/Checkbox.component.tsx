import type {CheckboxProps} from './Checkbox.interface'

import {typedMemo} from '../../utils'
import {CheckboxBase} from './Checkbox-base.component'

export const Checkbox = typedMemo((props: CheckboxProps) => <CheckboxBase {...props} />)
Checkbox.displayName = 'Checkbox'
