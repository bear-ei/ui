import {DURATION, EASING} from '@bearei/element-token'
import {forwardRef} from 'react'
import type {View, ViewStyle} from 'react-native'
import {LAYOUT} from '../../Common'
import type {RenderLayoutPaneProps} from './Layout-pane.interface'
import {Container} from './Layout-pane.styles'

export const RenderLayoutPane = forwardRef<View, RenderLayoutPaneProps>(
	({children, id, layoutType, style: rawStyle, testID, ...containerProps}, ref) => {
		const style = [
			rawStyle,
			{flexDirection: layoutType === LAYOUT.HORIZONTAL ? 'row' : 'column'}
		] as ViewStyle

		return (
			<Container
				{...containerProps}
				entry={{duration: DURATION.MEDIUM_3, easing: EASING.EMPHASIZED_DECELERATE}}
				exit={{duration: DURATION.SHORT_3, easing: EASING.EMPHASIZED_ACCELERATE}}
				ref={ref}
				style={style}
				testID={testID ?? `layoutPane--${id}`}
			>
				{children}
			</Container>
		)
	}
)
