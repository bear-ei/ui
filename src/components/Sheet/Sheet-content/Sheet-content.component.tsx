import type {SheetContentProps} from './Sheet-content.interface'

import {typedMemo} from '../../../utils'
import {SheetContentBase} from './Sheet-content-base.component'

export const SheetContent = typedMemo((props: SheetContentProps) => <SheetContentBase {...props} />)
