import type {RenderMaskProps} from './Mask.interface'
import {ContainerLayout, Content} from './Mask.styles'

export const renderMask = ({ref, interactionHandlers, id, testID, ...containerProps}: RenderMaskProps) => (
	<ContainerLayout
		{...containerProps}
		accessibilityRole='alert'
		accessible={true}
		testID={testID ?? `mask--${id}`}
	>
		<Content
			{...interactionHandlers}
			ref={ref}
			testID={`mask__content--${id}`}
		/>
	</ContainerLayout>
)
