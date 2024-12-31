import {WritableDraft} from 'immer'
import {forwardRef, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import {LayoutChangeEvent, LayoutRectangle, View} from 'react-native'
import {Updater, useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../hooks'
import {debounce} from '../../utils'
import {EventName, State} from '../Common'
import {
        HandleLayoutAnimatedFinishedOptions,
        HandleLayoutAnimatedLayoutVisibleDraftChangeOptions,
        HandleLayoutAnimatedLayoutVisibleOptions,
        HandleLayoutAnimatedStateChangeOptions,
        HandleLayoutAnimatedStatusOptions,
        LayoutAnimatedBaseProps,
        LayoutAnimatedState,
        LayoutAnimatedType
} from './Layout-animated.interface'
import {useLayoutAnimated} from './use-layout-animated.hook'

const handleLayoutAnimatedLayoutChange =
        (setState: Updater<LayoutAnimatedState>) =>
        (animatedType: LayoutAnimatedType) =>
        (event: LayoutChangeEvent) => {
                const {height, width} = event.nativeEvent.layout

                setState(draft => {
                        if (draft.status !== 'succeeded') {
                                if (animatedType.startsWith('collapse')) {
                                        draft.layout.height = height
                                        draft.layout.width = width
                                }

                                draft.status = 'succeeded'
                        }
                })
        }

const handleLayoutAnimatedStateChange =
        ({eventName, onLayoutChange}: HandleLayoutAnimatedStateChangeOptions) =>
        (event: StateEvent) => {
                const nextEvent = {
                        layout: () => onLayoutChange(event as LayoutChangeEvent)
                } as Record<EventName, () => void>

                if (eventName) {
                        nextEvent[eventName]?.()
                }
        }

const handleLayoutAnimatedLayoutVisible = ({setState, animatedType}: HandleLayoutAnimatedLayoutVisibleOptions) => {
        const handleDraftChange =
                ({value, width, height}: HandleLayoutAnimatedLayoutVisibleDraftChangeOptions) =>
                (draft: WritableDraft<LayoutAnimatedState>) => {
                        if (!value) {
                                draft.layoutVisible = value

                                return
                        }

                        if (animatedType?.startsWith('collapse')) {
                                const {width: prevWidth, height: prevHeight} = draft.layout

                                if (prevWidth !== width || prevHeight !== height) {
                                        draft.layout.height = height
                                        draft.layout.width = width
                                }
                        }

                        draft.layoutVisible = value
                        draft.layoutWasVisible = value
                }

        return (ref: React.RefObject<View>) => (value?: boolean) =>
                ref.current?.measure((_x, _y, width, height) => setState(handleDraftChange({value, width, height})))
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
                                draft.status = 'idle'
                                draft.unmountLayout = true

                                return
                        }

                        draft.nextVisibleEvent = handleNextVisibleEvent
                })
        }

const handleLayoutAnimatedStatus =
        ({unmount, lazy}: HandleLayoutAnimatedStatusOptions) =>
        (setState: Updater<LayoutAnimatedState>) =>
        (value?: boolean) =>
                setState(draft => {
                        if (draft.status === 'succeeded') {
                                return
                        }

                        if (unmount) {
                                draft.unmountLayout = !value
                        }

                        draft.status = lazy && !value ? 'idle' : 'loading'
                })

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
                        layoutWasVisible: true,
                        nextStatusEvent: undefined,
                        nextUnmountEvent: undefined,
                        nextVisibleEvent: undefined,
                        status: 'idle',
                        unmountLayout: undefined
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
                        onLayoutAnimatedStatus(visible)
                }, [onLayoutAnimatedStatus, visible])

                useEffect(() => {
                        if (status === 'succeeded') {
                                onLayoutAnimatedLayoutVisible(visible)
                        }
                }, [onLayoutAnimatedLayoutVisible, status, visible])

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
