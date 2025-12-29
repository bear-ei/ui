import {COMPONENT_STATUS, type State} from '@/constants'
import {
        type HandleStateEventChangeOptions,
        type StateEvent,
        useClearComponentEvent,
        useInteractionStateEvent,
        useTheme,
        useWindowDimensions
} from '@/hooks'
import {forwardRef, useCallback, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import type {LayoutRectangle, View} from 'react-native'
import {useImmer} from 'use-immer'
import {POPOVER_TYPE, type PopoverType} from '..'
import {
        getPopoverContentPosition,
        handleMaskPressOut,
        handlePopoverContentStateChange,
        updatePopoverContentClosed,
        updatePopoverContentPosition,
        updatePopoverContentStatus
} from './Popover-content.handler'
import type {PopoverContentBaseProps, PopoverContentState} from './Popover-content.interface'
import {RenderPopoverContent} from './Popover-content.render'
import {usePopoverContentAnimated} from './use-tooltip-animated.hook'

export const PopoverContentBase = forwardRef<View, PopoverContentBaseProps>(
        (
                {
                        containerLayout,
                        onClosed: rawOnClosed,
                        onVisible,
                        popoverContentPosition,
                        triggerEvent,
                        type = POPOVER_TYPE.TOOLTIP,
                        visible,
                        ...renderPopoverContentProps
                },
                ref
        ) => {
                const [{layout, status, invert: isInvert, menuPosition, nextClosedEvent}, setState] =
                        useImmer<PopoverContentState>({
                                layout: {} as LayoutRectangle,
                                menuPosition: {},
                                status: COMPONENT_STATUS.IDLE
                        })

                useClearComponentEvent(setState)

                const {width: windowWidth, height: windowHeight} = useWindowDimensions()
                const containerRef = useRef<View>(null)
                const id = useId()
                const theme = useTheme()
                const isMenuOrPicker = (
                        [POPOVER_TYPE.CONTEXT_MENU, POPOVER_TYPE.TEXT_INPUT_PICKER] as readonly PopoverType[]
                ).includes(type)

                const tooltipWidth =
                        isMenuOrPicker ?
                                type === POPOVER_TYPE.TEXT_INPUT_PICKER ?
                                        containerLayout?.width
                                :       theme.token.spacing.extraSmall * 45
                        :       layout.width

                const onClosed = useMemo(
                        () => updatePopoverContentClosed(rawOnClosed)(setState),
                        [rawOnClosed, setState]
                )

                const onMaskPressOut = useMemo(() => handleMaskPressOut(onVisible), [onVisible])
                const position = getPopoverContentPosition(popoverContentPosition)(isInvert)
                const {contentAnimatedStyle} = usePopoverContentAnimated({
                        height: layout.height,
                        onClose: onClosed,
                        position,
                        status,
                        type,
                        visible
                })

                const onStateEventChange = useCallback(
                        (options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
                                handlePopoverContentStateChange({...options, state, onVisible, triggerEvent})(setState)(
                                        event
                                ),
                        [onVisible, setState, triggerEvent]
                )

                const interactionHandlers = useInteractionStateEvent({
                        ...renderPopoverContentProps,
                        onStateEventChange
                })

                const runUpdateStatus = useMemo(
                        () => updatePopoverContentStatus({setState, windowWidth}),
                        [setState, windowWidth]
                )

                const runUpdatePosition = useMemo(
                        () =>
                                updatePopoverContentPosition({
                                        containerLayout,
                                        popoverContentPosition,
                                        setState,
                                        theme,
                                        type
                                })(containerRef),
                        [containerLayout, setState, popoverContentPosition, theme, type]
                )

                useImperativeHandle(ref, () => (containerRef?.current ?? {}) as View, [])

                useEffect(() => {
                        runUpdateStatus(containerLayout)
                }, [containerLayout, runUpdateStatus, visible])

                useEffect(() => {
                        runUpdatePosition({visible, windowHeight, windowWidth, layout})
                }, [visible, layout, runUpdatePosition, windowHeight, windowWidth])

                useEffect(() => {
                        nextClosedEvent?.()
                }, [nextClosedEvent])

                return (
                        <RenderPopoverContent
                                {...renderPopoverContentProps}
                                containerLayout={containerLayout}
                                contentAnimatedStyle={contentAnimatedStyle}
                                height={layout.height}
                                id={id}
                                interactionHandlers={interactionHandlers}
                                menuPosition={menuPosition}
                                onMaskPressOut={onMaskPressOut}
                                popoverContentPosition={position}
                                ref={containerRef}
                                theme={theme}
                                type={type}
                                visible={visible}
                                width={tooltipWidth}
                                windowHeight={windowHeight}
                                windowWidth={windowWidth}
                        />
                )
        }
)

PopoverContentBase.displayName = 'PopoverContentBase'
