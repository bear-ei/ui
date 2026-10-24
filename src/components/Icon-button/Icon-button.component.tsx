import type {IconButtonProps} from './Icon-button.interface'

import {typedMemo} from '../../utils'
import {IconButtonBase} from './Icon-button-base.component'

export const IconButton = typedMemo((props: IconButtonProps) => <IconButtonBase {...props} />)
