import type {FC} from 'react'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import {MaskBase} from './Mask-base.component'
import type {MaskProps, RenderMaskProps} from './Mask.interface'
import {ContainerLayout, Content} from './Mask.styles'

const render = ({ref, interactionHandlers, id, testID, ...containerProps}: RenderMaskProps) => (
	<ContainerLayout
		{...containerProps}
		accessibilityRole='alert'
		testID={testID ?? `mask--${id}`}
	>
		<Content
			{...interactionHandlers}
			ref={ref}
			testID={`mask__content--${id}`}
		/>
	</ContainerLayout>
)

const ForwardRefMask = forwardRef<View, MaskProps>((props, ref) => (
	<MaskBase
		{...props}
		ref={ref}
		render={render}
	/>
))

export const Mask = ForwardRefMask as FC<MaskProps>
