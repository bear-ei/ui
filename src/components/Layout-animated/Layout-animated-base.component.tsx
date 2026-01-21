import {COMPONENT_STATUS, type State} from '@/constants'
import {
        type HandleStateEventChangeOptions,
        type StateEvent,
        useClearComponentEvent,
        useInteractionStateEvent
} from '@/hooks'
import {forwardRef, useCallback, useEffect, useId, useMemo} from 'react'
import type {LayoutRectangle, View} from 'react-native'
import {useImmer} from 'use-immer'
import {LAYOUT_ANIMATED} from './Layout-animated.enum'
import {
        finalizeLayoutAnimatedVisibleChange,
        handleLayoutAnimatedStateChange,
        updateLayoutAnimatedSize,
        updateLayoutAnimatedStatus
} from './Layout-animated.handler'
import type {LayoutAnimatedBaseProps, LayoutAnimatedState} from './Layout-animated.interface'
import {RenderLayoutAnimated} from './Layout-animated.render'
import {useLayoutAnimated} from './use-layout-animated.hook'

export const LayoutAnimatedBase = forwardRef<View, LayoutAnimatedBaseProps>(
        (
                {
                        animatedType = LAYOUT_ANIMATED.FADE,
                        contentSize: rawContentSize,
                        defaultVisible,
                        delay,
                        entry,
                        exit,
                        lazy = false,
                        onAnimationFinished: rawOnAnimationFinished,
                        onUnmount,
                        opacity,
                        outputRanges,
                        scale = false,
                        translate,
                        unmount,
                        visible,
                        ...renderLayoutAnimatedProps
                },
                ref
        ) => {
                const [{layout, nextUnmountEvent, nextAnimationFinishedEvent, status}, setState] =
                        useImmer<LayoutAnimatedState>({layout: {} as LayoutRectangle, status: COMPONENT_STATUS.IDLE})

                useClearComponentEvent(setState)

                const id = useId()
                const isVisible = visible ?? defaultVisible
                const contentSize = useMemo(
                        () =>
                                typeof rawContentSize === 'number' ?
                                        {width: rawContentSize, height: rawContentSize}
                                :       rawContentSize,
                        [rawContentSize]
                )

                const onAnimationFinished = useMemo(
                        () =>
                                finalizeLayoutAnimatedVisibleChange({
                                        onAnimationFinished: rawOnAnimationFinished,
                                        onUnmount,
                                        unmount
                                })(setState),
                        [onUnmount, rawOnAnimationFinished, setState, unmount]
                )

                const onLayoutChange = useMemo(
                        () => updateLayoutAnimatedSize(contentSize)(setState),
                        [contentSize, setState]
                )

                const onStateEventChange = useCallback(
                        (options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
                                handleLayoutAnimatedStateChange({...options, onLayoutChange, state})(event),
                        [onLayoutChange]
                )

                const interactionHandlers = useInteractionStateEvent({
                        ...renderLayoutAnimatedProps,
                        onStateEventChange
                })

                const {containerAnimatedStyle} = useLayoutAnimated({
                        animatedType,
                        delay,
                        entry,
                        exit,
                        height: layout.height ?? contentSize?.height,
                        onAnimationFinished,
                        opacity,
                        outputRanges,
                        scale,
                        status,
                        translate,
                        visible: isVisible,
                        width: layout.width ?? contentSize?.width
                })

                const runUpdateStatus = useMemo(() => updateLayoutAnimatedStatus(lazy)(setState), [lazy, setState])
                const runLayoutChange = onLayoutChange

                useEffect(() => {
                        if (contentSize) {
                                runLayoutChange()
                        }
                }, [contentSize, runLayoutChange])

                useEffect(() => {
                        runUpdateStatus(isVisible)
                }, [isVisible, runUpdateStatus])

                useEffect(() => {
                        nextUnmountEvent?.()
                }, [nextUnmountEvent])

                useEffect(() => {
                        nextAnimationFinishedEvent?.()
                }, [nextAnimationFinishedEvent])

                if (status === COMPONENT_STATUS.IDLE && [lazy, unmount].some(Boolean)) {
                        return <></>
                }

                return (
                        <RenderLayoutAnimated
                                {...renderLayoutAnimatedProps}
                                animatedType={animatedType}
                                containerAnimatedStyle={containerAnimatedStyle}
                                id={id}
                                interactionHandlers={interactionHandlers}
                                ref={ref}
                                visible={isVisible}
                        />
                )
        }
)

LayoutAnimatedBase.displayName = 'LayoutAnimatedBase'
