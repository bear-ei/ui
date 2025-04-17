import {SIZE, TYPOGRAPHY} from '@bearei/material-token'
import type {FC} from 'react'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import {LAYOUT} from '../Common'
import {DividerBase} from './Divider-base.component'
import type {DividerProps, RenderDividerProps} from './Divider.interface'
import {Container, Content, Subheader} from './Divider.styles'

const renderDivider = ({subheader, style, layout, size: rawSize, testID, ...containerProps}: RenderDividerProps) => {
	const size = subheader && layout === LAYOUT.HORIZONTAL ? SIZE.SMALL : rawSize

	return (
		<Container
			{...containerProps}
			layout={layout}
			size={size}
			testID={`divider--${testID}`}
		>
			<Content
				style={[style]}
				testID={`divider__content--${testID}`}
			/>

			{subheader && (
				<Subheader
					size={SIZE.SMALL}
					testID={`divider__subheader--${testID}`}
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

export const Divider: FC<DividerProps> = DividerWithRef
