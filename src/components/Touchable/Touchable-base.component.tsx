import {forwardRef, useId, useImperativeHandle, useMemo, useRef} from 'react'
import {LayoutRectangle, View} from 'react-native'
import {useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../hooks'
import {State} from '../Common'
import {handleTouchableAnimatedFinished, handleTouchableRipples, handleTouchableStateChange} from './Touchable-handle'
import {TouchableBaseProps, TouchableRippleSequence, TouchableState} from './Touchable.interface'

export const TouchableBase = forwardRef<View, TouchableBaseProps>(
        ({centered, disabled, enableTouchableRipple = true, render, underlayColor, ...renderProps}, ref) => {
                const [{rippleSequence, contentLayout}, setState] = useImmer<TouchableState>({
                        contentLayout: {} as LayoutRectangle,
                        rippleSequence: {} as TouchableRippleSequence
                })

                const id = useId()
                const pressableRef = useRef<View>(null)
                const onTouchableAnimatedFinished = useMemo(() => handleTouchableAnimatedFinished(setState), [setState])
                const onStateEventChange =
                        (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
                                handleTouchableStateChange({
                                        ...options,
                                        enableTouchableRipple,
                                        ref: pressableRef,
                                        state
                                })(setState)(event)

                const onStateEvent = useOnStateEvent({...renderProps, disabled, onStateEventChange})
                const rippleElements = handleTouchableRipples({
                        centered,
                        containerLayout: contentLayout,
                        id,
                        onAnimatedFinished: onTouchableAnimatedFinished,
                        underlayColor
                })(rippleSequence)

                useImperativeHandle(ref, () => (pressableRef?.current ? pressableRef?.current : {}) as View, [])

                return render({...renderProps, onStateEvent, ref: pressableRef, rippleElements, id})
        }
)
