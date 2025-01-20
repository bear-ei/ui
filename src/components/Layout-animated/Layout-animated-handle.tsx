import {WritableDraft} from 'immer'
import {LayoutChangeEvent} from 'react-native'
import {SharedValue} from 'react-native-reanimated'
import {Updater} from 'use-immer'
import {StateEvent} from '../../hooks'
import {EventName} from '../Common'
import {
        HandleLayoutAnimatedFinishedOptions,
        HandleLayoutAnimatedLayoutVisibleOptions,
        HandleLayoutAnimatedStateChangeOptions,
        HandleLayoutAnimatedStatusOptions,
        HandleLayoutAnimatedTimingOptions,
        LayoutAnimatedState
} from './Layout-animated.interface'

export const handleLayoutAnimatedLayoutChange =
        (setState: Updater<LayoutAnimatedState>) => (event: LayoutChangeEvent) => {
                const {height, width} = event.nativeEvent.layout

                setState(draft => {
                        const {width: prevWidth, height: prevHeight} = draft.layout

                        if (prevHeight !== height || prevWidth !== width) {
                                draft.layout.height = height
                                draft.layout.width = width
                        }

                        if (draft.status !== 'succeeded') {
                                draft.status = 'succeeded'
                        }
                })
        }

export const handleLayoutAnimatedStateChange =
        ({eventName, onLayoutChange}: HandleLayoutAnimatedStateChangeOptions) =>
        (event: StateEvent) => {
                const nextEvent = {
                        layout: () => onLayoutChange(event as LayoutChangeEvent)
                } as Record<EventName, () => void>

                if (eventName) {
                        nextEvent[eventName]?.()
                }
        }

export const handleLayoutAnimatedLayoutVisible = ({onVisible, setState}: HandleLayoutAnimatedLayoutVisibleOptions) => {
        const handleNextVisibleEvent = (value?: boolean) => () => onVisible?.(value)
        const handleDraftChange = (value?: boolean) => (draft: WritableDraft<LayoutAnimatedState>) => {
                if (value === draft.visible) {
                        return
                }

                draft.invisible = !value
                draft.nextVisibleEvent = handleNextVisibleEvent(value)
                draft.visible = value
        }

        return (value?: boolean) => setState(handleDraftChange(value))
}

export const handleLayoutAnimatedFinished =
        ({onUnmount, unmount}: HandleLayoutAnimatedFinishedOptions) =>
        (setState: Updater<LayoutAnimatedState>) =>
        (value?: boolean) => {
                setState(draft => {
                        draft.invisible = !value

                        if (unmount && !value) {
                                draft.nextUnmountEvent = onUnmount
                                draft.status = 'idle'
                                draft.unmountLayout = true
                        }
                })
        }

export const handleLayoutAnimatedStatus =
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

export const handleLayoutAnimatedTiming =
        ({animatedTiming, onAnimatedFinished, entry, exit}: HandleLayoutAnimatedTimingOptions) =>
        (containerSharedValue: SharedValue<number>) =>
        (visible?: boolean) =>
                typeof visible === 'boolean' &&
                animatedTiming({
                        ...(visible ? entry : exit),
                        callback: (finished?: boolean) => finished && onAnimatedFinished?.(visible)
                })(containerSharedValue)(visible ? 1 : 0)
