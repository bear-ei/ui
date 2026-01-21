import {COMPONENT_STATUS, type ContentSize, EVENT_NAME, type EventName, type LayoutRectangle} from '@/constants'
import type {StateEvent} from '@/hooks'
import type {LayoutChangeEvent} from 'react-native'
import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import {LAYOUT_ANIMATED} from './Layout-animated.enum'
import type {
        AnimateLayoutAnimatedOptions,
        FinalizeLayoutAnimatedVisibleChangeOptions,
        HandleLayoutAnimatedStateChangeOptions,
        LayoutAnimatedState
} from './Layout-animated.interface'

export const updateLayoutAnimatedSize =
        (contentSize?: ContentSize) => (setState: Updater<LayoutAnimatedState>) => (layout?: LayoutRectangle) => {
                const {height, width} = contentSize ?? layout ?? {}

                setState(draft => {
                        if (draft.status !== COMPONENT_STATUS.SUCCEEDED && (width || height)) {
                                draft.status = COMPONENT_STATUS.SUCCEEDED
                        }

                        if (contentSize) {
                                return
                        }

                        const {width: prevWidth, height: prevHeight} = draft.layout

                        if (prevHeight !== height || prevWidth !== width) {
                                draft.layout.height = height ?? 0
                                draft.layout.width = width ?? 0
                        }
                })
        }

export const handleLayoutAnimatedStateChange =
        ({eventName, onLayoutChange}: HandleLayoutAnimatedStateChangeOptions) =>
        (event: StateEvent) => {
                const nextEvent = {
                        [EVENT_NAME.LAYOUT]: () =>
                                onLayoutChange((event as LayoutChangeEvent).nativeEvent.layout as LayoutRectangle)
                } as Record<EventName, () => void | Promise<void>>

                if (!eventName) {
                        return
                }

                nextEvent[eventName]?.()
        }

export const finalizeLayoutAnimatedVisibleChange =
        ({onUnmount, unmount, onAnimationFinished}: FinalizeLayoutAnimatedVisibleChangeOptions) =>
        (setState: Updater<LayoutAnimatedState>) =>
        (visible?: boolean) =>
                setState(draft => {
                        if (unmount && !visible) {
                                draft.status = COMPONENT_STATUS.IDLE

                                if (onUnmount) {
                                        draft.nextUnmountEvent = () => onUnmount?.()
                                }
                        }

                        if (onAnimationFinished) {
                                draft.nextAnimationFinishedEvent = () => onAnimationFinished?.(visible)
                        }
                })

export const updateLayoutAnimatedStatus =
        (lazy?: boolean) => (setState: Updater<LayoutAnimatedState>) => (visible?: boolean) =>
                setState(draft => {
                        if (draft.status === COMPONENT_STATUS.SUCCEEDED) {
                                return
                        }

                        draft.status = lazy && !visible ? COMPONENT_STATUS.IDLE : COMPONENT_STATUS.LOADING
                })

export const animateLayoutAnimated =
        ({entryAnimateSharedValueTo, exitAnimateSharedValueTo, animatedType}: AnimateLayoutAnimatedOptions) =>
        (containerSharedValue: SharedValue<number>) =>
        (visible?: boolean) => {
                if (animatedType === LAYOUT_ANIMATED.STANDARD || typeof visible !== 'boolean') {
                        return
                }

                if (visible) {
                        entryAnimateSharedValueTo({sharedValue: containerSharedValue})(1)

                        return
                }

                exitAnimateSharedValueTo({sharedValue: containerSharedValue})(0)
        }
