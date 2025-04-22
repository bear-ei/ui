import {forwardRef} from 'react'
import type {View} from 'react-native'
import {MaskBase} from './Mask-base.component'
import type {MaskProps, RenderMaskProps} from './Mask.interface'
import {ContainerLayout, Content} from './Mask.styles'

const renderMask = ({ref, interactionHandlers, id, testID, ...containerProps}: RenderMaskProps) => (
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

const MaskWithRef = forwardRef<View, MaskProps>((props, ref) => (
	<MaskBase
		{...props}
		ref={ref}
		renderMask={renderMask}
	/>
))

export const Mask = MaskWithRef
