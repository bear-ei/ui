import {forwardRef} from 'react'
import type {View, ViewStyle} from 'react-native'
import {LAYOUT} from '../Common'
import type {RenderLayoutProps} from './Layout.interface'
import {Container} from './Layout.styles'

export const RenderLayout = forwardRef<View, RenderLayoutProps>(
	({children, id, style: rawStyle, testID, layoutType, ...containerProps}, ref) => {
		const style = [
			rawStyle,
			{flexDirection: layoutType === LAYOUT.HORIZONTAL ? 'row' : 'column'}
		] as ViewStyle

		return (
			<Container
				{...containerProps}
				ref={ref}
				style={style}
				testID={testID ?? `layout--${id}`}
			>
				{children}
			</Container>
		)
	}
)
