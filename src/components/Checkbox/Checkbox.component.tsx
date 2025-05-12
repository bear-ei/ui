import {forwardRef} from 'react'
import type {View} from 'react-native'
import {typedMemo} from '../../utils'
import {CheckboxBase} from './Checkbox-base.component'
import type {CheckboxProps} from './Checkbox.interface'
import {renderCheckbox} from './Checkbox.render'

const CheckboxWithRef = forwardRef<View, CheckboxProps>((props, ref) => (
	<CheckboxBase
		{...props}
		ref={ref}
		renderCheckbox={renderCheckbox}
	/>
))

export const Checkbox = typedMemo(CheckboxWithRef)()
