import {forwardRef, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import {LayoutRectangle, View} from 'react-native'
import {useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../hooks'
import {debounce} from '../../utils'
import {State} from '../Common'
import {
        handleLayoutAnimatedFinished,
        handleLayoutAnimatedLayoutChange,
        handleLayoutAnimatedLayoutVisible,
        handleLayoutAnimatedStateChange,
        handleLayoutAnimatedStatus
} from './Layout-animated-handle'
import {LayoutAnimatedBaseProps, LayoutAnimatedState} from './Layout-animated.interface'
import {useLayoutAnimated} from './use-layout-animated.hook'

export const LayoutAnimatedBase = forwardRef<View, LayoutAnimatedBaseProps>(
        (
                {
                        animatedType = 'fade',
                        defaultVisible,
                        disabledAnimated,
                        entry,
                        exit,
                        height: rawHeight,
                        lazy = false,
                        onUnmount,
                        onVisible,
                        opacity,
                        render,
                        unmount,
                        visible: rawVisible,
                        width: rawWidth,
                        ...renderProps
                },
                ref
        ) => {
                const [
                        {
                                layout,
                                layoutVisible,
                                layoutWasVisible,
                                nextUnmountEvent,
                                nextVisibleEvent,
                                status,
                                unmountLayout
                        },
                        setState
                ] = useImmer<LayoutAnimatedState>({
                        layout: {} as LayoutRectangle,
                        layoutWasVisible: true,
                        status: 'idle'
                })

                const height = rawHeight ?? layout.height
                const width = rawWidth ?? layout.width
                const id = useId()
                const layoutAnimatedRef = useRef<View>(null)
                const visible = useMemo(() => rawVisible ?? defaultVisible, [defaultVisible, rawVisible])
                const onLayoutAnimatedLayoutVisible = useMemo(
                        () =>
                                debounce(
                                        handleLayoutAnimatedLayoutVisible({setState, animatedType})(layoutAnimatedRef)
                                )(50),
                        [animatedType, setState]
                )

                const onLayoutAnimatedFinished = useMemo(
                        () => handleLayoutAnimatedFinished({onUnmount, unmount, onVisible})(setState),
                        [onUnmount, onVisible, setState, unmount]
                )

                const onLayoutAnimatedStatus = useMemo(
                        () => handleLayoutAnimatedStatus({unmount, lazy})(setState),
                        [lazy, setState, unmount]
                )

                const onLayoutAnimatedLayoutChange = handleLayoutAnimatedLayoutChange(setState)(animatedType)
                const onStateEventChange =
                        (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
                                handleLayoutAnimatedStateChange({
                                        ...options,
                                        state,
                                        onLayoutChange: onLayoutAnimatedLayoutChange
                                })(event)

                const onStateEvent = useOnStateEvent({...renderProps, onStateEventChange})
                const animatedVisible = useMemo(() => layoutVisible ?? visible, [layoutVisible, visible])
                const {containerAnimatedStyle} = useLayoutAnimated({
                        animatedType,
                        disabledAnimated,
                        entry,
                        exit,
                        height,
                        onAnimatedFinished: onLayoutAnimatedFinished,
                        opacity,
                        status,
                        visible: animatedVisible,
                        width
                })

                useImperativeHandle(
                        ref,
                        () => (layoutAnimatedRef?.current ? layoutAnimatedRef?.current : {}) as View,
                        []
                )

                useEffect(() => {
                        if (status === 'succeeded') {
                                onLayoutAnimatedLayoutVisible(visible)
                        }
                }, [onLayoutAnimatedLayoutVisible, status, visible])

                useEffect(() => {
                        onLayoutAnimatedStatus(visible)
                }, [onLayoutAnimatedStatus, visible])

                useEffect(() => {
                        nextUnmountEvent?.()
                }, [nextUnmountEvent])

                useEffect(() => {
                        nextVisibleEvent?.()
                }, [nextVisibleEvent])

                if (status === 'idle') {
                        return <></>
                }

                return unmountLayout ?
                                <></>
                        :       render({
                                        ...renderProps,
                                        containerAnimatedStyle,
                                        height,
                                        id,
                                        onStateEvent,
                                        ref: layoutAnimatedRef,
                                        status,
                                        visible: layoutWasVisible,
                                        width
                                })
        }
)
