import {forwardRef} from 'react'
import {typedMemo} from '../../utils'
import type {PressableType} from '../Touchable'
import {CheckboxBase} from './Checkbox-base.component'
import type {CheckboxProps} from './Checkbox.interface'

const CheckboxWithRef = forwardRef<PressableType, CheckboxProps>((props, ref) => (
	<CheckboxBase
		{...props}
		ref={ref}
	/>
))

export const Checkbox = typedMemo(CheckboxWithRef)()
