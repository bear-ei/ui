import {forwardRef, memo, type FC} from 'react'
import type {View} from 'react-native'
import {LayoutPaneBase} from './Layout-pane-base.component'
import type {LayoutPaneProps} from './Layout-pane.interface'
import {renderLayoutPane} from './Layout-pane.render'

const LayoutPaneWithRef = forwardRef<View, LayoutPaneProps>((props, ref) => (
	<LayoutPaneBase
		{...props}
		ref={ref}
		renderLayoutPane={renderLayoutPane}
	/>
))

export const LayoutPane = memo(LayoutPaneWithRef) as FC<LayoutPaneProps>
