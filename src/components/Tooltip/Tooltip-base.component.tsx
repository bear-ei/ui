import {forwardRef, useCallback, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import {InteractionManager, LayoutChangeEvent, LayoutRectangle, View} from 'react-native'
import {Updater, useImmer} from 'use-immer'
import {emitter} from '../../contexts'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../hooks'
import {debounce} from '../../utils'
import {State} from '../Common'
import {TooltipSupportingProps} from './Tooltip-supporting'
import {HandleTooltipStateEventChangeOptions, TooltipBaseProps, TooltipState} from './Tooltip.interface'

const handleTooltipVisible =
        (setState: Updater<TooltipState>) => (onVisible?: (value?: boolean) => void) => (value?: boolean) => {
                const handleNextActiveEvent = () => onVisible?.(value)

                if (typeof value === 'boolean') {
                        setState(draft => {
                                draft.tooltipVisible = value
                                draft.nextActiveEvent = handleNextActiveEvent
                        })
                }
        }

const handleTooltipLayout = (setState: Updater<TooltipState>) => (event: LayoutChangeEvent) => {
        const nativeEventLayout = event.nativeEvent.layout

        setState(draft => {
                draft.layout.height = nativeEventLayout.height
                draft.layout.width = nativeEventLayout.width
        })
}

const handleTooltipStateChange = ({
        eventName,
        onTooltipVisible,
        triggerEvent = 'hover'
}: HandleTooltipStateEventChangeOptions) => {
        const trigger = {
                focus: ['focus', 'blur'],
                hover: ['hoverIn', 'hoverOut'],
                press: ['pressIn']
        }

        return (setState: Updater<TooltipState>) => (event: StateEvent) => {
                if (eventName === 'layout') {
                        handleTooltipLayout(setState)(event as LayoutChangeEvent)
                }

                const triggerEventNames = trigger[triggerEvent]

                if (eventName && triggerEventNames?.includes(eventName)) {
                        onTooltipVisible(eventName === triggerEventNames[0])
                }
        }
}

const handleTooltipSupportingEmit =
        (id: string) =>
        ({visible, supporting, ...props}: TooltipSupportingProps) => {
                if (typeof visible === 'boolean' && supporting) {
                        emitter.emit('modal', {
                                id: `tooltip__supporting--${id}`,
                                name: 'tooltip',
                                props: {...props, visible, supporting}
                        })
                }
        }

const handleTooltipSupportingUnmount = (id: string) => {
        emitter.emit('modal', {
                id: `tooltip__supporting--${id}`,
                name: 'tooltip',
                unmount: true
        })
}

export const TooltipBase = forwardRef<View, TooltipBaseProps>(
        (
                {
                        defaultVisible,
                        disabled = false,
                        elevation,
                        onVisible,
                        render,
                        shape,
                        supporting,
                        supportingPosition,
                        triggerEvent,
                        type,
                        visible,
                        zIndex,
                        ...renderProps
                },
                ref
        ) => {
                const [{tooltipVisible, nextActiveEvent, layout}, setState] = useImmer<TooltipState>({
                        layout: {} as LayoutRectangle,
                        nextActiveEvent: undefined,
                        tooltipVisible: undefined
                })

                const containerRef = useRef<View>(null)
                const id = useId()
                const onTooltipVisible = useMemo(
                        () => debounce(handleTooltipVisible(setState)(onVisible))(250),
                        [onVisible, setState]
                )

                const onStateEventChange = useCallback(
                        (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
                                handleTooltipStateChange({
                                        ...options,
                                        onTooltipVisible,
                                        state,
                                        triggerEvent
                                })(setState)(event),
                        [onTooltipVisible, setState, triggerEvent]
                )

                const onStateEvent = useOnStateEvent({
                        ...renderProps,
                        disabled,
                        onStateEventChange
                })

                const onTooltipSupportingEmit = useCallback(
                        () =>
                                handleTooltipSupportingEmit(id)({
                                        containerCurrent: containerRef.current,
                                        containerLayout: layout,
                                        elevation,
                                        onVisible: onTooltipVisible,
                                        shape,
                                        supporting,
                                        supportingPosition,
                                        type,
                                        visible: tooltipVisible,
                                        zIndex
                                }),
                        [
                                elevation,
                                id,
                                layout,
                                onTooltipVisible,
                                shape,
                                supporting,
                                supportingPosition,
                                tooltipVisible,
                                type,
                                zIndex
                        ]
                )

                const onTooltipSupportingUnmount = useMemo(() => handleTooltipSupportingUnmount, [])

                useImperativeHandle(ref, () => (containerRef?.current ? containerRef?.current : {}) as View, [])

                useEffect(() => {
                        onTooltipSupportingEmit()
                }, [onTooltipSupportingEmit])

                useEffect(() => {
                        return () => onTooltipSupportingUnmount(id)
                }, [id, onTooltipSupportingUnmount])

                useEffect(() => {
                        onTooltipVisible(visible ?? defaultVisible)
                }, [onTooltipVisible, visible, defaultVisible])

                useEffect(() => {
                        InteractionManager.runAfterInteractions(() => nextActiveEvent?.())
                }, [nextActiveEvent])

                return render({
                        ...renderProps,
                        id,
                        onStateEvent,
                        ref: containerRef
                })
        }
)
