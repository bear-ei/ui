import {forwardRef, useEffect, useId, useMemo} from 'react'
import {View} from 'react-native'
import {Updater, useImmer} from 'use-immer'
import {OnStateEventChangedOptions, StateEvent, useOnStateEvent} from '../../hooks'
import {debounce} from '../../utils'
import {EventName, State} from '../Common'
import {HandleSkeletonStateChangedOptions, SkeletonBaseProps, SkeletonState} from './Skeleton.interface'
import {useSkeletonAnimated} from './use-skeleton-animated.hook'

const handleSkeletonVisible = (setState: Updater<SkeletonState>) => (duration?: number) => {
        if (typeof duration === 'number' && duration >= 0) {
                const handleNextSkeletonVisibleEvent = debounce(() =>
                        setState(nextDraft => {
                                nextDraft.skeletonVisible = false
                        })
                )(duration)

                setState(draft => {
                        draft.nextSkeletonVisibleEvent = handleNextSkeletonVisibleEvent
                        draft.skeletonVisible = true
                })

                return
        }

        if (typeof duration === 'number' && duration < 0) {
                setState(draft => {
                        draft.skeletonVisible = true
                })
        }
}

const handleSkeletonDurationChange = (setState: Updater<SkeletonState>) => (duration?: number) =>
        handleSkeletonVisible(setState)(duration)

const handleSkeletonStateChanged =
        ({eventName, duration}: HandleSkeletonStateChangedOptions) =>
        (setState: Updater<SkeletonState>) => {
                const nextEvent = {
                        layout: () => handleSkeletonVisible(setState)(duration)
                } as Record<EventName, () => void>

                return (_event: StateEvent) => {
                        if (eventName) {
                                nextEvent[eventName]?.()
                        }
                }
        }

export const SkeletonBase = forwardRef<View, SkeletonBaseProps>(
        ({render, enableAnimated = true, duration, ...renderProps}, ref) => {
                const id = useId()
                const [{skeletonVisible, nextSkeletonVisibleEvent}, setState] = useImmer<SkeletonState>({
                        nextSkeletonVisibleEvent: undefined,
                        skeletonVisible: true
                })

                const onStateEventChange =
                        (options: OnStateEventChangedOptions) => (state: State) => (event: StateEvent) =>
                                handleSkeletonStateChanged({...options, state, duration})(setState)(event)

                const onStateEvent = useOnStateEvent({...renderProps, onStateEventChange})
                const onSkeletonDurationChange = useMemo(() => handleSkeletonDurationChange(setState), [setState])
                const {containerAnimatedStyle} = useSkeletonAnimated({
                        enableAnimated,
                        skeletonVisible: typeof duration === 'number' && duration ? skeletonVisible : false
                })

                useEffect(() => {
                        onSkeletonDurationChange(duration)
                }, [duration, onSkeletonDurationChange])

                useEffect(() => {
                        nextSkeletonVisibleEvent?.()
                }, [nextSkeletonVisibleEvent])

                return render({
                        ...renderProps,
                        containerAnimatedStyle,
                        id,
                        onStateEvent,
                        ref,
                        skeletonVisible
                })
        }
)
