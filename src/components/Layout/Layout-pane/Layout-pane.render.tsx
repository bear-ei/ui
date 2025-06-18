import {DURATION, EASING} from '@bearei/material-token'
import {forwardRef, useMemo} from 'react'
import type {View, ViewStyle} from 'react-native'
import {LAYOUT} from '../../Common'
import type {RenderLayoutPaneProps} from './Layout-pane.interface'
import {Container} from './Layout-pane.styles'

export const RenderLayoutPane = forwardRef<View, RenderLayoutPaneProps>(
	({children, id, layout, style: rawStyle, testID, ...containerProps}, ref) => {
		const style = useMemo(
			() =>
				({
					flexDirection: layout === LAYOUT.HORIZONTAL ? 'row' : 'column'
				}) as ViewStyle,
			[layout]
		)

		return (
			<Container
				{...containerProps}
				entry={{duration: DURATION.MEDIUM_3, easing: EASING.EMPHASIZED_DECELERATE}}
				exit={{duration: DURATION.SHORT_3, easing: EASING.EMPHASIZED_ACCELERATE}}
				ref={ref}
				style={[rawStyle, style]}
				testID={testID ?? `layoutPane--${id}`}
			>
				{children}
			</Container>
		)
	}
)
