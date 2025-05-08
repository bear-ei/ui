import {forwardRef, memo} from 'react'
import type {View} from 'react-native'
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

export const TouchableRipple = memo(TouchableRippleWithRef, (prevProps, nextProps) =>
	handleTouchableRipplePropsEqual(prevProps)(nextProps)
) as typeof TouchableRippleWithRef
