import {forwardRef, useCallback, useEffect, useId, useMemo} from 'react'
import {InteractionManager, View, ViewStyle} from 'react-native'
import {AnimatedStyle} from 'react-native-reanimated'
import {Updater, useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../hooks'
import {State} from '../Common'
import {
        HandleLayoutAnimatedFinishedOptions,
        HandleLayoutAnimatedInitOptions,
        HandleLayoutAnimatedStateChangeOptions,
        LayoutAnimatedBaseProps,
        LayoutAnimatedState,
        LayoutAnimatedType
} from './Layout-animated.interface'
import {useLayoutAnimated} from './use-layout-animated.hook'

const handleLayoutVisible = (setState: Updater<LayoutAnimatedState>) => (value?: boolean) =>
        setState(draft => {
                if (!value) {
                        draft.layoutVisible = value

                        return
                }

                if (draft.unmountLayout) {
                        draft.unmountLayout = false

                        return
                }

                draft.layoutVisible = value
                draft.layoutWasVisible = value

                if (draft.status === 'idle') {
                        draft.status = 'succeeded'
                }
        })

const handleLayoutAnimatedStateChange =
        ({eventName, visible}: HandleLayoutAnimatedStateChangeOptions) =>
        (setState: Updater<LayoutAnimatedState>) =>
        (_event: StateEvent) => {
                if (eventName === 'layout' && visible) {
                        setState(draft => {
                                draft.layoutVisible = visible
                                draft.layoutWasVisible = visible
                        })
                }
        }

const handleLayoutAnimatedFinished =
        ({onUnmount, unmount, onVisible}: HandleLayoutAnimatedFinishedOptions) =>
        (setState: Updater<LayoutAnimatedState>) =>
        (value?: boolean) => {
                const handleNextVisibleEvent = () => onVisible?.(value)

                setState(draft => {
                        if (value) {
                                draft.nextVisibleEvent = handleNextVisibleEvent

                                return
                        }

                        draft.layoutWasVisible = value

                        if (unmount) {
                                draft.nextUnmountEvent = onUnmount
                                draft.unmountLayout = true

                                return
                        }

                        draft.nextVisibleEvent = handleNextVisibleEvent
                })
        }

const handleLayoutAnimatedInit =
        ({unmount, lazy}: HandleLayoutAnimatedInitOptions) =>
        (setState: Updater<LayoutAnimatedState>) =>
        (value?: boolean) =>
                setState(draft => {
                        if (draft.status !== 'idle') {
                                return
                        }

                        if (unmount && !value) {
                                draft.unmountLayout = true
                        }

                        draft.status = lazy ? 'idle' : 'succeeded'
                })

export const LayoutAnimatedBase = forwardRef<View, LayoutAnimatedBaseProps>(
        (
                {
                        animatedType = 'fade',
                        defaultVisible,
                        entry,
                        exit,
                        hidden = true,
                        lazy = false,
                        onUnmount,
                        onVisible,
                        opacity,
                        render,
                        unmount,
                        visible: visibleSource,
                        width,
                        ...renderProps
                },
                ref
        ) => {
                const [
                        {
                                layoutVisible,
                                layoutWasVisible,
                                nextStatusEvent,
                                nextUnmountEvent,
                                nextVisibleEvent,
                                status,
                                unmountLayout
                        },
                        setState
                ] = useImmer<LayoutAnimatedState>({
                        layoutVisible: undefined,
                        layoutWasVisible: undefined,
                        nextStatusEvent: undefined,
                        nextUnmountEvent: undefined,
                        nextVisibleEvent: undefined,
                        status: 'idle',
                        unmountLayout: undefined
                })

                const id = useId()
                const visible = visibleSource ?? defaultVisible
                const onLayoutVisible = useMemo(() => handleLayoutVisible(setState), [setState])
                const onLayoutAnimatedFinished = useMemo(
                        () => handleLayoutAnimatedFinished({onUnmount, unmount, onVisible})(setState),
                        [onUnmount, onVisible, setState, unmount]
                )

                const onLayoutAnimatedInit = useMemo(
                        () => handleLayoutAnimatedInit({unmount, lazy})(setState),
                        [lazy, setState, unmount]
                )

                const onStateEventChange = useCallback(
                        (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
                                handleLayoutAnimatedStateChange({...options, state, visible})(setState)(event),
                        [setState, visible]
                )

                const onStateEvent = useOnStateEvent({...renderProps, onStateEventChange})
                const {fadeAnimatedStyle, collapseAnimatedStyle} = useLayoutAnimated({
                        animatedType,
                        entry,
                        exit,
                        onAnimatedFinished: onLayoutAnimatedFinished,
                        opacity,
                        visible: layoutVisible ?? visible,
                        width
                })

                const animatedStyle = {fade: fadeAnimatedStyle, collapse: collapseAnimatedStyle} as Record<
                        LayoutAnimatedType,
                        AnimatedStyle<ViewStyle>
                >

                useEffect(() => {
                        onLayoutAnimatedInit(visible)
                }, [onLayoutAnimatedInit, visible])

                useEffect(() => {
                        onLayoutVisible(visible)
                }, [onLayoutVisible, visible])

                useEffect(() => {
                        InteractionManager.runAfterInteractions(() => nextUnmountEvent?.())
                }, [nextUnmountEvent])

                useEffect(() => {
                        InteractionManager.runAfterInteractions(() => nextVisibleEvent?.())
                }, [nextVisibleEvent])

                useEffect(() => {
                        InteractionManager.runAfterInteractions(() => nextStatusEvent?.())
                }, [nextStatusEvent])

                if (status === 'idle') {
                        return <></>
                }

                return unmountLayout ?
                                <></>
                        :       render({
                                        ...renderProps,
                                        animatedStyle: animatedStyle[animatedType],
                                        hidden,
                                        id,
                                        onStateEvent,
                                        ref,
                                        status,
                                        visible: layoutWasVisible
                                })
        }
)
