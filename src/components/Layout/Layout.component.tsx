import {forwardRef} from 'react'
import type {View, ViewStyle} from 'react-native'
import {LAYOUT} from '../Common'
import {LayoutBase} from './Layout-base.component'
import {LayoutNavigation} from './Layout-navigation'
import {LayoutPane} from './Layout-pane'
import type {LayoutProps, RenderLayoutProps} from './Layout.interface'
import {ContainerLayout} from './Layout.styles'

const renderLayout = ({
	children,
	contentStyle: rawContentStyle,
	defaultVisible = true,
	id,
	layout = LAYOUT.HORIZONTAL,
	testID,
	...containerProps
}: RenderLayoutProps) => {
	const contentStyle = {
		...rawContentStyle,
		flexDirection: layout === LAYOUT.HORIZONTAL ? 'row' : 'column'
	} as ViewStyle

	return (
		<ContainerLayout
			{...containerProps}
			contentStyle={contentStyle}
			defaultVisible={defaultVisible}
			testID={testID ?? `layout--${id}`}
		>
			{children}
		</ContainerLayout>
	)
}

const LayoutWithRef = forwardRef<View, LayoutProps>((props, ref) => (
	<LayoutBase
		{...props}
		ref={ref}
		renderLayout={renderLayout}
	/>
))

export const Layout = Object.assign(LayoutWithRef, {
	Pane: LayoutPane,
	Navigation: LayoutNavigation
})
