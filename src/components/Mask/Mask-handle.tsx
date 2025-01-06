import {StateEvent} from '../../hooks'
import {EventName} from '../Common'
import {HandleMaskStateChangeOptions} from './Mask.interface'

export const handleMaskStateChange =
        ({eventName, ref}: HandleMaskStateChangeOptions) =>
        (_event: StateEvent) => {
                const nextEvent = {
                        pressIn: () => ref.current?.focus()
                } as Record<EventName, () => void>

                if (eventName) {
                        nextEvent[eventName]?.()
                }
        }
