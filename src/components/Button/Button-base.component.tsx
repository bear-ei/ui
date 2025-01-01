import {forwardRef, useEffect, useId, useMemo} from 'react'
import {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../hooks'
import {State} from '../Common'
import {
        handleButtonDisabled,
        handleButtonIcon,
        handleButtonInit,
        handleButtonStateChange,
        handleButtonUnderlayColor
} from './Button-handle'
import {ButtonBaseProps, ButtonState} from './Button.interface'
import {useButtonAnimated} from './use-button-animated.hook'

export const ButtonBase = forwardRef<View, ButtonBaseProps>(
        ({disabled, error, icon, labelText = 'Label', loading, render, type = 'filled', ...renderProps}, ref) => {
                const [{elevation, eventName, status}, setState] = useImmer<ButtonState>({
                        elevation: undefined,
                        eventName: undefined,
                        status: 'idle'
                })

                const theme = useTheme()
                const iconButtonElement = handleButtonIcon({eventName, type, disabled})(theme)(icon)
                const id = useId()
                const onButtonDisabled = useMemo(() => handleButtonDisabled(setState)(type), [setState, type])
                const onButtonInit = useMemo(() => handleButtonInit(setState)(disabled), [disabled, setState])
                const underlayColor = handleButtonUnderlayColor(theme)(type)
                const onStateEventChange =
                        (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
                                handleButtonStateChange({...options, state, type})(setState)(event)

                const onStateEvent = useOnStateEvent({
                        ...renderProps,
                        disabled: loading || disabled,
                        onStateEventChange
                })

                const {contentUnderlayAnimatedStyle, labelTextAnimatedStyle} = useButtonAnimated({
                        disabled,
                        eventName,
                        type,
                        error
                })

                useEffect(() => {
                        onButtonInit(type)
                }, [onButtonInit, type])

                useEffect(() => {
                        onButtonDisabled(disabled)
                }, [disabled, onButtonDisabled])

                if (status === 'idle') {
                        return <></>
                }

                return render({
                        ...renderProps,
                        contentUnderlayAnimatedStyle,
                        disabled,
                        elevation,
                        eventName,
                        icon: iconButtonElement,
                        id,
                        labelText,
                        labelTextAnimatedStyle,
                        loading,
                        onStateEvent,
                        ref,
                        type,
                        underlayColor
                })
        }
)
