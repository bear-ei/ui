import {forwardRef, useCallback, useId, useImperativeHandle, useRef} from 'react'
import type {View} from 'react-native'
import {type HandleStateEventChangeOptions, type StateEvent, useInteractionStateEvent} from '../../hooks'
import type {State} from '../Common'
import {handleMaskStateChange} from './Mask.handler'
import type {MaskBaseProps} from './Mask.interface'

export const MaskBase = forwardRef<View, MaskBaseProps>(({renderMask, ...renderMaskProps}, ref) => {
	const id = useId()
	const pressableRef = useRef<View>(null)
	const onMaskStateEventChange = useCallback(
		(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
			handleMaskStateChange({...options, state, ref: pressableRef})(event),
		[]
	)

	const interactionHandlers = useInteractionStateEvent({
		...renderMaskProps,
		onStateEventChange: onMaskStateEventChange
	})

	useImperativeHandle(ref, () => (pressableRef?.current ?? {}) as View, [pressableRef])

	return renderMask({...renderMaskProps, interactionHandlers, ref: pressableRef, id})
})
