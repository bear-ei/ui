import {forwardRef, useCallback, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import {LayoutChangeEvent, LayoutRectangle, View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {Updater, useImmer} from 'use-immer'
import {emitter} from '../../../contexts'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent, useWindowDimensions} from '../../../hooks'
import {State} from '../../Common'
import {
    HandleTooltipSupportingContainerLayoutOptions,
    HandleTooltipSupportingEmitOptions,
    HandleTooltipSupportingStateEventChangeOptions,
    TooltipSupportingBaseProps,
    TooltipSupportingState
} from './Tooltip-supporting.interface'
import {useTooltipSupportingAnimated} from './use-tooltip-supporting-animated.hook'

const handleTooltipSupportingLayout = (setState: Updater<TooltipSupportingState>) => (event: LayoutChangeEvent) => {
    const nativeEventLayout = event.nativeEvent.layout

    setState(draft => {
        draft.layout.height = nativeEventLayout.height
        draft.layout.width = nativeEventLayout.width
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

const handleTooltipSupportingEmit =
    ({id, status}: HandleTooltipSupportingEmitOptions) =>
    (renderTooltipSupporting: () => JSX.Element) => {
        if (status === 'succeeded') {
            emitter.emit('modal', {id: `tooltip__supporting--${id}`, render: renderTooltipSupporting})
        }
    }

const handleTooltipSupportingUnmount = (id: string) => {
    emitter.emit('modal', {id: `tooltip__supporting--${id}`, render: undefined})
}

export const TooltipSupportingBase = forwardRef<View, TooltipSupportingBaseProps>(
    (
        {
            containerCurrent,
            containerLayout: rawContainerLayout,
            onVisible,
            render,
            type,
            visible,
            supportingPosition,
            ...renderProps
        },
        ref
    ) => {
        const [{containerLayout, layout, status, closed, invertY}, setState] = useImmer<TooltipSupportingState>({
            closed: undefined,
            containerLayout: {} as TooltipSupportingState['containerLayout'],
            layout: {} as LayoutRectangle,
            status: 'idle',
            invertY: undefined
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

        const onTooltipSupportingUnmount = useMemo(() => handleTooltipSupportingUnmount, [])
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

        const onStateEventChange = (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
            handleTooltipSupportingStateChange({...options, state, onVisible})(setState)(event)

        const onStateEvent = useOnStateEvent({...renderProps, onStateEventChange})

        /**
         * TODO:
         */
        const position = useMemo(
            () =>
                invertY ?
                    supportingPosition === 'verticalEnd' ?
                        'verticalStart'
                    :   'verticalEnd'
                :   supportingPosition,
            [invertY, supportingPosition]
        )

        const renderTooltipSupporting = useCallback(
            () =>
                render({
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
                }),
            [
                closed,
                containerLayout,
                contentAnimatedStyle,
                id,
                layout.height,
                onStateEvent,
                position,
                render,
                renderProps,
                theme,
                tooltipSupportingWidth,
                type
            ]
        )

        const onTooltipSupportingEmit = useCallback(
            () => handleTooltipSupportingEmit({id, status})(renderTooltipSupporting),
            [id, status, renderTooltipSupporting]
        )

        useImperativeHandle(ref, () => (containerRef?.current ? containerRef?.current : {}) as View, [])

        useEffect(() => {
            if (rawContainerLayout?.height) {
                onTooltipSupportingContainerLayout(visible)
            }
        }, [onTooltipSupportingContainerLayout, visible, rawContainerLayout?.height])

        useEffect(() => {
            onTooltipSupportingEmit()
        }, [onTooltipSupportingEmit])

        /**
         * TODO: 封装
         */
        useEffect(() => {
            containerRef.current?.measure((x, y, width, height, pageX, pageY) => {
                setState(d => {
                    d.invertY = height + pageY >= windowHeight && pageY > height
                })
            })
        }, [windowWidth, windowHeight, setState])

        useEffect(() => {
            return () => onTooltipSupportingUnmount(id)
        }, [id, onTooltipSupportingUnmount])

        return <></>
    }
)
