import {forwardRef} from 'react'
import type {Pressable} from 'react-native'
import {typedMemo} from '../../utils'
import {CheckboxBase} from './Checkbox-base.component'
import type {CheckboxProps} from './Checkbox.interface'

const CheckboxWithRef = forwardRef<typeof Pressable, CheckboxProps>((props, ref) => (
	<CheckboxBase
		{...props}
		ref={ref}
	/>
))

export const Checkbox = typedMemo(CheckboxWithRef)()
