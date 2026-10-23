import type {LayoutNavigationProps} from './Layout-navigation.interface'

import {typedMemo} from '../../../utils'
import {LayoutNavigationBase} from './Layout-navigation-base.component'

export const LayoutNavigation = typedMemo((props: LayoutNavigationProps) => <LayoutNavigationBase {...props} />)

