import {StateEventType} from '../../hooks'
import {EventName} from '../Common'
import {HandleMaskStateChangeOptions} from './Mask.interface'

export const handleMaskStateChange =
        ({eventName}: HandleMaskStateChangeOptions) =>
        (_event: StateEventType) => {
                const nextEvent = {
                        /**
                         * TODO: The current logic is designed to solve the problem that there may be other forms that
                         * have gained focus while the modal was present, and they may not lose focus correctly when
                         * the modal is closed. However, there is a problem with the focus style not being able to be
                         * removed on MACOS.  The focus acquisition is not enabled for the time being..
                         */
                        pressIn: () => {}
                } as Record<EventName, () => void>

                if (eventName) {
                        nextEvent[eventName]?.()
                }
        }
