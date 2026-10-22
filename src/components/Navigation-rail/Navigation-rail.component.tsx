import type {NavigationRailProps} from './Navigation-rail.interface'

import {typedMemo} from '../../utils'
import {NavigationRailBase} from './Navigation-rail-base.component'

export const NavigationRail = typedMemo((props: NavigationRailProps) => <NavigationRailBase {...props} />)
NavigationRail.displayName = 'NavigationRail'
