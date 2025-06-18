import {forwardRef, useMemo} from 'react'
import type {View, ViewStyle} from 'react-native'
import {LAYOUT} from '../Common'
import type {RenderLayoutProps} from './Layout.interface'
import {Container} from './Layout.styles'

export const RenderLayout = forwardRef<View, RenderLayoutProps>(
	({children, id, style: rawStyle, testID, layout, ...containerProps}, ref) => {
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
				ref={ref}
				style={[rawStyle, style]}
				testID={testID ?? `layout--${id}`}
			>
				{children}
			</Container>
		)
	}
)
