import {forwardRef, memo} from 'react'
import type {View} from 'react-native'
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

export const Checkbox = memo(CheckboxWithRef)
