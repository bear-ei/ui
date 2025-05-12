import {forwardRef} from 'react'
import type {View} from 'react-native'
import {typedMemo} from '../../utils'
import {TouchableBase} from './Touchable-base.component'
import type {TouchableProps} from './Touchable.interface'
import {renderTouchable} from './Touchable.render'

const TouchableWithRef = forwardRef<View, TouchableProps>((props, ref) => (
	<TouchableBase
		{...props}
		ref={ref}
		renderTouchable={renderTouchable}
	/>
))

export const Touchable = typedMemo(TouchableWithRef)()
