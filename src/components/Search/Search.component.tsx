import type {SearchProps} from './Search.interface'

import {typedMemo} from '../../utils'
import {SearchBase} from './Search-base.component'

export const Search = typedMemo((props: SearchProps) => <SearchBase {...props} />)
