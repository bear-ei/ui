import {WritableDraft} from 'immer'
import {LayoutChangeEvent, View} from 'react-native'
import {SharedValue} from 'react-native-reanimated'
import {Updater} from 'use-immer'
import {StateEvent} from '../../hooks'
import {EventName} from '../Common'
import {
        HandleLayoutAnimatedFinishedOptions,
        HandleLayoutAnimatedLayoutVisibleDraftChangeOptions,
        HandleLayoutAnimatedLayoutVisibleOptions,
        HandleLayoutAnimatedStateChangeOptions,
        HandleLayoutAnimatedStatusOptions,
        HandleLayoutAnimatedTimingOptions,
        LayoutAnimatedState,
        LayoutAnimatedType
} from './Layout-animated.interface'

export const handleLayoutAnimatedLayoutChange =
        (setState: Updater<LayoutAnimatedState>) =>
        (animatedType: LayoutAnimatedType) =>
        (event: LayoutChangeEvent) => {
                const {height, width} = event.nativeEvent.layout

                setState(draft => {
                        if (draft.status !== 'succeeded') {
                                if (animatedType.startsWith('collapse')) {
                                        console.info(animatedType.startsWith('collapse'), height)
                                        draft.layout.height = height
                                        draft.layout.width = width
                                }

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

export const handleLayoutAnimatedLayoutVisible = ({
        animatedType,
        onVisible,
        setState
}: HandleLayoutAnimatedLayoutVisibleOptions) => {
        const handleNextVisibleEvent = (value?: boolean) => () => onVisible?.(value)
        const handleDraftChange =
                ({value, width, height}: HandleLayoutAnimatedLayoutVisibleDraftChangeOptions) =>
                (draft: WritableDraft<LayoutAnimatedState>) => {
                        if (!value) {
                                draft.visible = value

                                return
                        }

                        if (animatedType?.startsWith('collapse')) {
                                const {width: prevWidth, height: prevHeight} = draft.layout

                                if (prevWidth !== width || prevHeight !== height) {
                                        draft.layout.height = height || draft.layout.height
                                        draft.layout.width = width || draft.layout.width
                                }
                        }

                        draft.invisible = !value
                        draft.nextVisibleEvent = handleNextVisibleEvent(value)
                        draft.visible = value
                }

        return (ref: React.RefObject<View>) => (value?: boolean) =>
                ref.current?.measure((_x, _y, width, height) => setState(handleDraftChange({value, width, height})))
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
