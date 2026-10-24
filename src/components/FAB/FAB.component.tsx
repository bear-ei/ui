import type {FABProps} from './FAB.interface'

import {typedMemo} from '../../utils'
import {FABBase} from './FAB-base.component'

export const FAB = typedMemo((props: FABProps) => <FABBase {...props} />)
