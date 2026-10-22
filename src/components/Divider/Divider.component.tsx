import type {DividerProps} from './Divider.interface'

import {typedMemo} from '../../utils'
import {DividerBase} from './Divider-base.component'

export const Divider = typedMemo((props: DividerProps) => <DividerBase {...props} />)
Divider.displayName = 'Divider'
