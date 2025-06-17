import {forwardRef, useId} from 'react'
import type {View} from 'react-native'
import type {LayoutNavigationBaseProps} from './Layout-navigation.interface'
import {RenderLayoutNavigation} from './Layout-navigation.render'

export const LayoutNavigationBase = forwardRef<View, LayoutNavigationBaseProps>((props, ref) => {
	const id = useId()

	return (
		<RenderLayoutNavigation
			{...props}
			id={id}
			ref={ref}
		/>
	)
})
