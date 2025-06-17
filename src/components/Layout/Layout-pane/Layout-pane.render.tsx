import {DURATION, EASING} from '@bearei/material-token'
import type {ViewStyle} from 'react-native'
import {LAYOUT} from '../../Common'
import type {RenderLayoutPaneProps} from './Layout-pane.interface'
import {ContainerLayout} from './Layout-pane.styles'

export const renderLayoutPane = ({
	children,
	style: rawStyle,
	defaultVisible = true,
	id,
	layout = LAYOUT.HORIZONTAL,
	testID,
	...containerProps
}: RenderLayoutPaneProps) => {
	const style = {
		flexDirection: layout === LAYOUT.HORIZONTAL ? 'row' : 'column'
	} as ViewStyle

	return (
		<ContainerLayout
			{...containerProps}
			style={[rawStyle, style]}
			defaultVisible={defaultVisible}
			entry={{duration: DURATION.MEDIUM_3, easing: EASING.EMPHASIZED_DECELERATE}}
			exit={{duration: DURATION.SHORT_3, easing: EASING.EMPHASIZED_ACCELERATE}}
			testID={testID ?? `layoutPane--${id}`}
		>
			{children}
		</ContainerLayout>
	)
}
