import {forwardRef} from 'react'
import type {View} from 'react-native'
import {typedMemo} from '../../utils'
import {IconBase} from './Icon-base.component'
import type {IconProps} from './Icon.interface'

const IconWithRef = forwardRef<View, IconProps>((props, ref) => (
	<IconBase
		{...props}
		ref={ref}
	/>
))

export const Icon = typedMemo(IconWithRef)()
