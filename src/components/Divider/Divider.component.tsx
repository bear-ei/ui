import {SIZE, TYPOGRAPHY} from '@bearei/material-token'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import {LAYOUT} from '../Common'
import {DividerBase} from './Divider-base.component'
import type {DividerProps, RenderDividerProps} from './Divider.interface'
import {Container, Content, Subheader} from './Divider.styles'

const renderDivider = ({
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

const DividerWithRef = forwardRef<View, DividerProps>((props, ref) => (
	<DividerBase
		{...props}
		ref={ref}
		renderDivider={renderDivider}
	/>
))

export const Divider = DividerWithRef
