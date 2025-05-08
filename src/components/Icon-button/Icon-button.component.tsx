import {forwardRef} from 'react'
import type {View} from 'react-native'
import {IconButtonBase} from './Icon-button-base.component'
import type {IconButtonProps} from './Icon-button.interface'
import {renderIconButton} from './Icon-button.render'

const ButtonWithRef = forwardRef<View, IconButtonProps>((props, ref) => (
	<IconButtonBase
		{...props}
		ref={ref}
		renderIconButton={renderIconButton}
	/>
))

export const IconButton = ButtonWithRef
