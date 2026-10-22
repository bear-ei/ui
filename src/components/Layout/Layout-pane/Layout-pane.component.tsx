import type {LayoutPaneProps} from './Layout-pane.interface'

import {typedMemo} from '../../../utils'
import {LayoutPaneBase} from './Layout-pane-base.component'

export const LayoutPane = typedMemo((props: LayoutPaneProps) => <LayoutPaneBase {...props} />)
LayoutPane.displayName = 'LayoutPane'
