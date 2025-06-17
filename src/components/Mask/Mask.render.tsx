import {forwardRef} from 'react'
import type {View} from 'react-native'
import type {RenderMaskProps} from './Mask.interface'
import {ContainerLayout, Content} from './Mask.styles'

export const RenderMask = forwardRef<View, RenderMaskProps>(
	({interactionHandlers, id, testID, ...containerProps}, ref) => (
		<ContainerLayout
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
		</ContainerLayout>
	)
)
