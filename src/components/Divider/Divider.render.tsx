import {SIZE, TYPOGRAPHY} from '@bearei/material-token'
import {LAYOUT} from '../Common'
import type {RenderDividerProps} from './Divider.interface'
import {Container, Content, Subheader} from './Divider.styles'

export const renderDivider = ({
	id,
	layout,
	size: rawSize,
	style,
	subheader,
	testID,
	...containerProps
}: RenderDividerProps) => {
	const size = subheader && layout === LAYOUT.HORIZONTAL ? SIZE.SMALL : rawSize

	return (
		<Container
			{...containerProps}
			layout={layout}
			size={size}
			testID={testID ?? `divider--${id}`}
		>
			<Content
				style={[style]}
				testID={`divider__content--${id}`}
			/>

			{subheader && (
				<Subheader
					size={SIZE.SMALL}
					testID={`divider__subheader--${id}`}
					type={TYPOGRAPHY.TITLE}
				>
					{subheader}
				</Subheader>
			)}
		</Container>
	)
}
