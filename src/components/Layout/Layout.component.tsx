import type {FC} from 'react'
import {forwardRef} from 'react'
import type {View, ViewStyle} from 'react-native'
import {LAYOUT} from '../Common'
import {LayoutBase} from './Layout-base.component'
import {LayoutNavigation} from './Layout-navigation'
import {LayoutPane} from './Layout-pane'
import type {LayoutComponent, LayoutProps, RenderLayoutProps} from './Layout.interface'
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

Object.defineProperty(LayoutWithRef, 'Pane', {value: LayoutPane})
Object.defineProperty(LayoutWithRef, 'Navigation', {value: LayoutNavigation})

export const Layout = LayoutWithRef as FC<LayoutProps> as LayoutComponent
