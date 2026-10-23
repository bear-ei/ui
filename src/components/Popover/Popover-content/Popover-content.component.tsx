import type {PopoverContentProps} from './Popover-content.interface'

import {typedMemo} from '../../../utils'
import {PopoverContentBase} from './Popover-content-base.component'

export const PopoverContent = typedMemo((props: PopoverContentProps) => <PopoverContentBase {...props} />)
