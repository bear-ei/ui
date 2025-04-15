import type {FC} from 'react'
import {forwardRef} from 'react'
import type {View, ViewStyle} from 'react-native'
import {LAYOUT} from '../Common'
import {LayoutBase} from './Layout-base.component'
import {LayoutNavigation} from './Layout-navigation'
import {LayoutPane} from './Layout-pane'
import type {LayoutComponent, LayoutProps, RenderLayoutProps} from './Layout.interface'
import {ContainerLayout} from './Layout.styles'

const render = ({
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

const ForwardRefLayout = forwardRef<View, LayoutProps>((props, ref) => (
	<LayoutBase
		{...props}
		ref={ref}
		render={render}
	/>
))

Object.defineProperty(ForwardRefLayout, 'Pane', {value: LayoutPane})
Object.defineProperty(ForwardRefLayout, 'Navigation', {value: LayoutNavigation})

export const Layout = ForwardRefLayout as FC<LayoutProps> as LayoutComponent
