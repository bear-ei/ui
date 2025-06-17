import {forwardRef} from 'react'
import type {View} from 'react-native'
import {typedMemo} from '../../utils'
import {LayoutAnimatedBase} from './Layout-animated-base.component'
import type {LayoutAnimatedProps} from './Layout-animated.interface'

const LayoutAnimatedWithRef = forwardRef<View, LayoutAnimatedProps>((props, ref) => (
	<LayoutAnimatedBase
		{...props}
		ref={ref}
	/>
))

export const LayoutAnimated = typedMemo(LayoutAnimatedWithRef)()
