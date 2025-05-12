import {forwardRef} from 'react'
import type {View} from 'react-native'
import {typedMemo} from '../../../utils'
import {TouchableRippleBase} from './Touchable-ripple-base.component'
import {handleTouchableRipplePropsEqual} from './Touchable-ripple-handle'
import type {TouchableRippleProps} from './Touchable-ripple.interface'
import {renderTouchableRipple} from './Touchable-ripple.render'

const TouchableRippleWithRef = forwardRef<View, TouchableRippleProps>((props, ref) => (
	<TouchableRippleBase
		{...props}
		ref={ref}
		renderTouchableRipple={renderTouchableRipple}
	/>
))

export const TouchableRipple = typedMemo(TouchableRippleWithRef)((prevProps, nextProps) =>
	handleTouchableRipplePropsEqual(prevProps)(nextProps)
)
