import {forwardRef, useId} from 'react'
import type {View} from 'react-native'
import type {LayoutBaseProps} from './Layout.interface'
import {RenderLayout} from './Layout.render'

export const LayoutBase = forwardRef<View, LayoutBaseProps>((props, ref) => {
	const id = useId()

	return (
		<RenderLayout
			{...props}
			id={id}
			ref={ref}
		/>
	)
})
