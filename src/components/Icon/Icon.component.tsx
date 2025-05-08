import {forwardRef} from 'react'
import type {View} from 'react-native'
import {IconBase} from './Icon-base.component'
import type {IconProps} from './Icon.interface'
import {renderIcon} from './Icon.render'

const IconWithRef = forwardRef<View, IconProps>((props, ref) => (
	<IconBase
		{...props}
		ref={ref}
		renderIcon={renderIcon}
	/>
))

export const Icon = IconWithRef
