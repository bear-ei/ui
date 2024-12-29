import {WritableDraft} from 'immer'
import {forwardRef, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import {LayoutRectangle, View} from 'react-native'
import {Updater, useImmer} from 'use-immer'
import {
        HandleLayoutAnimatedFinishedOptions,
        HandleLayoutAnimatedInitOptions,
        HandleLayoutAnimatedLayoutVisibleDraftChangedOptions,
        LayoutAnimatedBaseProps,
        LayoutAnimatedState
} from './Layout-animated.interface'
import {useLayoutAnimated} from './use-layout-animated.hook'

const handleLayoutAnimatedLayoutVisible = (setState: Updater<LayoutAnimatedState>) => {
        const handleDraftChanged =
                ({value, width, height}: HandleLayoutAnimatedLayoutVisibleDraftChangedOptions) =>
                (draft: WritableDraft<LayoutAnimatedState>) => {
                        if (!value) {
                                draft.layoutVisible = value

                                return
                        }

                        if (draft.unmountLayout) {
                                draft.unmountLayout = false

                                return
                        }

                        draft.layout.height = height
                        draft.layout.width = width
                        draft.layoutVisible = value
                        draft.layoutWasVisible = value

                        if (draft.status === 'idle') {
                                draft.status = 'succeeded'
                        }
                }

        return (ref: React.RefObject<View>) => (value?: boolean) =>
                ref.current?.measure((_x, _y, width, height) => {
                        setState(handleDraftChanged({value, width, height}))
                })
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
                        lazy = false,
                        onUnmount,
                        onVisible,
                        opacity,
                        render,
                        unmount,
                        visible: rawVisible,
                        width,
                        height,
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

                const layoutAnimatedRef = useRef<View>(null)
                const id = useId()
                const visible = rawVisible ?? defaultVisible
                const onLayoutAnimatedLayoutVisible = useMemo(
                        () => handleLayoutAnimatedLayoutVisible(setState),
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

                const {containerAnimatedStyle} = useLayoutAnimated({
                        animatedType,
                        disabledAnimated,
                        entry,
                        exit,
                        height: height ?? layout.height,
                        onAnimatedFinished: onLayoutAnimatedFinished,
                        opacity,
                        visible: layoutVisible ?? visible,
                        width: width ?? layout.width
                })

                useImperativeHandle(
                        ref,
                        () => (layoutAnimatedRef?.current ? layoutAnimatedRef?.current : {}) as View,
                        []
                )

                useEffect(() => {
                        onLayoutAnimatedInit(visible)
                }, [onLayoutAnimatedInit, visible])

                useEffect(() => {
                        if (status === 'succeeded') {
                                onLayoutAnimatedLayoutVisible(layoutAnimatedRef)(visible)
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
                                        layout,
                                        ref: layoutAnimatedRef,
                                        status,
                                        visible: layoutWasVisible,
                                        width
                                })
        }
)
