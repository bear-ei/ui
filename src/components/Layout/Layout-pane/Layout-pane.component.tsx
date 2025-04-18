import {DURATION, EASING} from '@bearei/material-token'
import type {FC} from 'react'
import {forwardRef} from 'react'
import type {View, ViewStyle} from 'react-native'
import {LAYOUT} from '../../Common'
import {LayoutPaneBase} from './Layout-pane-base.component'
import type {LayoutPaneProps, RenderLayoutPaneProps} from './Layout-pane.interface'
import {ContainerLayout} from './Layout-pane.styles'

const renderLayoutPane = ({
	children,
	contentStyle: rawContentStyle,
	defaultVisible = true,
	layout = LAYOUT.HORIZONTAL,
	testID,
	...containerProps
}: RenderLayoutPaneProps) => {
	const contentStyle = {
		...rawContentStyle,
		flexDirection: layout === LAYOUT.HORIZONTAL ? 'row' : 'column'
	} as ViewStyle

	return (
		<ContainerLayout
			{...containerProps}
			contentStyle={contentStyle}
			defaultVisible={defaultVisible}
			entry={{duration: DURATION.MEDIUM_3, easing: EASING.EMPHASIZED_DECELERATE}}
			exit={{duration: DURATION.SHORT_3, easing: EASING.EMPHASIZED_ACCELERATE}}
			testID={`layoutPane--${testID}`}
		>
			{children}
		</ContainerLayout>
	)
}

const LayoutPaneWithRef = forwardRef<View, LayoutPaneProps>((props, ref) => (
	<LayoutPaneBase
		{...props}
		ref={ref}
		renderLayoutPane={renderLayoutPane}
	/>
))

export const LayoutPane = LayoutPaneWithRef as FC<LayoutPaneProps>
