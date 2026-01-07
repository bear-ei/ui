import type {State} from '@/constants'
import {
        type HandleStateEventChangeOptions,
        type StateEvent,
        useClearComponentEvent,
        useInteractionStateEvent
} from '@/hooks'
import {debounce} from '@/utils'
import {cloneElement, forwardRef, useCallback, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import {View} from 'react-native'
import {useImmer} from 'use-immer'
import {POPOVER_TYPE} from './Popover.enum'
import {
        emitPopover,
        handlePopoverStateChange,
        unmountPopover,
        updatePopoverContextMenuLayout,
        updatePopoverVisibility
} from './Popover.handler'
import type {PopoverBaseProps, PopoverState} from './Popover.interface'
import {RenderPopover} from './Popover.render'

export const PopoverBase = forwardRef<View, PopoverBaseProps>(
        (
                {
                        content,
                        defaultVisible,
                        disabled: isDisabled = false,
                        elevation,
                        onVisible: rawOnVisible,
                        popoverContentPosition,
                        shape,
                        triggerEvent,
                        type = POPOVER_TYPE.PLAIN,
                        visible: rawVisible,
                        children: rawChildren,
                        onKeyDown,
                        ...renderPopoverProps
                },
                ref
        ) => {
                const [{popoverVisible: isPopoverVisible, nextVisibilityEvent, menuContainerLayout}, setState] =
                        useImmer<PopoverState>({})

                useClearComponentEvent(setState)

                const isVisible = rawVisible ?? defaultVisible
                const containerRef = useRef<View>(null)
                const id = useId()
                const onVisible = useMemo(
                        () => debounce(updatePopoverVisibility(rawOnVisible)(setState))(150),
                        [rawOnVisible, setState]
                )

                const onClosed = useMemo(() => debounce(unmountPopover(id))(150), [id])
                const onContextMenu = useMemo(
                        () => updatePopoverContextMenuLayout(setState)({onVisible, disabled: isDisabled}),
                        [isDisabled, onVisible, setState]
                )

                const onStateEventChange = useCallback(
                        (options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
                                handlePopoverStateChange({...options, onVisible, state, triggerEvent, type})(event),
                        [onVisible, triggerEvent, type]
                )

                const interactionHandlers = useInteractionStateEvent({
                        ...renderPopoverProps,
                        disabled: isDisabled,
                        onStateEventChange
                })

                const {onFocus, onHoverIn, ...childrenInteractionHandlers} = interactionHandlers
                const childrenElement =
                        rawChildren &&
                        cloneElement(rawChildren, {
                                onFocus,
                                onHoverIn,
                                ...childrenInteractionHandlers,
                                ...(type === POPOVER_TYPE.CONTEXT_MENU && {onContextMenu}),
                                ...(type === POPOVER_TYPE.TEXT_INPUT_PICKER && {onKeyPress: onKeyDown})
                        })

                const runEmit = useMemo(
                        () =>
                                emitPopover(id)({
                                        content,
                                        elevation,
                                        onClosed,
                                        onVisible,
                                        popoverContentPosition,
                                        shape,
                                        triggerEvent,
                                        type
                                }),
                        [content, elevation, id, onClosed, onVisible, popoverContentPosition, shape, triggerEvent, type]
                )

                const runUnmount = useMemo(() => unmountPopover(id), [id])
                const runUpdateVisible = useMemo(
                        () => debounce(updatePopoverVisibility(rawOnVisible)(setState))(150),
                        [rawOnVisible, setState]
                )

                useImperativeHandle(ref, () => (containerRef?.current ?? {}) as View, [])

                useEffect(() => {
                        if (type === POPOVER_TYPE.CONTEXT_MENU) {
                                runEmit({containerLayout: menuContainerLayout, visible: isPopoverVisible})

                                return
                        }

                        containerRef.current?.measureInWindow((x, y, width, height) =>
                                runEmit({containerLayout: {x, y, width, height}, visible: isPopoverVisible})
                        )
                }, [isPopoverVisible, menuContainerLayout, runEmit, type])

                useEffect(() => {
                        runUpdateVisible(isVisible)
                }, [isVisible, runUpdateVisible])

                useEffect(() => {
                        nextVisibilityEvent?.()
                }, [nextVisibilityEvent])

                useEffect(
                        () => () => {
                                runUnmount()
                        },
                        [runUnmount]
                )

                return (
                        <RenderPopover
                                {...renderPopoverProps}
                                children={childrenElement}
                                elevation={elevation}
                                id={id}
                                interactionHandlers={interactionHandlers}
                                onContextMenu={onContextMenu}
                                ref={containerRef}
                                shape={shape}
                                type={type}
                        />
                )
        }
)

PopoverBase.displayName = 'PopoverBase'
