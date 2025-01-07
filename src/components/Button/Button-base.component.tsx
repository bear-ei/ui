import {forwardRef, useEffect, useId, useMemo} from 'react'
import {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../hooks'
import {State} from '../Common'
import {
        handleButtonDisabled,
        handleButtonIcon,
        handleButtonStateChange,
        handleButtonStatus,
        handleButtonUnderlayColor
} from './Button-handle'
import {ButtonBaseProps, ButtonState} from './Button.interface'
import {useButtonAnimated} from './use-button-animated.hook'

export const ButtonBase = forwardRef<View, ButtonBaseProps>(
        ({disabled, error, icon, labelText = 'Label', loading, render, type = 'filled', ...renderProps}, ref) => {
                const [{elevation, eventName, status}, setState] = useImmer<ButtonState>({status: 'idle'})
                const theme = useTheme()
                const id = useId()
                const iconButtonElement = handleButtonIcon({eventName, type, disabled, id})(theme)(icon)
                const onButtonDisabled = useMemo(() => handleButtonDisabled(setState)(type), [setState, type])
                const onButtonStatus = useMemo(() => handleButtonStatus(setState)(disabled), [disabled, setState])
                const underlayColor = handleButtonUnderlayColor(theme)(type)
                const onStateEventChange =
                        (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
                                handleButtonStateChange({...options, state, type})(setState)(event)

                const disabledEvent = loading || disabled
                const onStateEvent = useOnStateEvent({...renderProps, disabled: disabledEvent, onStateEventChange})
                const {backgroundUnderlayAnimatedStyle, labelTextAnimatedStyle} = useButtonAnimated({
                        disabled,
                        eventName,
                        type,
                        error
                })

                useEffect(() => {
                        onButtonStatus(type)
                }, [onButtonStatus, type])

                useEffect(() => {
                        onButtonDisabled(disabled)
                }, [disabled, onButtonDisabled])

                if (status === 'idle') {
                        return <></>
                }

                return render({
                        ...renderProps,
                        backgroundUnderlayAnimatedStyle,
                        disabled: disabledEvent,
                        elevation,
                        eventName,
                        icon: iconButtonElement,
                        id,
                        labelText,
                        labelTextAnimatedStyle,
                        loading,
                        onStateEvent,
                        ref,
                        theme,
                        type,
                        underlayColor
                })
        }
)
