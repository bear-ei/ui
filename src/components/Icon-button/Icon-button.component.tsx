import {forwardRef} from 'react'
import type {Pressable} from 'react-native'
import {typedMemo} from '../../utils'
import {IconButtonBase} from './Icon-button-base.component'
import type {IconButtonProps} from './Icon-button.interface'

const IconButtonWithRef = forwardRef<typeof Pressable, IconButtonProps>((props, ref) => (
	<IconButtonBase
		{...props}
		ref={ref}
	/>
))

export const IconButton = typedMemo(IconButtonWithRef)()
