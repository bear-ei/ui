import {EVENT_NAME, type EventName, LAYOUT, type LayoutRectangle} from '@/constants'
import type {AnimateSharedValueTo, HandleStateEventChangeOptions, StateEvent} from '@/hooks'
import type {LayoutChangeEvent} from 'react-native'
import type {
    GestureStateChangeEvent,
    GestureUpdateEvent,
    PanGestureHandlerEventPayload
} from 'react-native-gesture-handler'
import {scheduleOnRN} from 'react-native-worklets'
import type {Updater} from 'use-immer'
import type {
    AnimateDragOptions,
    DragState,
    UpdatePrevTranslateSharedValueOptions,
    UpdateTranslateOptions,
    UpdateTranslateScreenOptions,
    UpdateTranslateSharedValueOptions
} from './Drag.interface'

export const updateDragLayout =
    (setState: Updater<DragState>) =>
    ({width, height}: LayoutRectangle) =>
        setState(draft => {
            if (draft.layout.width !== width || draft.layout.height !== height) {
                draft.layout.width = width
                draft.layout.height = height
            }
        })

export const handleDragStateChange =
    ({eventName}: HandleStateEventChangeOptions) =>
    (onDragLayoutChange: (layout: LayoutRectangle) => void) =>
    (event: StateEvent) => {
        const nextEvent = {
            [EVENT_NAME.LAYOUT]: () =>
                onDragLayoutChange((event as LayoutChangeEvent).nativeEvent.layout as LayoutRectangle)
        } as Record<EventName, () => void>

        if (!eventName) {
            return
        }

        nextEvent[eventName]?.()
    }

export const updatePrevTranslate =
    ({prevTranslateXSharedValue, prevTranslateYSharedValue, onStart}: UpdatePrevTranslateSharedValueOptions) =>
    ({translateXSharedValue, translateYSharedValue}: UpdateTranslateSharedValueOptions) =>
    (event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => {
        'worklet'

        prevTranslateXSharedValue.value = translateXSharedValue.value
        prevTranslateYSharedValue.value = translateYSharedValue.value

        if (onStart) {
            scheduleOnRN(onStart, event)
        }
    }

export const updateTranslate = ({
    height,
    layout,
    layoutType = LAYOUT.VERTICAL,
    offset,
    onUpdate,
    width
}: UpdateTranslateScreenOptions) => {
    const clamp = (min: number) => (max: number) => (value: number) => Math.min(Math.max(value, min), max)
    const maxTranslateX = width - layout.width
    const maxTranslateY = height - layout.height
    const minTranslateX = 0
    const minTranslateY = 0

    return ({
            prevTranslateXSharedValue,
            prevTranslateYSharedValue,
            translateXSharedValue,
            translateYSharedValue
        }: UpdateTranslateOptions) =>
        (event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
            'worklet'

            const offsetY = typeof offset === 'number' ? offset : prevTranslateYSharedValue.value
            const offsetX = typeof offset === 'number' ? offset : prevTranslateXSharedValue.value
            const nextTranslationX = offsetX + event.translationX
            const nextTranslationY = offsetY + event.translationY
            const clampedX = clamp(minTranslateX)(maxTranslateX)(nextTranslationX)
            const clampedY = clamp(minTranslateY)(maxTranslateY)(nextTranslationY)

            translateXSharedValue.value = layoutType === LAYOUT.HORIZONTAL ? clampedX - offsetX : minTranslateX
            translateYSharedValue.value = layoutType === LAYOUT.VERTICAL ? clampedY - offsetY : minTranslateY

            if (onUpdate) {
                scheduleOnRN(onUpdate, event)
            }
        }
}

export const handlePanGestureEnd =
    (onEnd?: (event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => void) =>
    (event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => {
        'worklet'

        if (onEnd) {
            scheduleOnRN(onEnd, event)
        }
    }

export const animateDrag =
    (animateSharedValueTo: AnimateSharedValueTo) =>
    ({translateXSharedValue, translateYSharedValue}: AnimateDragOptions) =>
    () => {
        animateSharedValueTo({sharedValue: translateXSharedValue})(0)
        animateSharedValueTo({sharedValue: translateYSharedValue})(0)
    }
