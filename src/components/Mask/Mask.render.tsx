import {forwardRef} from 'react'
import type {View} from 'react-native'
import type {RenderMaskProps} from './Mask.interface'
import {Container, Content} from './Mask.styles'

export const RenderMask = forwardRef<View, RenderMaskProps>(
	({interactionHandlers, id, testID, ...containerProps}, ref) => (
		<Container
			{...containerProps}
			accessibilityRole='alert'
			accessible={true}
			ref={ref}
			testID={testID ?? `mask--${id}`}
		>
			<Content
				{...interactionHandlers}
				testID={`mask__content--${id}`}
			/>
		</Container>
	)
)
