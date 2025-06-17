import type {ViewStyle} from 'react-native'
import {LAYOUT} from '../Common'
import type {RenderLayoutProps} from './Layout.interface'
import {ContainerLayout} from './Layout.styles'

export const renderLayout = ({
	children,
	style: rawStyle,
	defaultVisible = true,
	id,
	layout = LAYOUT.HORIZONTAL,
	testID,
	...containerProps
}: RenderLayoutProps) => {
	const style = {
		flexDirection: layout === LAYOUT.HORIZONTAL ? 'row' : 'column'
	} as ViewStyle

	return (
		<ContainerLayout
			{...containerProps}
			style={[rawStyle, style]}
			defaultVisible={defaultVisible}
			testID={testID ?? `layout--${id}`}
		>
			{children}
		</ContainerLayout>
	)
}
