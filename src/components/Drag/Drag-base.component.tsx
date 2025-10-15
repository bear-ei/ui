import type {State} from '@/constants'
import {type HandleStateEventChangeOptions, type StateEvent, useInteractionStateEvent} from '@/hooks'
import {forwardRef, useCallback, useId, useImperativeHandle, useMemo, useRef} from 'react'
import type {LayoutRectangle} from 'react-native'
import {useImmer} from 'use-immer'
import {handleDragStateChange, updateDragLayout} from './Drag.handler'
import type {DragBaseProps, DragRef, DragState} from './Drag.interface'
import {RenderDrag} from './Drag.render'
import {useDragAnimated} from './use-drag-animated.hook'

export const DragBase = forwardRef<DragRef, DragBaseProps>(
        ({width, height, onEnd, onStart, onUpdate, layoutType, offset, ...renderDragProps}, ref) => {
                const [{layout}, setState] = useImmer<DragState>({layout: {} as LayoutRectangle})
                const dragRef = useRef<DragRef>(null)
                const id = useId()
                const onLayoutChange = useMemo(() => updateDragLayout(setState), [setState])
                const onStateEventChange = useCallback(
                        (options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
                                handleDragStateChange({...options, state})(onLayoutChange)(event),
                        [onLayoutChange]
                )

                const interactionHandlers = useInteractionStateEvent({
                        ...renderDragProps,
                        disabled: false,
                        onStateEventChange
                })

                const {animatedStyle, panGesture, runAnimate} = useDragAnimated({
                        height,
                        layout,
                        layoutType,
                        offset,
                        onEnd,
                        onStart,
                        onUpdate,
                        width
                })

                useImperativeHandle(ref, () => ({...(dragRef?.current ?? {}), reset: runAnimate}) as DragRef, [
                        runAnimate
                ])

                return (
                        <RenderDrag
                                {...renderDragProps}
                                animatedStyle={animatedStyle}
                                id={id}
                                interactionHandlers={interactionHandlers}
                                panGesture={panGesture}
                                ref={dragRef}
                        />
                )
        }
)

DragBase.displayName = 'DragBase'
