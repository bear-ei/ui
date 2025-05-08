import {forwardRef} from 'react'
import type {View} from 'react-native'
import {ButtonBase} from './Button-base.component'
import type {ButtonProps} from './Button.interface'
import {renderButton} from './Button.render'

const ButtonWithRef = forwardRef<View, ButtonProps>((props, ref) => (
	<ButtonBase
		{...props}
		ref={ref}
		renderButton={renderButton}
	/>
))

export const Button = ButtonWithRef
