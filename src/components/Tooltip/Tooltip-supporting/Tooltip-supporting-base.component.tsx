import {forwardRef, useCallback, useEffect, useId, useMemo} from 'react'
import {LayoutChangeEvent, LayoutRectangle, View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {Updater, useImmer} from 'use-immer'
import {emitter} from '../../../contexts'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../../hooks'
import {State} from '../../Common'
import {
    HandleTooltipSupportingEmitOptions,
    HandleTooltipSupportingStateEventChangeOptions,
    TooltipSupportingBaseProps,
    TooltipSupportingState
} from './Tooltip-supporting.interface'
import {useTooltipSupportingAnimated} from './use-tooltip-supporting-animated.hook'

const handleTooltipSupportingLayout = (setState: Updater<TooltipSupportingState>) => (event: LayoutChangeEvent) => {
    const nativeEventLayout = event.nativeEvent.layout

    setState(draft => {
        draft.layout.width = nativeEventLayout.width
        draft.layout.height = nativeEventLayout.height
    })
}

const handleTooltipSupportingStateChange =
    ({onVisible, eventName}: HandleTooltipSupportingStateEventChangeOptions) =>
    (setState: Updater<TooltipSupportingState>) =>
    (event: StateEvent) => {
        if (eventName === 'layout') {
            handleTooltipSupportingLayout(setState)(event as LayoutChangeEvent)
        } else if (eventName && ['hoverIn', 'hoverOut', 'pressIn'].includes(eventName)) {
            onVisible?.(eventName === 'hoverIn')
        }
    }

const handleTooltipSupportingClose = (setState: Updater<TooltipSupportingState>) => (value?: boolean) => {
    if (typeof value === 'boolean' && !value) {
        setState(draft => {
            draft.closed = value
        })
    }
}

const setTooltipSupportingLayout = (setState: Updater<TooltipSupportingState>) => (containerCurrent: View | null) =>
    containerCurrent?.measure((x, y, width, height, pageX, pageY) =>
        setState(draft => {
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
    (setState: Updater<TooltipSupportingState>) => (containerCurrent: View | null) => (visible?: boolean) => {
        if (visible) {
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

const handleTooltipSupportingUnmount = (id: string) =>
    emitter.emit('modal', {id: `tooltip__supporting--${id}`, render: undefined})

/**
 *   Undebugged animation callbacks
 */
export const TooltipSupportingBase = forwardRef<View, TooltipSupportingBaseProps>(
    ({containerCurrent, onVisible, render, supportingPosition, supportingText, visible, ...renderProps}, ref) => {
        const [{containerLayout, layout, status, closed}, setState] = useImmer<TooltipSupportingState>({
            closed: undefined,
            containerLayout: {} as TooltipSupportingState['containerLayout'],
            layout: {} as LayoutRectangle,
            status: 'idle'
        })

        const id = useId()
        const theme = useTheme()
        const onTooltipSupportingClose = useMemo(() => handleTooltipSupportingClose(setState), [setState])
        const onTooltipSupportingContainerLayout = useMemo(
            () => handleTooltipSupportingContainerLayout(setState)(containerCurrent),
            [containerCurrent, setState]
        )

        const onTooltipSupportingUnmount = useMemo(() => handleTooltipSupportingUnmount, [])
        const onStateEventChange = (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
            handleTooltipSupportingStateChange({...options, onVisible, state})(setState)(event)

        const onStateEvent = useOnStateEvent({...renderProps, onStateEventChange, disabled: !visible})
        const {contentAnimatedStyle} = useTooltipSupportingAnimated({visible, onClose: onTooltipSupportingClose})
        const renderTooltipSupporting = useCallback(
            () =>
                render({
                    contentAnimatedStyle,
                    containerLayout,
                    height: layout.height,
                    id,
                    onStateEvent,
                    ref,
                    supportingPosition,
                    supportingText,
                    theme,
                    width: layout.width
                }),
            [
                contentAnimatedStyle,
                containerLayout,
                id,
                layout.height,
                layout.width,
                onStateEvent,
                ref,
                render,
                supportingPosition,
                supportingText,
                theme
            ]
        )

        const onTooltipSupportingEmit = useCallback(
            () => handleTooltipSupportingEmit({id, status})(renderTooltipSupporting),
            [id, status, renderTooltipSupporting]
        )

        useEffect(() => {
            onTooltipSupportingContainerLayout(visible)
        }, [onTooltipSupportingContainerLayout, visible])

        useEffect(() => {
            onTooltipSupportingClose(visible)
        }, [onTooltipSupportingClose, visible])

        useEffect(() => {
            onTooltipSupportingEmit()
        }, [onTooltipSupportingEmit])

        useEffect(() => {
            if (closed) {
                onTooltipSupportingUnmount(id)
            }

            return () => onTooltipSupportingUnmount(id)
        }, [id, closed, onTooltipSupportingUnmount])

        return <></>
    }
)
