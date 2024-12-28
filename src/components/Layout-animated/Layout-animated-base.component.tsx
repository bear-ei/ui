import {forwardRef, useEffect, useId, useMemo} from 'react'
import {LayoutChangeEvent, LayoutRectangle, View, ViewStyle} from 'react-native'
import {AnimatedStyle} from 'react-native-reanimated'
import {Updater, useImmer} from 'use-immer'
import {OnStateEventChangedOptions, StateEvent, useOnStateEvent} from '../../hooks'
import {debounce} from '../../utils'
import {EventName, State} from '../Common'
import {
        HandleLayoutAnimatedFinishedOptions,
        HandleLayoutAnimatedInitOptions,
        HandleLayoutAnimatedStateChangedOptions,
        LayoutAnimatedBaseProps,
        LayoutAnimatedState,
        LayoutAnimatedType
} from './Layout-animated.interface'
import {useLayoutAnimated} from './use-layout-animated.hook'

const handleLayoutAnimatedLayoutVisible = (setState: Updater<LayoutAnimatedState>) => (value?: boolean) =>
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

const handleLayoutAnimatedLayoutChanged =
        (setState: Updater<LayoutAnimatedState>) => (visible?: boolean) => (layout: LayoutRectangle) => {
                const {width, height} = layout

                setState(draft => {
                        draft.layout.height = height
                        draft.layout.width = width

                        if (visible) {
                                draft.layoutVisible = visible
                                draft.layoutWasVisible = visible
                        }
                })
        }

const handleLayoutAnimatedStateChanged =
        ({eventName, onLayoutChanged}: HandleLayoutAnimatedStateChangedOptions) =>
        (event: StateEvent) => {
                const nextEvent = {
                        layout: () => onLayoutChanged((event as LayoutChangeEvent).nativeEvent.layout)
                } as Record<EventName, () => void>

                if (eventName) {
                        nextEvent[eventName]?.()
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
                        disabledAnimated,
                        entry,
                        exit,
                        hidden = true,
                        lazy = false,
                        onUnmount,
                        onVisible,
                        opacity,
                        render,
                        unmount,
                        visible: rawVisible,
                        width,
                        ...renderProps
                },
                ref
        ) => {
                const [
                        {
                                layout,
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
                        layout: {} as LayoutRectangle,
                        layoutVisible: undefined,
                        layoutWasVisible: undefined,
                        nextStatusEvent: undefined,
                        nextUnmountEvent: undefined,
                        nextVisibleEvent: undefined,
                        status: 'idle',
                        unmountLayout: undefined
                })

                const id = useId()
                const visible = rawVisible ?? defaultVisible
                const onLayoutAnimatedLayoutVisible = useMemo(
                        () => debounce(handleLayoutAnimatedLayoutVisible(setState))(50),
                        [setState]
                )

                const onLayoutAnimatedFinished = useMemo(
                        () => handleLayoutAnimatedFinished({onUnmount, unmount, onVisible})(setState),
                        [onUnmount, onVisible, setState, unmount]
                )

                const onLayoutAnimatedInit = useMemo(
                        () => handleLayoutAnimatedInit({unmount, lazy})(setState),
                        [lazy, setState, unmount]
                )

                const onLayoutAnimatedLayoutChanged = useMemo(
                        () => debounce(handleLayoutAnimatedLayoutChanged(setState)(visible))(50),
                        [setState, visible]
                )

                const onStateEventChange =
                        (options: OnStateEventChangedOptions) => (state: State) => (event: StateEvent) =>
                                handleLayoutAnimatedStateChanged({
                                        ...options,
                                        state,
                                        onLayoutChanged: onLayoutAnimatedLayoutChanged
                                })(event)

                const onStateEvent = useOnStateEvent({...renderProps, onStateEventChange})
                const {fadeAnimatedStyle, collapseAnimatedStyle} = useLayoutAnimated({
                        animatedType,
                        disabledAnimated,
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
                        onLayoutAnimatedLayoutVisible(visible)
                }, [onLayoutAnimatedLayoutVisible, visible])

                useEffect(() => {
                        nextUnmountEvent?.()
                }, [nextUnmountEvent])

                useEffect(() => {
                        nextVisibleEvent?.()
                }, [nextVisibleEvent])

                useEffect(() => {
                        nextStatusEvent?.()
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
                                        layout,
                                        onStateEvent,
                                        ref,
                                        status,
                                        visible: layoutWasVisible
                                })
        }
)
