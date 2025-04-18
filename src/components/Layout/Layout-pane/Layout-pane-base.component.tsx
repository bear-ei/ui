import {forwardRef, useId} from 'react'
import type {View} from 'react-native'
import type {LayoutPaneBaseProps} from './Layout-pane.interface'

export const LayoutPaneBase = forwardRef<View, LayoutPaneBaseProps>(
	({renderLayoutPane, testID, ...renderLayoutPaneProps}, ref) => {
		const id = useId()

		return renderLayoutPane({...renderLayoutPaneProps, ref, testID: testID ?? id})
	}
)
