import type {State} from '@/constants'
import {
        useClearComponentEvent,
        useInteractionStateEvent,
        useMergeRefs,
        type HandleStateEventChangeOptions,
        type StateEvent
} from '@/hooks'
import {debounce} from '@/utils'
import {
        cloneElement,
        forwardRef,
        isValidElement,
        useCallback,
        useEffect,
        useId,
        useImperativeHandle,
        useMemo,
        useRef,
        type ComponentPropsWithRef,
        type ReactElement
} from 'react'
import {TextInput, View} from 'react-native'
import {useImmer} from 'use-immer'
import {POPOVER_TYPE} from './Popover.enum'
import {
        emitPopoverContent,
        emitPopoverPressableLayout,
        handleElevationAnimationFinished,
        handlePopoverContentAnimationFinished,
        handlePopoverStateChange,
        unmountPopoverContent,
        unmountPopoverPressableLayout,
        updatePopoverContextMenuLayout,
        updatePopoverElevation,
        updatePopoverVisible
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
                        elevation: rawElevation,
                        onAnimationFinished: rawOnAnimationFinished,
                        onKeyDown,
                        onVisible: rawOnVisible,
                        popoverContentPosition,
                        shape,
                        triggerEvent,
                        type = POPOVER_TYPE.PLAIN,
                        visible: rawVisible,
                        ...renderPopoverProps
                },
                ref
        ) => {
                const [
                        {
                                contextMenuLayout,
                                elevation,
                                nextAnimationFinishedEvent,
                                nextContentUnmountEvent,
                                nextPressableLayoutUnmountEvent,
                                nextVisibleEvent,
                                visible: isVisible
                        },
                        setState
                ] = useImmer<PopoverState>({})

                useClearComponentEvent(setState)

                const childrenRef = useRef<TextInput>(null)
                const containerRef = useRef<View>(null)
                const mergedChildrenRef = useMergeRefs([
                        isValidElement(rawChildren) && type === POPOVER_TYPE.TEXT_INPUT_PICKER ?
                                (rawChildren as ReactElement<ComponentPropsWithRef<typeof TextInput>>).props.ref
                        :       null,
                        childrenRef
                ])

                const id = useId()
                const debounceVisibleDelay = type === POPOVER_TYPE.TEXT_INPUT_PICKER ? 0 : 150
                const onVisible = useMemo(
                        () => debounce(updatePopoverVisible(rawOnVisible)(setState))(debounceVisibleDelay),
                        [debounceVisibleDelay, rawOnVisible, setState]
                )

                const onElevationAnimationFinished = useMemo(
                        () => handleElevationAnimationFinished(rawOnVisible)(setState),
                        [rawOnVisible, setState]
                )

                const onContentUnmount = useMemo(() => debounce(unmountPopoverContent(id))(150), [id])
                const onPressableLayoutUnmount = useMemo(() => unmountPopoverPressableLayout(id), [id])
                const onContentAnimationFinished = useMemo(
                        () =>
                                handlePopoverContentAnimationFinished({
                                        onAnimationFinished: rawOnAnimationFinished,
                                        onContentUnmount,
                                        onPressableLayoutUnmount,
                                        type
                                })(setState),
                        [onContentUnmount, onPressableLayoutUnmount, rawOnAnimationFinished, setState, type]
                )

                const onContextMenu = useMemo(
                        () => updatePopoverContextMenuLayout(setState)({onVisible, disabled: isDisabled}),
                        [isDisabled, onVisible, setState]
                )

                const onStateEventChange = useCallback(
                        (options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
                                handlePopoverStateChange(setState)({
                                        ...options,
                                        childrenRef,
                                        onVisible,
                                        state,
                                        triggerEvent,
                                        type
                                })(event),
                        [onVisible, setState, triggerEvent, type]
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
                                        onElevationAnimationFinished,
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
                                onElevationAnimationFinished,
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
                        () => debounce(updatePopoverVisible(rawOnVisible)(setState))(debounceVisibleDelay),
                        [debounceVisibleDelay, rawOnVisible, setState]
                )

                const runUpdateElevation = useMemo(() => updatePopoverElevation(setState), [setState])
                const children = cloneElement(rawChildren ?? <></>, {
                        ...(type === POPOVER_TYPE.CONTEXT_MENU && {onContextMenu}),
                        ...(type === POPOVER_TYPE.TEXT_INPUT_PICKER && {onKeyPress: onKeyDown, ref: mergedChildrenRef}),
                        ...interactionHandlers
                })

                useImperativeHandle(ref, () => (containerRef?.current ?? {}) as View, [])

                useEffect(() => {
                        if (contextMenuLayout) {
                                runEmitContent({containerLayout: contextMenuLayout, visible: isVisible})

                                return
                        }

                        containerRef.current?.measureInWindow((x, y, width, height) =>
                                runEmitContent({containerLayout: {x, y, width, height}, visible: isVisible})
                        )
                }, [contextMenuLayout, isVisible, runEmitContent])

                useEffect(() => {
                        if (type === POPOVER_TYPE.TEXT_INPUT_PICKER && isVisible) {
                                runEmitPressableLayout(interactionHandlers)
                        }
                }, [interactionHandlers, isVisible, runEmitPressableLayout, type])

                useEffect(() => {
                        runUpdateElevation(rawElevation)
                }, [rawElevation, runUpdateElevation])

                useEffect(() => {
                        runUpdateVisible(rawVisible ?? defaultVisible)
                }, [defaultVisible, rawVisible, runUpdateVisible])

                useEffect(() => {
                        nextVisibleEvent?.()
                }, [nextVisibleEvent])

                useEffect(() => {
                        nextContentUnmountEvent?.()
                }, [nextContentUnmountEvent])

                useEffect(() => {
                        nextPressableLayoutUnmountEvent?.()
                }, [nextPressableLayoutUnmountEvent])

                useEffect(() => {
                        nextAnimationFinishedEvent?.()
                }, [nextAnimationFinishedEvent])

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
