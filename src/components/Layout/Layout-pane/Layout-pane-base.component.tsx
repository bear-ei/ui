import {forwardRef, useId} from 'react'
import type {View} from 'react-native'
import type {LayoutPaneBaseProps} from './Layout-pane.interface'

export const LayoutPaneBase = forwardRef<View, LayoutPaneBaseProps>(({render, ...renderProps}, ref) => {
	const id = useId()

	return render({...renderProps, ref, id})
})
