import type {DragProps} from './Drag.interface'

import {typedMemo} from '../../utils'
import {DragBase} from './Drag-base.component'

export const Drag = typedMemo((props: DragProps) => <DragBase {...props} />)
Drag.displayName = 'Drag'
