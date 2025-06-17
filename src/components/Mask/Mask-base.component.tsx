import {forwardRef, useCallback, useId, useImperativeHandle, useRef} from 'react'
import type {View} from 'react-native'
import {type HandleStateEventChangeOptions, type StateEvent, useInteractionStateEvent} from '../../hooks'
import type {State} from '../Common'
import {handleMaskStateChange} from './Mask.handler'
import type {MaskBaseProps} from './Mask.interface'
import {RenderMask} from './Mask.render'

export const MaskBase = forwardRef<View, MaskBaseProps>((props, ref) => {
	const id = useId()
	const pressableRef = useRef<View>(null)
	const onStateEventChange = useCallback(
		(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
			handleMaskStateChange({...options, state, ref: pressableRef})(event),
		[]
	)

	const interactionHandlers = useInteractionStateEvent({...props, onStateEventChange})

	useImperativeHandle(ref, () => (pressableRef?.current ?? {}) as View, [pressableRef])

	return (
		<RenderMask
			{...props}
			id={id}
			interactionHandlers={interactionHandlers}
			ref={pressableRef}
		/>
	)
})
