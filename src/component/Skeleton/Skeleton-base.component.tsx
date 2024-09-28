import {forwardRef, useId} from 'react'
import {View} from 'react-native'
import {Updater, useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../hook'
import {EventName, State} from '../Common'
import {HandleSkeletonStateChangeOptions, SkeletonBaseProps, SkeletonState} from './Skeleton.interface'
import {useSkeletonAnimated} from './use-skeleton-animated.hook'

const handleSkeletonClose =
    (setState: Updater<SkeletonState>) =>
    (duration = 150) => {
        duration >= 0 &&
            setTimeout(
                () =>
                    setState(draft => {
                        draft.skeletonVisible = false
                        draft.status = 'succeeded'
                    }),
                duration
            )
    }

const handleSkeletonStateChange =
    ({eventName, duration}: HandleSkeletonStateChangeOptions) =>
    (setState: Updater<SkeletonState>) => {
        const nextEvent = {
            layout: () => handleSkeletonClose(setState)(duration)
        } as Record<EventName, () => void>

        return (_event: StateEvent) => eventName && nextEvent[eventName]?.()
    }

export const SkeletonBase = forwardRef<View, SkeletonBaseProps>(
    ({render, enableAnimated = true, duration, ...renderProps}, ref) => {
        const id = useId()
        const [{skeletonVisible, status}, setState] = useImmer<SkeletonState>({
            skeletonVisible: true,
            status: 'idle'
        })

        const onStateEventChange = (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
            handleSkeletonStateChange({...options, state, duration})(setState)(event)

        const onStateEvent = useOnStateEvent({...renderProps, onStateEventChange})
        const {containerAnimatedStyle} = useSkeletonAnimated({enableAnimated, skeletonVisible})

        return render({...renderProps, id, ref, onStateEvent, containerAnimatedStyle, skeletonVisible, status})
    }
)
