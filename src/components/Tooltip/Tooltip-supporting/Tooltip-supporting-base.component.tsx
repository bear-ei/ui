import {COMPONENT_STATUS, State} from '@/constants'
import {
        HandleStateEventChangeOptions,
        StateEvent,
        useClearComponentEvent,
        useInteractionStateEvent,
        useTheme,
        useWindowDimensions
} from '@/hooks'
import {forwardRef, useCallback, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import type {LayoutRectangle, View} from 'react-native'
import {useImmer} from 'use-immer'
import {TOOLTIP_TYPE} from '../Tooltip.enum'
import {
        getTooltipSupportingPosition,
        handleMaskPressOut,
        handleTooltipSupportingStateChange,
        updateTooltipSupportingClosed,
        updateTooltipSupportingPosition,
        updateTooltipSupportingStatus
} from './Tooltip-supporting.handler'
import type {TooltipSupportingBaseProps, TooltipSupportingState} from './Tooltip-supporting.interface'
import {RenderTooltipSupporting} from './Tooltip-supporting.render'
import {useTooltipSupportingAnimated} from './use-tooltip-supporting-animated.hook'

export const TooltipSupportingBase = forwardRef<View, TooltipSupportingBaseProps>(
        (
                {
                        containerLayout,
                        onClosed: rawOnClosed,
                        onVisible,
                        supportingPosition,
                        triggerEvent,
                        type,
                        visible,
                        ...renderTooltipSupportingProps
                },
                ref
        ) => {
                const [{layout, status, invert: isInvert, menuPosition, nextClosedEvent}, setState] =
                        useImmer<TooltipSupportingState>({
                                layout: {} as LayoutRectangle,
                                menuPosition: {},
                                status: COMPONENT_STATUS.IDLE
                        })

                useClearComponentEvent(setState)

                const {width: windowWidth, height: windowHeight} = useWindowDimensions()
                const containerRef = useRef<View>(null)
                const id = useId()
                const theme = useTheme()
                const tooltipSupportingWidth =
                        type === TOOLTIP_TYPE.MENU ? theme.token.spacing.extraSmall * 45 : layout.width

                const onClosed = useMemo(
                        () => updateTooltipSupportingClosed(rawOnClosed)(setState),
                        [rawOnClosed, setState]
                )

                const onMaskPressOut = useMemo(() => handleMaskPressOut(onVisible), [onVisible])
                const position = getTooltipSupportingPosition(supportingPosition)(isInvert)
                const {contentAnimatedStyle} = useTooltipSupportingAnimated({
                        height: layout.height,
                        onClose: onClosed,
                        position,
                        status,
                        type,
                        visible
                })

                const onStateEventChange = useCallback(
                        (options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
                                handleTooltipSupportingStateChange({...options, state, onVisible, triggerEvent})(
                                        setState
                                )(event),
                        [onVisible, setState, triggerEvent]
                )

                const interactionHandlers = useInteractionStateEvent({
                        ...renderTooltipSupportingProps,
                        onStateEventChange
                })

                const runUpdateStatus = useMemo(
                        () => updateTooltipSupportingStatus({setState, windowWidth}),
                        [setState, windowWidth]
                )

                const runUpdatePosition = useMemo(
                        () =>
                                updateTooltipSupportingPosition({
                                        containerLayout,
                                        setState,
                                        supportingPosition,
                                        theme,
                                        type
                                })(containerRef),
                        [containerLayout, setState, supportingPosition, theme, type]
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

                if (status === COMPONENT_STATUS.IDLE) {
                        return <></>
                }

                return (
                        <RenderTooltipSupporting
                                {...renderTooltipSupportingProps}
                                containerLayout={containerLayout}
                                contentAnimatedStyle={contentAnimatedStyle}
                                height={layout.height}
                                id={id}
                                interactionHandlers={interactionHandlers}
                                menuPosition={menuPosition}
                                onMaskPressOut={onMaskPressOut}
                                ref={containerRef}
                                supportingPosition={position}
                                theme={theme}
                                type={type}
                                visible={visible}
                                width={tooltipSupportingWidth}
                                windowHeight={windowHeight}
                                windowWidth={windowWidth}
                        />
                )
        }
)

TooltipSupportingBase.displayName = 'TooltipSupportingBase'
