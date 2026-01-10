import type {State} from '@/constants'
import {
        type HandleStateEventChangeOptions,
        type StateEvent,
        useClearComponentEvent,
        useInteractionStateEvent
} from '@/hooks'
import {debounce} from '@/utils'
import {cloneElement, forwardRef, useCallback, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import {TextInput, View} from 'react-native'
import {useImmer} from 'use-immer'
import {POPOVER_TYPE} from './Popover.enum'
import {
        emitPopoverContent,
        emitPopoverPressableLayout,
        handlePopoverContentAnimationFinished,
        handlePopoverStateChange,
        unmountPopoverContent,
        unmountPopoverPressableLayout,
        updatePopoverContextMenuLayout,
        updatePopoverVisibility
} from './Popover.handler'
import type {PopoverBaseProps, PopoverState} from './Popover.interface'
import {RenderPopover} from './Popover.render'

export const PopoverBase = forwardRef<View, PopoverBaseProps>(
        (
                {
                        children: rawChildren,
                        content,
                        defaultVisible,
                        disabled: isDisabled = false,
                        elevation,
                        onKeyDown,
                        onVisible: rawOnVisible,
                        popoverContentPosition,
                        shape,
                        triggerEvent,
                        type = POPOVER_TYPE.PLAIN,
                        visible: rawVisible,
                        onAnimationFinished: rawOnAnimationFinished,
                        ...renderPopoverProps
                },
                ref
        ) => {
                const [{popoverVisible: isPopoverVisible, nextVisibilityEvent, contextMenuLayout}, setState] =
                        useImmer<PopoverState>({})

                useClearComponentEvent(setState)

                const isVisible = rawVisible ?? defaultVisible
                const containerRef = useRef<View>(null)
                const childrenRef = useRef<TextInput>(null)
                const id = useId()
                const onVisible = useMemo(
                        () => debounce(updatePopoverVisibility(rawOnVisible)(setState))(150),
                        [rawOnVisible, setState]
                )

                const onContentUnmount = useMemo(() => debounce(unmountPopoverContent(id))(150), [id])
                const onContentAnimationFinished = useMemo(
                        () => handlePopoverContentAnimationFinished(onContentUnmount)(rawOnAnimationFinished),
                        [onContentUnmount, rawOnAnimationFinished]
                )

                const onContextMenu = useMemo(
                        () => updatePopoverContextMenuLayout(setState)({onVisible, disabled: isDisabled}),
                        [isDisabled, onVisible, setState]
                )

                const onStateEventChange = useCallback(
                        (options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
                                handlePopoverStateChange({
                                        ...options,
                                        childrenRef,
                                        onVisible,
                                        state,
                                        triggerEvent,
                                        type
                                })(event),
                        [onVisible, triggerEvent, type]
                )

                const interactionHandlers = useInteractionStateEvent({
                        ...renderPopoverProps,
                        disabled: isDisabled,
                        onStateEventChange
                })

                const runEmitContent = useMemo(
                        () =>
                                emitPopoverContent(id)({
                                        content,
                                        elevation,
                                        onAnimationFinished: onContentAnimationFinished,
                                        onVisible,
                                        popoverContentPosition,
                                        shape,
                                        triggerEvent,
                                        type
                                }),
                        [
                                content,
                                elevation,
                                id,
                                onContentAnimationFinished,
                                onVisible,
                                popoverContentPosition,
                                shape,
                                triggerEvent,
                                type
                        ]
                )

                const runEmitPressableLayout = useMemo(() => emitPopoverPressableLayout(id)(containerRef), [id])
                const runUnmountContent = useMemo(() => unmountPopoverContent(id), [id])
                const runUnmountPressableLayout = useMemo(() => unmountPopoverPressableLayout(id), [id])
                const runUpdateVisible = useMemo(
                        () => debounce(updatePopoverVisibility(rawOnVisible)(setState))(150),
                        [rawOnVisible, setState]
                )

                const children = cloneElement(rawChildren ?? <></>, {
                        ...(type === POPOVER_TYPE.TEXT_INPUT_PICKER && {ref: childrenRef, onKeyPress: onKeyDown}),
                        ...(type === POPOVER_TYPE.CONTEXT_MENU && {onContextMenu}),
                        ...interactionHandlers
                })

                useImperativeHandle(ref, () => (containerRef?.current ?? {}) as View, [])

                useEffect(() => {
                        if (contextMenuLayout) {
                                runEmitContent({containerLayout: contextMenuLayout, visible: isPopoverVisible})

                                return
                        }

                        containerRef.current?.measureInWindow((x, y, width, height) =>
                                runEmitContent({containerLayout: {x, y, width, height}, visible: isPopoverVisible})
                        )
                }, [isPopoverVisible, contextMenuLayout, runEmitContent])

                useEffect(() => {
                        if (type === POPOVER_TYPE.TEXT_INPUT_PICKER) {
                                runEmitPressableLayout(interactionHandlers)
                        }
                }, [interactionHandlers, runEmitPressableLayout, type])

                useEffect(() => {
                        runUpdateVisible(isVisible)
                }, [isVisible, runUpdateVisible])

                useEffect(() => {
                        nextVisibilityEvent?.()
                }, [nextVisibilityEvent])

                useEffect(
                        () => () => {
                                runUnmountContent()
                                runUnmountPressableLayout()
                        },
                        [runUnmountContent, runUnmountPressableLayout]
                )

                return (
                        <RenderPopover
                                {...renderPopoverProps}
                                children={children}
                                elevation={elevation}
                                id={id}
                                onContextMenu={onContextMenu}
                                ref={containerRef}
                                shape={shape}
                                type={type}
                        />
                )
        }
)

PopoverBase.displayName = 'PopoverBase'
