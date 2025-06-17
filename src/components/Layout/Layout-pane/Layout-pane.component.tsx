import {forwardRef} from 'react'
import type {View} from 'react-native'
import {typedMemo} from '../../../utils'
import {LayoutPaneBase} from './Layout-pane-base.component'
import type {LayoutPaneProps} from './Layout-pane.interface'

const LayoutPaneWithRef = forwardRef<View, LayoutPaneProps>((props, ref) => (
	<LayoutPaneBase
		{...props}
		ref={ref}
	/>
))

export const LayoutPane = typedMemo(LayoutPaneWithRef)()
