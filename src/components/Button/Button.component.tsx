import type {ButtonProps} from './Button.interface'

import {typedMemo} from '../../utils'
import {ButtonBase} from './Button-base.component'

export const Button = typedMemo((props: ButtonProps) => <ButtonBase {...props} />)
Button.displayName = 'Button'
