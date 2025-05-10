import {forwardRef, memo, type FC} from 'react'
import type {View} from 'react-native'
import {IconButtonBase} from './Icon-button-base.component'
import type {IconButtonProps} from './Icon-button.interface'
import {renderIconButton} from './Icon-button.render'

const IconButtonWithRef = forwardRef<View, IconButtonProps>((props, ref) => (
	<IconButtonBase
		{...props}
		ref={ref}
		renderIconButton={renderIconButton}
	/>
))

export const IconButton = memo(IconButtonWithRef) as FC<IconButtonProps>
