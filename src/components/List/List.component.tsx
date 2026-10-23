import type {ListProps} from './List.interface'

import {typedMemo} from '../../utils'
import {ListBase} from './List-base.component'

export const List = typedMemo((props: ListProps) => <ListBase {...props} />)
