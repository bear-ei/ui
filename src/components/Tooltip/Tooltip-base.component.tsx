import type {State} from '@/constants'
import {
        type HandleStateEventChangeOptions,
        type StateEvent,
        useClearComponentEvent,
        useInteractionStateEvent
} from '@/hooks'
import {debounce} from '@/utils'
import {forwardRef, useCallback, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import {View} from 'react-native'
import {useImmer} from 'use-immer'
import {TOOLTIP_TYPE} from './Tooltip.enum'
import {
        emitTooltipSupporting,
        handleTooltipStateChange,
        unmountTooltipSupporting,
        updateTooltipContextMenuLayout,
        updateTooltipVisibility
} from './Tooltip.handler'
import type {TooltipBaseProps, TooltipState} from './Tooltip.interface'
import {RenderTooltip} from './Tooltip.render'

export const TooltipBase = forwardRef<View, TooltipBaseProps>(
        (
                {
                        defaultVisible,
                        disabled: isDisabled = false,
                        elevation,
                        onVisible: rawOnVisible,
                        shape,
                        supporting,
                        supportingPosition,
                        triggerEvent,
                        type = TOOLTIP_TYPE.PLAIN,
                        visible: rawVisible,
                        ...renderTooltipProps
                },
                ref
        ) => {
                const [{tooltipVisible: isTooltipVisible, nextVisibilityEvent, menuContainerLayout}, setState] =
                        useImmer<TooltipState>({})

                useClearComponentEvent(setState)

                const isVisible = rawVisible ?? defaultVisible
                const containerRef = useRef<View>(null)
                const id = useId()
                const onVisible = useMemo(
                        () => debounce(updateTooltipVisibility(rawOnVisible)(setState))(150),
                        [rawOnVisible, setState]
                )

                const onClosed = useMemo(() => debounce(unmountTooltipSupporting(id))(150), [id])
                const onContextMenu = useMemo(
                        () => updateTooltipContextMenuLayout(setState)({onVisible, disabled: isDisabled}),
                        [isDisabled, onVisible, setState]
                )

                const onStateEventChange = useCallback(
                        (options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
                                handleTooltipStateChange({...options, onVisible, state, triggerEvent, type})(event),
                        [onVisible, triggerEvent, type]
                )

                const interactionHandlers = useInteractionStateEvent({
                        ...renderTooltipProps,
                        disabled: isDisabled,
                        onStateEventChange
                })

                const runEmit = useMemo(
                        () =>
                                emitTooltipSupporting(id)({
                                        elevation,
                                        onClosed,
                                        onVisible,
                                        shape,
                                        supporting,
                                        supportingPosition,
                                        triggerEvent,
                                        type
                                }),
                        [elevation, id, onClosed, onVisible, shape, supporting, supportingPosition, triggerEvent, type]
                )

                const runUnmount = useMemo(() => unmountTooltipSupporting(id), [id])
                const runUpdateVisible = useMemo(
                        () => debounce(updateTooltipVisibility(rawOnVisible)(setState))(150),
                        [rawOnVisible, setState]
                )

                useImperativeHandle(ref, () => (containerRef?.current ?? {}) as View, [])

                useEffect(() => {
                        if (type === TOOLTIP_TYPE.MENU) {
                                runEmit({containerLayout: menuContainerLayout, visible: isTooltipVisible})

                                return
                        }

                        containerRef.current?.measureInWindow((x, y, width, height) =>
                                runEmit({containerLayout: {x, y, width, height}, visible: isTooltipVisible})
                        )
                }, [isTooltipVisible, menuContainerLayout, runEmit, type])

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
                        <RenderTooltip
                                {...renderTooltipProps}
                                id={id}
                                interactionHandlers={interactionHandlers}
                                onContextMenu={onContextMenu}
                                ref={containerRef}
                                type={type}
                        />
                )
        }
)

TooltipBase.displayName = 'TooltipBase'
