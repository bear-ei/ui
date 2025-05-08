import type {ViewStyle} from 'react-native'
import {LAYOUT} from '../Common'
import type {RenderLayoutProps} from './Layout.interface'
import {ContainerLayout} from './Layout.styles'

export const renderLayout = ({
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
