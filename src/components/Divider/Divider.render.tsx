import {SIZE, TYPOGRAPHY} from '@bearei/element-token'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import {LAYOUT} from '../Common'
import type {RenderDividerProps} from './Divider.interface'
import {Container, Content, Subheader} from './Divider.styles'

export const RenderDivider = forwardRef<View, RenderDividerProps>(
	({id, layoutType, size: rawSize, style, subheader, testID, ...containerProps}: RenderDividerProps, ref) => {
		const size = subheader && layoutType === LAYOUT.HORIZONTAL ? SIZE.SMALL : rawSize

		return (
			<Container
				{...containerProps}
				layoutType={layoutType}
				ref={ref}
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
)
