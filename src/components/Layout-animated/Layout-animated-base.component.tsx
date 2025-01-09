import {forwardRef, useEffect, useImperativeHandle, useMemo, useRef} from 'react'
import {InteractionManager, LayoutRectangle, View} from 'react-native'
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
                        lazy = false,
                        onUnmount,
                        onVisible,
                        opacity,
                        render,
                        scale = true,
                        unmount,
                        visible: rawVisible,

                        ...renderProps
                },
                ref
        ) => {
                const [
                        {layout, visible, invisible, nextUnmountEvent, nextVisibleEvent, status, unmountLayout},
                        setState
                ] = useImmer<LayoutAnimatedState>({layout: {} as LayoutRectangle, status: 'idle'})

                const layoutAnimatedRef = useRef<View>(null)
                const layoutVisible = useMemo(() => rawVisible ?? defaultVisible, [defaultVisible, rawVisible])
                const onLayoutAnimatedLayoutVisible = useMemo(
                        () =>
                                debounce(
                                        handleLayoutAnimatedLayoutVisible({setState, animatedType, onVisible})(
                                                layoutAnimatedRef
                                        )
                                )(50),
                        [animatedType, onVisible, setState]
                )

                const onLayoutAnimatedFinished = useMemo(
                        () => handleLayoutAnimatedFinished({onUnmount, unmount})(setState),
                        [onUnmount, setState, unmount]
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
                const {containerAnimatedStyle} = useLayoutAnimated({
                        animatedType,
                        disabledAnimated,
                        entry,
                        exit,
                        height: layout.height,
                        onAnimatedFinished: onLayoutAnimatedFinished,
                        opacity,
                        scale,
                        visible: visible ?? layoutVisible,
                        width: layout.width
                })

                useImperativeHandle(
                        ref,
                        () => (layoutAnimatedRef?.current ? layoutAnimatedRef?.current : {}) as View,
                        []
                )

                useEffect(() => {
                        onLayoutAnimatedStatus(layoutVisible)
                }, [layoutVisible, onLayoutAnimatedStatus])

                useEffect(() => {
                        nextUnmountEvent?.()
                }, [nextUnmountEvent])

                useEffect(() => {
                        if (status === 'succeeded') {
                                onLayoutAnimatedLayoutVisible(layoutVisible)
                        }
                }, [layoutVisible, onLayoutAnimatedLayoutVisible, status])

                useEffect(() => {
                        InteractionManager.runAfterInteractions(() => nextVisibleEvent?.())
                }, [nextVisibleEvent])

                if (status === 'idle') {
                        return <></>
                }

                return unmountLayout ?
                                <></>
                        :       render({
                                        ...renderProps,
                                        animatedType,
                                        containerAnimatedStyle,
                                        onStateEvent,
                                        ref: layoutAnimatedRef,
                                        status,
                                        visible: !invisible
                                })
        }
)
