import {forwardRef} from 'react'
import type {Pressable} from 'react-native'
import {typedMemo} from '../../utils'
import {ButtonBase} from './Button-base.component'
import type {ButtonProps} from './Button.interface'

const ButtonWithRef = forwardRef<typeof Pressable, ButtonProps>((props, ref) => (
	<ButtonBase
		{...props}
		ref={ref}
	/>
))

export const Button = typedMemo(ButtonWithRef)()
