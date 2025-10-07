import {COMPONENT_STATUS, EVENT_NAME, EventName, LayoutRectangle} from '@/constants'
import type {LayoutChangeEvent} from 'react-native'
import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import type {StateEvent} from '../../hooks'
import {LAYOUT_ANIMATED} from './Layout-animated.enum'
import type {
        AnimateLayoutAnimatedOptions,
        ContentSize,
        FinalizeLayoutAnimatedVisibilityChangeOptions,
        HandleLayoutAnimatedStateChangeOptions,
        LayoutAnimatedState
} from './Layout-animated.interface'

export const updateLayoutAnimatedSize =
        (contentSize?: ContentSize) => (setState: Updater<LayoutAnimatedState>) => (layout: LayoutRectangle) => {
                const {height, width} = layout

                setState(draft => {
                        if (draft.status !== COMPONENT_STATUS.SUCCEEDED) {
                                draft.status = COMPONENT_STATUS.SUCCEEDED
                        }

                        if (contentSize) {
                                return
                        }

                        const {width: prevWidth, height: prevHeight} = draft.layout

                        if (prevHeight !== height || prevWidth !== width) {
                                draft.layout.height = height
                                draft.layout.width = width
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

export const finalizeLayoutAnimatedVisibilityChange =
        ({onUnmount, unmount, onVisibility}: FinalizeLayoutAnimatedVisibilityChangeOptions) =>
        (setState: Updater<LayoutAnimatedState>) =>
        (visible?: boolean) =>
                setState(draft => {
                        if (unmount && !visible) {
                                draft.status = COMPONENT_STATUS.IDLE

                                if (onUnmount) {
                                        draft.nextUnmountEvent = () => onUnmount?.()
                                }
                        }

                        if (onVisibility) {
                                draft.nextVisibilityEvent = () => onVisibility?.(visible)
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
        ({createEntrySharedValueAnimator, createExitSharedValueAnimator, animatedType}: AnimateLayoutAnimatedOptions) =>
        (containerSharedValue: SharedValue<number>) =>
        (visible?: boolean) => {
                if (animatedType === LAYOUT_ANIMATED.STANDARD || typeof visible !== 'boolean') {
                        return
                }

                if (visible) {
                        createEntrySharedValueAnimator({sharedValue: containerSharedValue})(1)

                        return
                }

                createExitSharedValueAnimator({sharedValue: containerSharedValue})(0)
        }
