import {forwardRef, useEffect, useId, useMemo} from 'react'
import {LayoutRectangle, View} from 'react-native'
import {useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../hooks'
import {debounce, runAfterInteractions} from '../../utils'
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
                        contentSize,
                        defaultVisible,
                        disabledAnimated,
                        entry,
                        exit,
                        lazy = false,
                        onUnmount,
                        onVisible,
                        opacity,
                        render,
                        scale = false,
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

                const id = useId()
                const layoutVisible = useMemo(() => rawVisible ?? defaultVisible, [defaultVisible, rawVisible])
                const onLayoutAnimatedLayoutVisible = useMemo(
                        () => debounce(handleLayoutAnimatedLayoutVisible({setState, onVisible}))(50),
                        [onVisible, setState]
                )

                const onLayoutAnimatedFinished = useMemo(
                        () => handleLayoutAnimatedFinished({onUnmount, unmount})(setState),
                        [onUnmount, setState, unmount]
                )

                const onLayoutAnimatedStatus = useMemo(
                        () => handleLayoutAnimatedStatus({unmount, lazy})(setState),
                        [lazy, setState, unmount]
                )

                const onLayoutAnimatedLayoutChange = useMemo(
                        () => debounce(handleLayoutAnimatedLayoutChange(setState))(50),
                        [setState]
                )

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
                        height: layout.height ?? contentSize?.height,
                        onAnimatedFinished: onLayoutAnimatedFinished,
                        opacity,
                        scale,
                        visible: visible ?? layoutVisible,
                        width: layout.width ?? contentSize?.width
                })

                useEffect(() => {
                        onLayoutAnimatedStatus(layoutVisible)
                }, [layoutVisible, onLayoutAnimatedStatus])

                useEffect(() => {
                        nextUnmountEvent?.()
                }, [nextUnmountEvent])

                useEffect(() => {
                        if (status === 'succeeded') {
                                runAfterInteractions(onLayoutAnimatedLayoutVisible)(layoutVisible)
                        }
                }, [layoutVisible, onLayoutAnimatedLayoutVisible, status])

                useEffect(() => {
                        runAfterInteractions(nextVisibleEvent)()
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
                                        id,
                                        layout,
                                        onStateEvent,
                                        ref,
                                        visible: typeof invisible === 'boolean' ? !invisible : layoutVisible
                                })
        }
)
