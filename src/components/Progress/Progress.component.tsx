import type {ProgressProps} from './Progress.interface'

import {typedMemo} from '../../utils'
import {ProgressBase} from './Progress-base.component'

export const Progress = typedMemo((props: ProgressProps) => <ProgressBase {...props} />)
