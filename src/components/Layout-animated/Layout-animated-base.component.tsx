import {forwardRef, useCallback, useEffect, useId, useMemo} from 'react'
import {InteractionManager, View} from 'react-native'
import {Updater, useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../hooks'
import {State} from '../Common'
import {
        HandleLayoutAnimatedFinishedOptions,
        HandleLayoutAnimatedStateChangeOptions,
        LayoutAnimatedBaseProps,
        LayoutAnimatedState
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

const handleLayoutAnimatedInit = (setState: Updater<LayoutAnimatedState>) => (unmount?: boolean) => (value?: boolean) =>
        setState(draft => {
                if (draft.status !== 'idle') {
                        return
                }

                if (unmount && !value) {
                        draft.unmountLayout = true
                }

                draft.status = 'succeeded'
        })

export const LayoutAnimatedBase = forwardRef<View, LayoutAnimatedBaseProps>(
        (
                {
                        defaultVisible,
                        hidden = true,
                        onUnmount,
                        onVisible,
                        opacity,
                        render,
                        unmount,
                        visible: visibleSource,
                        ...renderProps
                },
                ref
        ) => {
                const [
                        {layoutVisible, unmountLayout, layoutWasVisible, nextUnmountEvent, nextVisibleEvent, status},
                        setState
                ] = useImmer<LayoutAnimatedState>({
                        layoutVisible: undefined,
                        layoutWasVisible: undefined,
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
                        () => handleLayoutAnimatedInit(setState)(unmount),
                        [setState, unmount]
                )

                const onStateEventChange = useCallback(
                        (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
                                handleLayoutAnimatedStateChange({...options, state, visible})(setState)(event),
                        [setState, visible]
                )

                const onStateEvent = useOnStateEvent({...renderProps, onStateEventChange})
                const {containerAnimatedStyle} = useLayoutAnimated({
                        onAnimatedFinished: onLayoutAnimatedFinished,
                        visible: layoutVisible ?? visible,
                        opacity
                })

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

                if (status === 'idle') {
                        return <></>
                }

                return unmountLayout ?
                                <></>
                        :       render({
                                        ...renderProps,
                                        containerAnimatedStyle,
                                        hidden,
                                        id,
                                        onStateEvent,
                                        ref,
                                        visible: layoutWasVisible
                                })
        }
)
