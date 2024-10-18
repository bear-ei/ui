import {forwardRef, useCallback, useEffect, useId, useMemo} from 'react'
import {LayoutChangeEvent, LayoutRectangle, useWindowDimensions, View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {Updater, useImmer} from 'use-immer'
import {emitter} from '../../../contexts'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../../hooks'
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
    ({onVisible, eventName, triggerEvent}: HandleTooltipSupportingStateEventChangeOptions) =>
    (setState: Updater<TooltipSupportingState>) =>
    (event: StateEvent) => {
        if (eventName === 'layout') {
            handleTooltipSupportingLayout(setState)(event as LayoutChangeEvent)
        } else if (eventName && triggerEvent === 'hover' && eventName === 'hoverIn') {
            onVisible?.(true)
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

const handleTooltipSupportingVisible = (onVisible?: (value?: boolean) => void) => (value?: boolean) => {
    onVisible?.(value)
}

export const TooltipSupportingBase = forwardRef<View, TooltipSupportingBaseProps>(
    (
        {containerCurrent, onVisible, render, type, visible, containerLayout: rawContainerLayout, ...renderProps},
        ref
    ) => {
        const [{containerLayout, layout, status, closed}, setState] = useImmer<TooltipSupportingState>({
            closed: undefined,
            containerLayout: {} as TooltipSupportingState['containerLayout'],
            layout: {} as LayoutRectangle,
            status: 'idle'
        })

        const {width: windowWidth} = useWindowDimensions()
        const id = useId()
        const onTooltipSupportingClose = useMemo(() => handleTooltipSupportingClose(setState), [setState])
        const onTooltipSupportingVisible = useMemo(() => handleTooltipSupportingVisible(onVisible), [onVisible])
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
            handleTooltipSupportingStateChange({...options, state})(setState)(event)

        const onStateEvent = useOnStateEvent({...renderProps, onStateEventChange})
        const renderTooltipSupporting = useCallback(
            () =>
                render({
                    closed,
                    containerLayout,
                    contentAnimatedStyle,
                    height: layout.height,
                    id,
                    onStateEvent,
                    onVisible: onTooltipSupportingVisible,
                    ref,
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
                onTooltipSupportingVisible,
                ref,
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

        useEffect(() => {
            if (rawContainerLayout?.height) {
                onTooltipSupportingContainerLayout(visible)
            }
        }, [onTooltipSupportingContainerLayout, visible, rawContainerLayout?.height])

        useEffect(() => {
            onTooltipSupportingEmit()
        }, [onTooltipSupportingEmit])

        useEffect(() => {
            return () => onTooltipSupportingUnmount(id)
        }, [id, onTooltipSupportingUnmount])

        return <></>
    }
)
