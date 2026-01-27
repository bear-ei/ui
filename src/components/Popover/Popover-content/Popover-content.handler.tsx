import {EVENT_NAME, type EventName, TRIGGER_ON, type TriggerOn} from '@/constants'
import type {StateEvent} from '@/hooks'
import type {WritableDraft} from 'immer'
import type {LayoutChangeEvent, View} from 'react-native'
import type {Updater} from 'use-immer'
import {POPOVER_CONTENT_POSITION, POPOVER_TYPE, type PopoverContentPosition} from '..'
import type {
        GetSafeMenuPositionOptions,
        HandlePopoverContentPositionWindowOptions,
        HandlePopoverContentStateEventChangeOptions,
        PopoverContentState,
        UpdatePopoverContentInvertOptions,
        UpdatePopoverContentPositionOptions
} from './Popover-content.interface'

export const handlePopoverContentStateChange =
        ({eventName, onVisible, triggerEvent = TRIGGER_ON.HOVER}: HandlePopoverContentStateEventChangeOptions) =>
        (setState: Updater<PopoverContentState>) => {
                const updatePopoverContentLayout = (event: LayoutChangeEvent) => {
                        const {height, width} = event.nativeEvent.layout

                        setState(draft => {
                                const {width: prevWidth, height: prevHeight} = draft.layout

                                if (prevWidth !== width || prevHeight !== height) {
                                        draft.layout.height = height
                                        draft.layout.width = width
                                }
                        })
                }

                return (event: StateEvent) => {
                        if (eventName === EVENT_NAME.LAYOUT) {
                                updatePopoverContentLayout(event as LayoutChangeEvent)

                                return
                        }

                        const trigger = {
                                [TRIGGER_ON.FOCUS]: [EVENT_NAME.FOCUS, EVENT_NAME.BLUR],
                                [TRIGGER_ON.HOVER]: [EVENT_NAME.HOVER_IN, EVENT_NAME.HOVER_OUT],
                                [TRIGGER_ON.NONE]: [EVENT_NAME.NONE],
                                [TRIGGER_ON.PRESS]: [EVENT_NAME.PRESS_IN]
                        } as Record<TriggerOn, readonly EventName[]>

                        const triggerEventNames = trigger[triggerEvent]

                        if (eventName && triggerEventNames?.includes(eventName)) {
                                onVisible?.(eventName === triggerEventNames[0])
                        }
                }
        }

export const handlePopoverContentAnimationFinished =
        (onAnimationFinished?: (visible?: boolean) => void) =>
        (setState: Updater<PopoverContentState>) =>
        (visible?: boolean) =>
                typeof visible === 'boolean' &&
                setState(draft => {
                        if (draft.invert && !visible) {
                                draft.invert = false
                        }

                        if (onAnimationFinished) {
                                draft.nextAnimationFinishedEvent = () => onAnimationFinished?.(visible)
                        }
                })

export const getSafeMenuPosition = ({
        height,
        margin = 8,
        offset = 0,
        width,
        windowHeight = 0,
        windowWidth = 0,
        x = 0,
        y = 0
}: GetSafeMenuPositionOptions) => {
        let left = x + offset
        let top = y + offset

        if (left < margin) {
                left = margin
        }

        if (left + width + margin > windowWidth) {
                left = Math.max(windowWidth - width - margin, margin)
        }

        if (top < margin) {
                top = margin
        }

        if (top + height + margin > windowHeight) {
                top = Math.max(windowHeight - height - margin, margin)
        }

        return {left, top}
}

export const updatePopoverContentPosition =
        ({popoverContentPosition, setState, type, containerLayout, theme}: UpdatePopoverContentPositionOptions) =>
        (ref: React.RefObject<View | null>) => {
                const updatePopoverContentInvert =
                        ({height, x, y, width, windowHeight, windowWidth}: UpdatePopoverContentInvertOptions) =>
                        (draft: WritableDraft<PopoverContentState>) => {
                                draft.invert =
                                        popoverContentPosition?.startsWith('HORIZONTAL') ?
                                                width + x >= windowWidth && x > width
                                        :       height + y >= windowHeight && y > height
                        }

                return ({windowHeight, visible, windowWidth, layout}: HandlePopoverContentPositionWindowOptions) => {
                        if (!visible) {
                                return
                        }

                        if (type === POPOVER_TYPE.CONTEXT_MENU) {
                                setState(draft => {
                                        const {left, top} = getSafeMenuPosition({
                                                height: layout.height,
                                                margin: theme.token.spacing.medium,
                                                offset: theme.token.spacing.small,
                                                width: layout.width,
                                                windowHeight,
                                                windowWidth,
                                                x: containerLayout?.x,
                                                y: containerLayout?.y
                                        })

                                        draft.menuPosition = {left, top}
                                })

                                return
                        }

                        ref?.current?.measureInWindow((x, y, width, height) =>
                                setState(
                                        updatePopoverContentInvert({
                                                height,
                                                width,
                                                windowHeight,
                                                windowWidth,
                                                x,
                                                y
                                        })
                                )
                        )
                }
        }

export const getPopoverContentPosition = (popoverContentPosition?: PopoverContentPosition) => (invert?: boolean) => {
        const position = {
                invertY:
                        popoverContentPosition === POPOVER_CONTENT_POSITION.VERTICAL_END ?
                                POPOVER_CONTENT_POSITION.VERTICAL_START
                        :       POPOVER_CONTENT_POSITION.VERTICAL_END,

                invertX:
                        popoverContentPosition === POPOVER_CONTENT_POSITION.HORIZONTAL_END ?
                                POPOVER_CONTENT_POSITION.HORIZONTAL_START
                        :       POPOVER_CONTENT_POSITION.HORIZONTAL_END
        }

        const invertPosition = (
                popoverContentPosition?.startsWith('HORIZONTAL') ?
                        position.invertX
                :       position.invertY) as PopoverContentPosition

        return invert ? invertPosition : popoverContentPosition
}

export const handleMaskPressOut = (onVisible?: (value?: boolean) => void) => () => onVisible?.(false)
