import type {TouchableProps} from './Touchable.interface'

import {typedMemo} from '../../utils'
import {TouchableBase} from './Touchable-base.component'

export const Touchable = typedMemo((props: TouchableProps) => <TouchableBase {...props} />)
Touchable.displayName = 'Touchable'
