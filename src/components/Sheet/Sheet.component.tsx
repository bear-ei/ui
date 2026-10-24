import type {SheetProps} from './Sheet.interface'

import {typedMemo} from '../../utils'
import {SheetBase} from './Sheet-base.component'

export const Sheet = typedMemo((props: SheetProps) => <SheetBase {...props} />)
