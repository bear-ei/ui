import type {ProgressActiveIndicatorLinearProps} from './Progress-active-indicator-linear.interface'

import {typedMemo} from '../../../utils'
import {ProgressActiveIndicatorLinearBase} from './Progress-active-indicator-linear-base.component'

/**
 * TODO: Add progress type INDETERMINATE
 */
export const ProgressActiveIndicatorLinear = typedMemo((props: ProgressActiveIndicatorLinearProps) => (
	<ProgressActiveIndicatorLinearBase {...props} />
))

ProgressActiveIndicatorLinear.displayName = 'ProgressActiveIndicatorLinear'
