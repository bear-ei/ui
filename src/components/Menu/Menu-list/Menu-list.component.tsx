import type {MenuListProps} from './Menu-list.interface'

import {typedMemo} from '../../../utils'
import {MenuListBase} from './Menu-list-base.component'

export const MenuList = typedMemo((props: MenuListProps) => <MenuListBase {...props} />)
