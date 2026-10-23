import type {MaskProps} from './Mask.interface'

import {typedMemo} from '../../utils'
import {MaskBase} from './Mask-base.component'

export const Mask = typedMemo((props: MaskProps) => <MaskBase {...props} />)
