import {WritableDraft} from 'immer'
import {forwardRef, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import {LayoutChangeEvent, LayoutRectangle, View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {Updater, useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent, useWindowDimensions} from '../../../hooks'
import {State} from '../../Common'
import {
        HandleTooltipSupportingContainerLayoutOptions,
        HandleTooltipSupportingInvertOptions,
        HandleTooltipSupportingPositionInvertOptions,
        HandleTooltipSupportingPositionInvertWindowOptions,
        HandleTooltipSupportingStateEventChangeOptions,
        SupportingPosition,
        TooltipSupportingBaseProps,
        TooltipSupportingState
} from './Tooltip-supporting.interface'
import {useTooltipSupportingAnimated} from './use-tooltip-supporting-animated.hook'

const handleTooltipSupportingLayout = (setState: Updater<TooltipSupportingState>) => (event: LayoutChangeEvent) => {
        const {height, width} = event.nativeEvent.layout

        setState(draft => {
                draft.layout.height = height
                draft.layout.width = width
        })
}

const handleTooltipSupportingStateChange =
        ({eventName, onVisible}: HandleTooltipSupportingStateEventChangeOptions) =>
        (setState: Updater<TooltipSupportingState>) =>
        (event: StateEvent) => {
                if (eventName === 'layout') {
                        handleTooltipSupportingLayout(setState)(event as LayoutChangeEvent)
                }

                const triggerEventNames = ['hoverIn', 'hoverOut']

                if (eventName && triggerEventNames?.includes(eventName)) {
                        onVisible?.(eventName === triggerEventNames[0])
                }
        }

const handleTooltipSupportingClose = (setState: Updater<TooltipSupportingState>) => (value?: boolean) => {
        if (typeof value === 'boolean' && value) {
                setState(draft => {
                        draft.closed = value
                })
        }
}

const setTooltipSupportingLayout = (setState: Updater<TooltipSupportingState>) => (containerCurrent: View | null) =>
        containerCurrent?.measure((x, y, width, height, pageX, pageY) =>
                setState(draft => {
                        draft.closed = false
                        draft.containerLayout.height = height
                        draft.containerLayout.pageX = pageX
                        draft.containerLayout.pageY = pageY
                        draft.containerLayout.width = width
                        draft.containerLayout.x = x
                        draft.containerLayout.y = y
                        draft.status = 'succeeded'
                })
        )

const handleTooltipSupportingContainerLayout =
        ({setState, windowWidth}: HandleTooltipSupportingContainerLayoutOptions) =>
        (containerCurrent: View | null) =>
        (visible?: boolean) => {
                if (windowWidth && visible) {
                        setTooltipSupportingLayout(setState)(containerCurrent)
                }
        }

// TODO: Add more directional support.
const handleTooltipSupportingPositionInvert =
        ({supportingPosition, setState}: HandleTooltipSupportingPositionInvertOptions) =>
        (ref: React.MutableRefObject<View | undefined>) => {
                const handleTooltipSupportingInvert =
                        ({
                                width,
                                height,
                                pageX,
                                pageY,
                                windowHeight,
                                windowWidth
                        }: HandleTooltipSupportingInvertOptions) =>
                        (draft: WritableDraft<TooltipSupportingState>) => {
                                draft.invert =
                                        supportingPosition?.startsWith('horizontal') ?
                                                width + pageX >= windowWidth && pageX > width
                                        :       height + pageY >= windowHeight && pageY > height
                        }

                return ({
                        height: windowHeight,
                        width: windowWidth
                }: HandleTooltipSupportingPositionInvertWindowOptions) =>
                        ref?.current?.measure((_x, _y, width, height, pageX, pageY) =>
                                setState(
                                        handleTooltipSupportingInvert({
                                                width,
                                                height,
                                                pageX,
                                                pageY,
                                                windowHeight,
                                                windowWidth
                                        })
                                )
                        )
        }

const handleTooltipSupportingPosition = (supportingPosition?: SupportingPosition) => (invert?: boolean) => {
        const position = {
                invertY: supportingPosition === 'verticalEnd' ? 'verticalStart' : 'verticalEnd',
                invertX: supportingPosition === 'horizontalEnd' ? 'horizontalStart' : 'horizontalEnd'
        }

        const invertPosition = (
                supportingPosition?.startsWith('horizontal') ?
                        position.invertX
                :       position.invertY) as SupportingPosition

        return invert ? invertPosition : supportingPosition
}

export const TooltipSupportingBase = forwardRef<View, TooltipSupportingBaseProps>(
        (
                {
                        containerCurrent,
                        containerLayout: rawContainerLayout,
                        onVisible,
                        render,
                        supportingPosition,
                        type,
                        visible,
                        ...renderProps
                },
                ref
        ) => {
                const [{containerLayout, layout, status, closed, invert}, setState] = useImmer<TooltipSupportingState>({
                        closed: undefined,
                        containerLayout: {} as TooltipSupportingState['containerLayout'],
                        layout: {} as LayoutRectangle,
                        status: 'idle',
                        invert: undefined
                })

                const {width: windowWidth, height: windowHeight} = useWindowDimensions()
                const containerRef = useRef<View>()
                const id = useId()
                const onTooltipSupportingClose = useMemo(() => handleTooltipSupportingClose(setState), [setState])
                const theme = useTheme()
                const onTooltipSupportingContainerLayout = useMemo(
                        () => handleTooltipSupportingContainerLayout({setState, windowWidth})(containerCurrent),
                        [containerCurrent, setState, windowWidth]
                )

                const onTooltipSupportingPositionInvert = useMemo(
                        () =>
                                handleTooltipSupportingPositionInvert({
                                        setState,
                                        supportingPosition
                                })(containerRef),
                        [setState, supportingPosition]
                )

                const position = handleTooltipSupportingPosition(supportingPosition)(invert)
                const {contentAnimatedStyle} = useTooltipSupportingAnimated({
                        height: layout.height,
                        onClose: onTooltipSupportingClose,
                        type,
                        visible
                })

                const tooltipSupportingWidth = useMemo(
                        () => (type === 'menu' ? containerLayout.width : layout.width),
                        [containerLayout.width, layout.width, type]
                )

                const onStateEventChange =
                        (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
                                handleTooltipSupportingStateChange({...options, state, onVisible})(setState)(event)

                const onStateEvent = useOnStateEvent({...renderProps, onStateEventChange})

                useImperativeHandle(ref, () => (containerRef?.current ? containerRef?.current : {}) as View, [])

                useEffect(() => {
                        if (rawContainerLayout?.height) {
                                onTooltipSupportingContainerLayout(visible)
                        }
                }, [onTooltipSupportingContainerLayout, visible, rawContainerLayout?.height])

                useEffect(() => {
                        onTooltipSupportingPositionInvert({height: windowHeight, width: windowWidth})
                }, [onTooltipSupportingPositionInvert, windowHeight, windowWidth])

                if (status === 'idle') {
                        return <></>
                }

                return render({
                        closed,
                        containerLayout,
                        contentAnimatedStyle,
                        height: layout.height,
                        id,
                        onStateEvent,
                        ref: containerRef as React.LegacyRef<View>,
                        supportingPosition: position,
                        theme,
                        type,
                        width: tooltipSupportingWidth,
                        ...renderProps
                })
        }
)
