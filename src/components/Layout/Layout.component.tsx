import type {LayoutProps} from './Layout.interface'

import {typedMemo} from '../../utils'
import {LayoutBase} from './Layout-base.component'

export const Layout = typedMemo((props: LayoutProps) => <LayoutBase {...props} />)
