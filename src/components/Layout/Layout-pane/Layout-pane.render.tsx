import {DURATION, EASING} from '@bearei/material-token'
import {forwardRef} from 'react'
import type {View, ViewStyle} from 'react-native'
import {LAYOUT} from '../../Common'
import type {RenderLayoutPaneProps} from './Layout-pane.interface'
import {ContainerLayout} from './Layout-pane.styles'

export const RenderLayoutPane = forwardRef<View, RenderLayoutPaneProps>(
	(
		{
			children,
			defaultVisible = true,
			id,
			layout = LAYOUT.HORIZONTAL,
			style: rawStyle,
			testID,
			...containerProps
		},
		ref
	) => {
		const style = {
			flexDirection: layout === LAYOUT.HORIZONTAL ? 'row' : 'column'
		} as ViewStyle

		return (
			<ContainerLayout
				{...containerProps}
				defaultVisible={defaultVisible}
				entry={{duration: DURATION.MEDIUM_3, easing: EASING.EMPHASIZED_DECELERATE}}
				exit={{duration: DURATION.SHORT_3, easing: EASING.EMPHASIZED_ACCELERATE}}
				ref={ref}
				style={[rawStyle, style]}
				testID={testID ?? `layoutPane--${id}`}
			>
				{children}
			</ContainerLayout>
		)
	}
)
