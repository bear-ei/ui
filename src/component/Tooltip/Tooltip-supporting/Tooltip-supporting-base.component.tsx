import {forwardRef, useCallback, useEffect, useId, useMemo} from 'react'
import {LayoutChangeEvent, LayoutRectangle, View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {Updater, useImmer} from 'use-immer'
import {emitter} from '../../../context'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../../hook'
import {State} from '../../Common'
import {
    InitialTooltipSupportingState,
    ProcessTooltipSupportingEmitOptions,
    ProcessTooltipSupportingStateEventChangeOptions,
    TooltipSupportingBaseProps
} from './Tooltip-supporting.interface'
import {useTooltipSupportingAnimated} from './use-tooltip-supporting-animated.hook'

const processTooltipSupportingLayout =
    (setState: Updater<InitialTooltipSupportingState>) => (event: LayoutChangeEvent) => {
        const nativeEventLayout = event.nativeEvent.layout

        setState(draft => {
            draft.layout.width = nativeEventLayout.width
            draft.layout.height = nativeEventLayout.height
        })
    }

const processTooltipSupportingStateChange =
    ({onVisible, eventName}: ProcessTooltipSupportingStateEventChangeOptions) =>
    (setState: Updater<InitialTooltipSupportingState>) =>
    (event: StateEvent) =>
        eventName === 'layout' ?
            processTooltipSupportingLayout(setState)(event as LayoutChangeEvent)
        :   eventName && ['hoverIn', 'hoverOut', 'pressIn'].includes(eventName) && onVisible?.(eventName === 'hoverIn')

const processTooltipSupportingClose = (setState: Updater<InitialTooltipSupportingState>) => (value?: boolean) =>
    typeof value === 'boolean' &&
    setState(draft => {
        draft.closed = value
    })

const setTooltipSupportingLayout =
    (setState: Updater<InitialTooltipSupportingState>) => (containerCurrent: View | null) =>
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

const processTooltipSupportingContainerLayout =
    (setState: Updater<InitialTooltipSupportingState>) => (containerCurrent: View | null) => (visible?: boolean) =>
        visible && setTooltipSupportingLayout(setState)(containerCurrent)

const processTooltipSupportingEmit =
    ({id, status}: ProcessTooltipSupportingEmitOptions) =>
    (renderTooltipSupporting: () => React.JSX.Element) => {
        status === 'succeeded' &&
            emitter.emit('modal', {id: `tooltip__supporting--${id}`, render: renderTooltipSupporting})
    }

const processTooltipSupportingUnmount = (id: string) =>
    emitter.emit('modal', {id: `tooltip__supporting--${id}`, render: undefined})

/**
 *   Undebugged animation callbacks
 */
export const TooltipSupportingBase = forwardRef<View, TooltipSupportingBaseProps>(
    ({containerCurrent, onVisible, render, supportingPosition, supportingText, visible, ...renderProps}, ref) => {
        const [{containerLayout, layout, status, closed}, setState] = useImmer<InitialTooltipSupportingState>({
            closed: undefined,
            containerLayout: {} as InitialTooltipSupportingState['containerLayout'],
            layout: {} as LayoutRectangle,
            status: 'idle'
        })

        const id = useId()
        const theme = useTheme()
        const onTooltipSupportingClose = useMemo(() => processTooltipSupportingClose(setState), [setState])
        const onTooltipSupportingContainerLayout = useMemo(
            () => processTooltipSupportingContainerLayout(setState)(containerCurrent),
            [containerCurrent, setState]
        )

        const onTooltipSupportingUnmount = useMemo(() => processTooltipSupportingUnmount, [])
        const onStateEventChange = (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
            processTooltipSupportingStateChange({...options, onVisible, state})(setState)(event)

        const onStateEvent = useOnStateEvent({...renderProps, onStateEventChange, disabled: !visible})
        const animatedStyle = useTooltipSupportingAnimated({visible, onClose: onTooltipSupportingClose})
        const renderTooltipSupporting = useCallback(
            () =>
                render({
                    animatedStyle,
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
                animatedStyle,
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
            () => processTooltipSupportingEmit({id, status})(renderTooltipSupporting),
            [id, status, renderTooltipSupporting]
        )

        useEffect(() => {
            onTooltipSupportingContainerLayout(visible)
        }, [onTooltipSupportingContainerLayout, visible])

        useEffect(() => {
            visible && onTooltipSupportingClose(!visible)
        }, [onTooltipSupportingClose, visible])

        useEffect(() => {
            onTooltipSupportingEmit()
        }, [onTooltipSupportingEmit])

        useEffect(() => {
            closed && onTooltipSupportingUnmount(id)

            return () => onTooltipSupportingUnmount(id)
        }, [id, closed, onTooltipSupportingUnmount])

        return <></>
    }
)
