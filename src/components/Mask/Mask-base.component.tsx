import {FC, useId, useImperativeHandle, useRef} from 'react'
import {View} from 'react-native'
import {OnStateEventChangedOptions, StateEvent, useOnStateEvent} from '../../hooks'
import {EventName, State} from '../Common'
import {HandleMaskStateChangedOptions, MaskBaseProps} from './Mask.interface'

const handleMaskStateChanged = ({eventName, maskRef}: HandleMaskStateChangedOptions) => {
        const nextEvent = {
                pressIn: () => maskRef?.current?.focus()
        } as Record<EventName, () => void>

        return (_event: StateEvent) => {
                if (eventName === 'layout') {
                        return
                }

                if (eventName) {
                        nextEvent[eventName]?.()
                }
        }
}

export const MaskBase: FC<MaskBaseProps> = ({render, ref, ...renderProps}) => {
        const id = useId()
        const maskRef = useRef<View>(null)
        const onStateEventChange = (options: OnStateEventChangedOptions) => (state: State) => (event: StateEvent) =>
                handleMaskStateChanged({...options, state, maskRef})(event)

        const onStateEvent = useOnStateEvent({...renderProps, onStateEventChange})

        useImperativeHandle(ref, () => (maskRef?.current ? maskRef?.current : {}) as View, [])

        return render({
                ...renderProps,
                id,
                onStateEvent,
                ref: maskRef
        })
}
