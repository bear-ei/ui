import {forwardRef} from 'react'
import type {Pressable} from 'react-native'
import {typedMemo} from '../../utils'
import {TouchableBase} from './Touchable-base.component'
import type {TouchableProps} from './Touchable.interface'

const TouchableWithRef = forwardRef<typeof Pressable, TouchableProps>((props, ref) => (
	<TouchableBase
		{...props}
		ref={ref}
	/>
))

export const Touchable = typedMemo(TouchableWithRef)()
