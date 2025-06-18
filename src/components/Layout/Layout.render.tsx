import {forwardRef, useMemo} from 'react'
import type {View, ViewStyle} from 'react-native'
import {LAYOUT} from '../Common'
import type {RenderLayoutProps} from './Layout.interface'
import {ContainerLayout} from './Layout.styles'

export const RenderLayout = forwardRef<View, RenderLayoutProps>(
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
		const style = useMemo(
			() =>
				({
					flexDirection: layout === LAYOUT.HORIZONTAL ? 'row' : 'column'
				}) as ViewStyle,
			[layout]
		)

		return (
			<ContainerLayout
				{...containerProps}
				defaultVisible={defaultVisible}
				ref={ref}
				style={[rawStyle, style]}
				testID={testID ?? `layout--${id}`}
			>
				{children}
			</ContainerLayout>
		)
	}
)
