import {forwardRef, useCallback, useEffect, useId, useMemo} from 'react'
import {InteractionManager, View} from 'react-native'
import {Updater, useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../hooks'
import {debounce} from '../../utils'
import {EventName, State} from '../Common'
import {HandleSkeletonStateChangeOptions, SkeletonBaseProps, SkeletonState} from './Skeleton.interface'
import {useSkeletonAnimated} from './use-skeleton-animated.hook'

const handleSkeletonVisible = (setState: Updater<SkeletonState>) => (duration?: number) => {
        if (typeof duration === 'number' && duration >= 0) {
                setState(draft => {
                        draft.skeletonVisible = true
                        draft.nextSkeletonVisible = debounce(() =>
                                setState(nextDraft => {
                                        nextDraft.skeletonVisible = false
                                })
                        )(duration)
                })

                return
        }

        setState(draft => {
                draft.skeletonVisible = true
        })
}

const handleSkeletonDurationChange = (setState: Updater<SkeletonState>) => (duration?: number) =>
        handleSkeletonVisible(setState)(duration)

const handleSkeletonStateChange =
        ({eventName, duration}: HandleSkeletonStateChangeOptions) =>
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
                const [{skeletonVisible, nextSkeletonVisible}, setState] = useImmer<SkeletonState>({
                        skeletonVisible: true,
                        nextSkeletonVisible: undefined
                })

                const onStateEventChange = useCallback(
                        (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
                                handleSkeletonStateChange({...options, state, duration})(setState)(event),
                        [duration, setState]
                )

                const onStateEvent = useOnStateEvent({...renderProps, onStateEventChange})
                const onSkeletonDurationChange = useMemo(() => handleSkeletonDurationChange(setState), [setState])
                const {containerAnimatedStyle} = useSkeletonAnimated({
                        enableAnimated,
                        skeletonVisible: typeof duration === 'number' ? skeletonVisible : false
                })

                useEffect(() => {
                        onSkeletonDurationChange(duration)
                }, [duration, onSkeletonDurationChange])

                useEffect(() => {
                        InteractionManager.runAfterInteractions(() => nextSkeletonVisible?.())
                }, [nextSkeletonVisible])

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
