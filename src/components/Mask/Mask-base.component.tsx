import {forwardRef, useId} from 'react'
import type {View} from 'react-native'
import {useInteractionStateEvent} from '../../hooks'
import type {MaskBaseProps} from './Mask.interface'
import {RenderMask} from './Mask.render'

export const MaskBase = forwardRef<View, MaskBaseProps>(
	({visible, defaultVisible, onPress, onPressIn, onPressOut, ...renderMaskProps}, ref) => {
		const id = useId()
		const interactionHandlers = useInteractionStateEvent({...renderMaskProps, onPress, onPressIn, onPressOut})
		const isVisible = visible ?? defaultVisible

		return (
			<RenderMask
				{...renderMaskProps}
				id={id}
				interactionHandlers={interactionHandlers}
				ref={ref}
				visible={isVisible}
			/>
		)
	}
)

MaskBase.displayName = 'MaskBase'
