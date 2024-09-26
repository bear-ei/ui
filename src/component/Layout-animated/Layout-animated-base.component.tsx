import {forwardRef, useEffect, useId, useMemo} from 'react'
import {View} from 'react-native'
import {Updater, useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../hook'
import {State} from '../Common'
import {
    HandleLayoutAnimatedFinishedOptions,
    HandleLayoutAnimatedStateChangeOptions,
    InitialLayoutAnimatedState,
    LayoutAnimatedBaseProps
} from './Layout-animated.interface'
import {useLayoutAnimated} from './use-layout-animated.hook'

const handleLayoutVisible = (setState: Updater<InitialLayoutAnimatedState>) => (value?: boolean) =>
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
    (setState: Updater<InitialLayoutAnimatedState>) =>
    (_event: StateEvent) =>
        eventName === 'layout' &&
        visible &&
        setState(draft => {
            draft.layoutVisible = visible
            draft.layoutWasVisible = visible
        })

const createNextVisibleCallback = (onVisible?: (value?: boolean) => void) => (value?: boolean) => () =>
    onVisible?.(value)

const createNextUnmountCallback = (onUnmount?: () => void) => () => onUnmount?.()
const handleLayoutAnimatedFinished =
    ({onUnmount, unmount, onVisible}: HandleLayoutAnimatedFinishedOptions) =>
    (setState: Updater<InitialLayoutAnimatedState>) =>
    (value?: boolean) =>
        setState(draft => {
            if (value) {
                draft.nextVisibleCallback = createNextVisibleCallback(onVisible)(value)

                return
            }

            draft.layoutWasVisible = value

            if (unmount) {
                draft.nextUnmountCallback = createNextUnmountCallback(onUnmount)
                draft.unmountLayout = true

                return
            }

            draft.nextVisibleCallback = createNextVisibleCallback(onVisible)(value)
        })

const handleLayoutAnimatedInit =
    (setState: Updater<InitialLayoutAnimatedState>) => (unmount?: boolean) => (value?: boolean) =>
        setState(draft => {
            if (draft.status !== 'idle') {
                return
            }

            unmount && !value && (draft.unmountLayout = true)
            draft.status = 'succeeded'
        })

export const LayoutAnimatedBase = forwardRef<View, LayoutAnimatedBaseProps>(
    ({render, visible: visibleSource, defaultVisible, unmount, onUnmount, onVisible, ...renderProps}, ref) => {
        const [
            {layoutVisible, unmountLayout, layoutWasVisible, nextUnmountCallback, nextVisibleCallback, status},
            setState
        ] = useImmer<InitialLayoutAnimatedState>({
            layoutVisible: undefined,
            layoutWasVisible: undefined,
            nextUnmountCallback: undefined,
            nextVisibleCallback: undefined,
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

        const onLayoutAnimatedInit = useMemo(() => handleLayoutAnimatedInit(setState)(unmount), [setState, unmount])
        const onStateEventChange = (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
            handleLayoutAnimatedStateChange({...options, state, visible})(setState)(event)

        const onStateEvent = useOnStateEvent({...renderProps, onStateEventChange})
        const {containerAnimatedStyle} = useLayoutAnimated({
            onAnimatedFinished: onLayoutAnimatedFinished,
            visible: layoutVisible ?? visible
        })

        useEffect(() => {
            onLayoutAnimatedInit(visible)
        }, [onLayoutAnimatedInit, visible])

        useEffect(() => {
            onLayoutVisible(visible)
        }, [onLayoutVisible, visible])

        useEffect(() => {
            nextUnmountCallback?.()
        }, [nextUnmountCallback])

        useEffect(() => {
            nextVisibleCallback?.()
        }, [nextVisibleCallback])

        if (status === 'idle') {
            return <></>
        }

        return unmountLayout ?
                <></>
            :   render({
                    ...renderProps,
                    onStateEvent,
                    containerAnimatedStyle,
                    ref,
                    visible: layoutWasVisible,
                    id
                })
    }
)
