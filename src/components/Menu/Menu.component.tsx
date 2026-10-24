import type {MenuProps} from './Menu.interface'

import {typedMemo} from '../../utils'
import {MenuBase} from './Menu-base.component'

export const Menu = typedMemo((props: MenuProps) => <MenuBase {...props} />)
