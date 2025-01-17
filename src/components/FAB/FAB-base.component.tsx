import {forwardRef, useEffect, useId, useMemo} from 'react'
import {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../hooks'
import {State} from '../Common'
import {
        handleFABDisabled,
        handleFABIcon,
        handleFABStateChange,
        handleFABStatus,
        handleFABUnderlayColor
} from './FAB-handle'
import {FABBaseProps, FABState} from './FAB.interface'
import {useFABAnimated} from './use-fab-animated.hook'

export const FABBase = forwardRef<View, FABBaseProps>(
        (
                {
                        disabled: rawDisabled,
                        loading,
                        elevated = true,
                        icon,
                        render,
                        size = 'medium',
                        type = 'primary',
                        ...renderProps
                },
                ref
        ) => {
                const [{elevation, eventName, status}, setState] = useImmer<FABState>({status: 'idle'})
                const id = useId()
                const theme = useTheme()
                const underlayColor = handleFABUnderlayColor(theme)(type)
                const onFABDisabled = useMemo(() => handleFABDisabled(setState)(elevated), [elevated, setState])
                const onFABStatus = useMemo(() => handleFABStatus(setState)(rawDisabled), [rawDisabled, setState])
                const fabIconElement = handleFABIcon({eventName, type, disabled: rawDisabled, size, id})(theme)(icon)
                const onStateEventChange =
                        (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
                                handleFABStateChange({...options, state, elevated})(setState)(event)

                const disabled = loading || rawDisabled
                const onStateEvent = useOnStateEvent({...renderProps, disabled, onStateEventChange})
                const {backgroundUnderlayAnimatedStyle, labelTextAnimatedStyle} = useFABAnimated({
                        disabled: rawDisabled,
                        type
                })

                useEffect(() => {
                        onFABDisabled(rawDisabled)
                }, [rawDisabled, onFABDisabled])

                useEffect(() => {
                        onFABStatus(elevated)
                }, [elevated, onFABStatus])

                if (status === 'idle') {
                        return <></>
                }

                return render({
                        ...renderProps,
                        backgroundUnderlayAnimatedStyle,
                        disabled,
                        elevation,
                        eventName,
                        icon: fabIconElement,
                        id,
                        labelTextAnimatedStyle,
                        loading,
                        onStateEvent,
                        ref,
                        size,
                        type,
                        underlayColor
                })
        }
)
