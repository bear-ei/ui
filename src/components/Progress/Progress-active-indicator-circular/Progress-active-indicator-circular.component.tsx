import type {ProgressActiveIndicatorCircularProps} from './Progress-active-indicator-circular.interface'

import {typedMemo} from '../../../utils'
import {ProgressActiveIndicatorCircularBase} from './Progress-active-indicator-circular-base.component'

/**
 * TODO: Add progress type DETERMINATE
 */

export const ProgressActiveIndicatorCircular = typedMemo((props: ProgressActiveIndicatorCircularProps) => (
	<ProgressActiveIndicatorCircularBase {...props} />
))

ProgressActiveIndicatorCircular.displayName = 'ProgressActiveIndicatorCircular'
