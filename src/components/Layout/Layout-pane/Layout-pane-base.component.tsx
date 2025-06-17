import {forwardRef, useId} from 'react'
import type {View} from 'react-native'
import type {LayoutPaneBaseProps} from './Layout-pane.interface'
import {RenderLayoutPane} from './Layout-pane.render'

export const LayoutPaneBase = forwardRef<View, LayoutPaneBaseProps>((props, ref) => {
	const id = useId()

	return (
		<RenderLayoutPane
			{...props}
			id={id}
			ref={ref}
		/>
	)
})
