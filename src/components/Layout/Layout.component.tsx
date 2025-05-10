import {forwardRef, memo, type FC} from 'react'
import type {View} from 'react-native'
import {LayoutBase} from './Layout-base.component'
import {LayoutNavigation} from './Layout-navigation'
import {LayoutPane} from './Layout-pane'
import type {LayoutProps} from './Layout.interface'
import {renderLayout} from './Layout.render'

const LayoutWithRef = forwardRef<View, LayoutProps>((props, ref) => (
	<LayoutBase
		{...props}
		ref={ref}
		renderLayout={renderLayout}
	/>
))

export const Layout = Object.assign(memo(LayoutWithRef) as FC<LayoutProps>, {
	Pane: LayoutPane,
	Navigation: LayoutNavigation
})
