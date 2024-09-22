import {forwardRef, useId} from 'react'
import {View} from 'react-native'
import {Updater, useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../hook'
import {EventName, State} from '../Common'
import {InitialSkeletonState, ProcessSkeletonStateChangeOptions, SkeletonBaseProps} from './Skeleton.interface'
import {useSkeletonAnimated} from './use-skeleton-animated.hook'

const processSkeletonClose =
    (setState: Updater<InitialSkeletonState>) =>
    (duration = 150) => {
        duration >= 0 &&
            setTimeout(() => {
                setState(draft => {
                    draft.skeletonVisible = false
                    draft.status = 'succeeded'
                })
            }, duration)
    }

const processSkeletonStateChange =
    ({eventName, duration}: ProcessSkeletonStateChangeOptions) =>
    (setState: Updater<InitialSkeletonState>) =>
    (_event: StateEvent) => {
        const nextEvent = {
            layout: () => processSkeletonClose(setState)(duration)
        } as Record<EventName, () => void>

        eventName && nextEvent[eventName]?.()
    }

export const SkeletonBase = forwardRef<View, SkeletonBaseProps>(
    ({render, enableAnimated = true, duration, ...renderProps}, ref) => {
        const id = useId()
        const [{skeletonVisible, status}, setState] = useImmer<InitialSkeletonState>({
            skeletonVisible: true,
            status: 'idle'
        })

        const onStateEventChange = (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
            processSkeletonStateChange({...options, state, duration})(setState)(event)

        const onStateEvent = useOnStateEvent({...renderProps, onStateEventChange})
        const animatedStyle = useSkeletonAnimated({enableAnimated, skeletonVisible})

        return render({...renderProps, id, ref, onStateEvent, animatedStyle, skeletonVisible, status})
    }
)
