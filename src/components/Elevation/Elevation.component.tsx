import type {ElevationProps} from './Elevation.interface'

import {typedMemo} from '../../utils'
import {ElevationBase} from './Elevation-base.component'

export const Elevation = typedMemo((props: ElevationProps) => <ElevationBase {...props} />)
