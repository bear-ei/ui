import {FC, useId, useImperativeHandle, useRef} from 'react'
import {View} from 'react-native'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../hooks'
import {State} from '../Common'
import {handleMaskStateChange} from './Mask-handle'
import {MaskBaseProps} from './Mask.interface'

export const MaskBase: FC<MaskBaseProps> = ({render, ref, ...renderProps}) => {
        const id = useId()
        const pressableRef = useRef<View>(null)
        const onStateEventChange = (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
                handleMaskStateChange({...options, state, ref: pressableRef})(event)

        const onStateEvent = useOnStateEvent({...renderProps, onStateEventChange})

        useImperativeHandle(ref, () => (pressableRef?.current ? pressableRef?.current : {}) as View, [pressableRef])

        return render({...renderProps, onStateEvent, ref: pressableRef, id})
}
