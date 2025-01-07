import {forwardRef, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
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
                        height: rawHeight,
                        hidden,
                        lazy = false,
                        onUnmount,
                        onVisible,
                        opacity,
                        render,
                        scale = true,
                        unmount,
                        visible: rawVisible,
                        width: rawWidth,
                        ...renderProps
                },
                ref
        ) => {
                const [
                        {layout, visible, invisible, nextUnmountEvent, nextVisibleEvent, status, unmountLayout},
                        setState
                ] = useImmer<LayoutAnimatedState>({layout: {} as LayoutRectangle, status: 'idle'})

                const layoutVisible = useMemo(() => rawVisible ?? defaultVisible, [defaultVisible, rawVisible])
                const height = rawHeight ?? layout.height
                const width = rawWidth ?? layout.width
                const id = useId()
                const layoutAnimatedRef = useRef<View>(null)
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
                        height,
                        onAnimatedFinished: onLayoutAnimatedFinished,
                        opacity,
                        scale,
                        status,
                        visible: visible ?? layoutVisible ?? !invisible,
                        width
                })

                useImperativeHandle(
                        ref,
                        () => (layoutAnimatedRef?.current ? layoutAnimatedRef?.current : {}) as View,
                        []
                )

                useEffect(() => {
                        if (status === 'succeeded') {
                                onLayoutAnimatedLayoutVisible(layoutVisible)
                        }
                }, [layoutVisible, onLayoutAnimatedLayoutVisible, status])

                useEffect(() => {
                        onLayoutAnimatedStatus(layoutVisible)
                }, [layoutVisible, onLayoutAnimatedStatus])

                useEffect(() => {
                        nextUnmountEvent?.()
                }, [nextUnmountEvent])

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
                                        containerAnimatedStyle,
                                        height,
                                        hidden: animatedType.startsWith('collapse') ? false : hidden,
                                        id,
                                        onStateEvent,
                                        ref: layoutAnimatedRef,
                                        status,
                                        visible: !invisible,
                                        width
                                })
        }
)
