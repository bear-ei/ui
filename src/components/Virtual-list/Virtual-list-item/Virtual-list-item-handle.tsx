import {Updater} from 'use-immer'
import {VirtualListItemState} from './Virtual-list-item.interface'

export const handleVirtualListItemVisible =
        (setState: Updater<VirtualListItemState>) => (onVisible?: (value?: boolean) => void) => {
                const handleNextVisibleEvent = () => onVisible?.(false)

                setState(draft => {
                        draft.nextVisibleEvent = handleNextVisibleEvent
                        draft.visible = false
                })
        }
