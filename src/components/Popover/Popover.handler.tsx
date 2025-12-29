import {EVENT_NAME, TRIGGER_ON, type EventName, type TriggerOn} from '@/constants'
import {emitter, MODAL_TYPE} from '@/contexts'
import type {StateEvent} from '@/hooks'
import type {MouseEvent} from 'react-native'
import type {Updater} from 'use-immer'
import type {PopoverContentProps} from './Popover-content'
import {POPOVER_TYPE} from './Popover.enum'
import type {
        EmitPopoverOptions,
        HandlePopoverStateEventChangeOptions,
        PopoverState,
        UpdatePopoverContextMenuLayoutOptions
} from './Popover.interface'

export const updatePopoverVisibility =
        (onVisible?: (value?: boolean) => void) => (setState: Updater<PopoverState>) => (value?: boolean) =>
                typeof value === 'boolean' &&
                setState(draft => {
                        if (draft.popoverVisible !== value && onVisible) {
                                draft.nextVisibilityEvent = () => onVisible?.(value)
                        }

                        draft.popoverVisible = value
                })

export const updatePopoverContextMenuLayout =
        (setState: Updater<PopoverState>) =>
        ({disabled, onVisible}: UpdatePopoverContextMenuLayoutOptions) =>
        (event: MouseEvent) => {
                if (disabled) {
                        return
                }

                event.preventDefault()
                const {x, y} = event.nativeEvent

                setState(draft => {
                        draft.menuContainerLayout = {x, y}

                        if (onVisible) {
                                draft.nextVisibilityEvent = () => onVisible?.(true)
                        }
                })
        }

export const handlePopoverStateChange = ({
        eventName,
        onVisible,
        triggerEvent = TRIGGER_ON.HOVER,
        type
}: HandlePopoverStateEventChangeOptions) => {
        const trigger = {
                [TRIGGER_ON.FOCUS]: [EVENT_NAME.FOCUS, EVENT_NAME.BLUR],
                [TRIGGER_ON.HOVER]: [EVENT_NAME.HOVER_IN, EVENT_NAME.HOVER_OUT],
                [TRIGGER_ON.PRESS]: [EVENT_NAME.PRESS_IN]
        } as Record<TriggerOn, readonly EventName[]>

        return (_event: StateEvent) => {
                if (eventName === EVENT_NAME.LAYOUT || type === POPOVER_TYPE.CONTEXT_MENU) {
                        return
                }

                const triggerEventNames = trigger[triggerEvent]

                if (eventName && triggerEventNames?.includes(eventName)) {
                        onVisible(eventName === triggerEventNames[0])
                }
        }
}

export const emitPopover =
        (id: string) =>
        ({content, ...props}: PopoverContentProps) =>
        ({visible, containerLayout}: EmitPopoverOptions) =>
                typeof visible === 'boolean' &&
                content &&
                emitter.emit('modal', {
                        id: `popover--${id}`,
                        props: {...props, containerLayout, visible, content},
                        type: MODAL_TYPE.POPOVER
                })

export const unmountPopover = (id?: string) => () =>
        emitter.emit('modal', {
                id: `popover--${id}`,
                type: MODAL_TYPE.POPOVER,
                unmount: true
        })
