import type {UnderlayProps} from './Underlay.interface'

import {typedMemo} from '../../utils'
import {UnderlayBase} from './Underlay-base.component'

export const Underlay = typedMemo((props: UnderlayProps) => <UnderlayBase {...props} />)
