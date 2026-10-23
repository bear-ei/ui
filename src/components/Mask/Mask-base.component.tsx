import {useId, type FC} from 'react'

import type {MaskBaseProps} from './Mask.interface'

import {useInteractionStateEvent} from '../../hooks'
import {RenderMask} from './Mask.render'

export const MaskBase: FC<MaskBaseProps> = ({onPress, onPressIn, onPressOut, ...renderMaskProps}) => {
	const id = useId()
	const interactionHandlers = useInteractionStateEvent({...renderMaskProps, onPress, onPressIn, onPressOut})

	return (
		<RenderMask
			{...renderMaskProps}
			id={id}
			interactionHandlers={interactionHandlers}
		/>
	)
}
