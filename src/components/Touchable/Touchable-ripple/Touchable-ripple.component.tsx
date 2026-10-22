import type {TouchableRippleProps} from './Touchable-ripple.interface'

import {typedMemo} from '../../../utils'
import {TouchableRippleBase} from './Touchable-ripple-base.component'
import {compareTouchableRippleProps} from './Touchable-ripple.handler'

export const TouchableRipple = typedMemo(
	(props: TouchableRippleProps) => <TouchableRippleBase {...props} />,
	compareTouchableRippleProps
)

TouchableRipple.displayName = 'TouchableRipple'
