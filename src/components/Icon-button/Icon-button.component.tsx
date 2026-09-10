import {typedMemo} from '@/utils'
import {forwardRef} from 'react'
import type {PressableType} from '../Touchable'
import {IconButtonBase} from './Icon-button-base.component'
import type {IconButtonProps} from './Icon-button.interface'

const IconButtonWithRef = forwardRef<PressableType, IconButtonProps>((props, ref) => (
	<IconButtonBase
		{...props}
		ref={ref}
	/>
))

IconButtonWithRef.displayName = 'IconButtonWithRef'

export const IconButton = typedMemo(IconButtonWithRef)()
