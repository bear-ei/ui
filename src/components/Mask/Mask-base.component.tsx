import {forwardRef, useId, useImperativeHandle, useRef} from 'react'
import type {View} from 'react-native'
import type {HandleStateEventChangeOptions, StateEvent} from '../../hooks'
import {useStateEvent} from '../../hooks'
import type {State} from '../Common'
import {handleMaskStateChange} from './Mask-handle'
import type {MaskBaseProps} from './Mask.interface'

export const MaskBase = forwardRef<View, MaskBaseProps>(({renderMask, ...renderMaskProps}, ref) => {
	const id = useId()
	const pressableRef = useRef<View>(null)
	const onStateEventChange = (options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
		handleMaskStateChange({...options, state, ref: pressableRef})(event)

	const interactionHandlers = useStateEvent({...renderMaskProps, onStateEventChange})

	useImperativeHandle(ref, () => (pressableRef?.current ?? {}) as View, [pressableRef])

	return renderMask({...renderMaskProps, interactionHandlers, ref: pressableRef, id})
})
