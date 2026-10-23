import type {PopoverProps} from './Popover.interface'

import {typedMemo} from '../../utils'
import {PopoverBase} from './Popover-base.component'

export const Popover = typedMemo((props: PopoverProps) => <PopoverBase {...props} />)
