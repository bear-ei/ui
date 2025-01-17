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
        (
                {
                        disabled: rawDisabled,
                        error,
                        icon,
                        labelText = 'Label',
                        loading,
                        render,
                        type = 'filled',
                        ...renderProps
                },
                ref
        ) => {
                const [{elevation, eventName, status}, setState] = useImmer<ButtonState>({status: 'idle'})
                const id = useId()
                const theme = useTheme()
                const iconButtonElement = handleButtonIcon({eventName, type, disabled: rawDisabled, id})(theme)(icon)
                const onButtonDisabled = useMemo(() => handleButtonDisabled(setState)(type), [setState, type])
                const onButtonStatus = useMemo(() => handleButtonStatus(setState)(rawDisabled), [rawDisabled, setState])
                const underlayColor = handleButtonUnderlayColor(theme)(type)
                const onStateEventChange =
                        (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
                                handleButtonStateChange({...options, state, type})(setState)(event)

                const disabled = loading || rawDisabled
                const onStateEvent = useOnStateEvent({...renderProps, disabled, onStateEventChange})
                const {backgroundUnderlayAnimatedStyle, labelTextAnimatedStyle} = useButtonAnimated({
                        disabled: rawDisabled,
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
