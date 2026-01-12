import {EVENT_NAME, TRIGGER_ON, type EventName, type TriggerOn} from '@/constants'
import {emitter, MODAL_TYPE} from '@/contexts'
import type {StateEvent} from '@/hooks'
import {View, type MouseEvent, type PressableProps} from 'react-native'
import type {Updater} from 'use-immer'
import {ELEVATION, type ElevationLevel} from '../Elevation'
import type {PopoverContentProps} from './Popover-content'
import {POPOVER_TYPE} from './Popover.enum'
import type {
        EmitPopoverOptions,
        HandlePopoverContentAnimationFinishedOptions,
        HandlePopoverStateEventChangeOptions,
        PopoverState,
        PopoverType,
        UpdatePopoverContextMenuLayoutOptions
} from './Popover.interface'

export const updatePopoverVisible =
        (onVisible?: (visible?: boolean) => void) => (setState: Updater<PopoverState>) => (visible?: boolean) =>
                typeof visible === 'boolean' &&
                setState(draft => {
                        if (draft.visible !== visible && onVisible && visible) {
                                draft.nextVisibleEvent = () => onVisible?.(visible)
                        }

                        if (visible) {
                                draft.visible = visible
                        }
                })

export const handleElevationAnimationFinished = (setState: Updater<PopoverState>) => (elevation?: ElevationLevel) =>
        setState(draft => {
                console.info(elevation, 'elevation========>2222')
                // draft.visible = false
        })

export const updatePopoverElevation = (setState: Updater<PopoverState>) => (elevation?: ElevationLevel) =>
        setState(draft => {
                draft.elevation = elevation
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
                        draft.contextMenuLayout = {x, y}

                        if (onVisible) {
                                draft.nextVisibleEvent = () => onVisible?.(true)
                        }
                })
        }

export const handlePopoverStateChange =
        (setState: Updater<PopoverState>) =>
        ({
                childrenRef,
                eventName,
                onVisible,
                triggerEvent = TRIGGER_ON.HOVER,
                type
        }: HandlePopoverStateEventChangeOptions) => {
                const trigger = {
                        [TRIGGER_ON.FOCUS]: [EVENT_NAME.FOCUS, EVENT_NAME.BLUR],
                        [TRIGGER_ON.HOVER]: [EVENT_NAME.HOVER_IN, EVENT_NAME.HOVER_OUT],
                        [TRIGGER_ON.NONE]: [EVENT_NAME.NONE],
                        [TRIGGER_ON.PRESS]: [EVENT_NAME.PRESS_IN]
                } as Record<TriggerOn, readonly EventName[]>

                return (_event: StateEvent) => {
                        console.info(eventName, "typeof draft.visible !== 'boolean'======>")

                        if (eventName === EVENT_NAME.LAYOUT || type === POPOVER_TYPE.CONTEXT_MENU) {
                                return
                        }

                        const isTextInputPickerTriggerEvent =
                                eventName &&
                                ([EVENT_NAME.FOCUS, EVENT_NAME.PRESS_OUT] as readonly EventName[]).includes(eventName)

                        const isFocus =
                                type === POPOVER_TYPE.TEXT_INPUT_PICKER &&
                                childrenRef?.current &&
                                isTextInputPickerTriggerEvent

                        if (isFocus) {
                                childrenRef?.current?.focus()
                        }

                        const triggerEventNames = trigger[triggerEvent]

                        if (eventName && triggerEventNames?.includes(eventName)) {
                                onVisible(eventName === triggerEventNames[0])
                        }

                        setState(draft => {
                                console.info(isTextInputPickerTriggerEvent, typeof draft.visible !== 'boolean')
                                if (isTextInputPickerTriggerEvent && typeof draft.visible !== 'boolean') {
                                        draft.visible = false
                                }
                        })
                }
        }

export const emitPopoverContent =
        (id: string) =>
        ({content, ...props}: PopoverContentProps) =>
        ({visible, containerLayout}: EmitPopoverOptions) =>
                typeof visible === 'boolean' &&
                content &&
                emitter.emit('modal', {
                        id: `popoverContent--${id}`,
                        props: {...props, containerLayout, visible, content},
                        type: MODAL_TYPE.POPOVER
                })

export const unmountPopoverContent = (id: string) => () =>
        emitter.emit('modal', {
                id: `popoverContent--${id}`,
                type: MODAL_TYPE.POPOVER,
                unmount: true
        })

export const emitPopoverPressableLayout =
        (id: string) => (containerRef: React.RefObject<View | null>) => (props: PressableProps) =>
                containerRef.current?.measureInWindow((x, y, width, height) =>
                        emitter.emit('modal', {
                                id: `popoverPressableLayout--${id}`,
                                props: {...props, id, containerLayout: {x, y, width, height}},
                                type: MODAL_TYPE.PRESSABLE_LAYOUT
                        })
                )

export const unmountPopoverPressableLayout = (id: string) => () =>
        emitter.emit('modal', {
                id: `popoverPressableLayout--${id}`,
                type: MODAL_TYPE.PRESSABLE_LAYOUT,
                unmount: true
        })

export const handlePopoverContentAnimationFinished =
        ({
                onAnimationFinished,
                onContentUnmount,
                onPressableLayoutUnmount,
                type
        }: HandlePopoverContentAnimationFinishedOptions) =>
        (setState: Updater<PopoverState>) =>
        (visible?: boolean) => {
                const isMenuOrPicker =
                        type &&
                        (
                                [POPOVER_TYPE.CONTEXT_MENU, POPOVER_TYPE.TEXT_INPUT_PICKER] as readonly PopoverType[]
                        ).includes(type)

                if (!isMenuOrPicker) {
                        if (!visible) {
                                onContentUnmount?.()
                        }

                        onAnimationFinished?.(visible)

                        return
                }

                setState(draft => {
                        if (visible) {
                                draft.elevation = ELEVATION.LEVEL_2
                        }

                        if (!visible && onContentUnmount) {
                                draft.nextContentUnmountEvent = () => onContentUnmount?.()
                        }

                        if (!visible && onPressableLayoutUnmount && isMenuOrPicker) {
                                draft.nextPressableLayoutUnmountEvent = () => onPressableLayoutUnmount?.()
                        }

                        if (onAnimationFinished) {
                                draft.nextAnimationFinishedEvent = () => onAnimationFinished?.(visible)
                        }
                })
        }
