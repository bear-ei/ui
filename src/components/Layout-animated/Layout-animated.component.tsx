import {forwardRef} from 'react'
import type {View} from 'react-native'
import {LayoutAnimatedBase} from './Layout-animated-base.component'
import type {LayoutAnimatedProps} from './Layout-animated.interface'
import {renderLayoutAnimated} from './Layout-animated.render'

const LayoutAnimatedWithRef = forwardRef<View, LayoutAnimatedProps>((props, ref) => (
	<LayoutAnimatedBase
		{...props}
		ref={ref}
		renderLayoutAnimated={renderLayoutAnimated}
	/>
))

export const LayoutAnimated = LayoutAnimatedWithRef
