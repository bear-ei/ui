import {forwardRef} from 'react'

import type {PressableType} from '../Touchable'
import type {ButtonProps} from './Button.interface'

import {typedMemo} from '../../utils'
import {ButtonBase} from './Button-base.component'

const ButtonWithRef = forwardRef<PressableType, ButtonProps>((props, ref) => (
	<ButtonBase
		{...props}
		ref={ref}
	/>
))

ButtonWithRef.displayName = 'Button'

export const Button = typedMemo(ButtonWithRef)
