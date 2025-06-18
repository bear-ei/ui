import {forwardRef} from 'react'
import {typedMemo} from '../../utils'
import type {PressableType} from '../Touchable'
import {IconButtonBase} from './Icon-button-base.component'
import type {IconButtonProps} from './Icon-button.interface'

const IconButtonWithRef = forwardRef<PressableType, IconButtonProps>((props, ref) => (
	<IconButtonBase
		{...props}
		ref={ref}
	/>
))

export const IconButton = typedMemo(IconButtonWithRef)()
