import {forwardRef, useEffect, useId, useMemo} from 'react'
import {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import {HandleStateEventChangeOptions, StateEvent, useStateEvent} from '../../hooks'
import {State} from '../Common'
import {
        handleButtonDisabled,
        handleButtonStateChange,
        handleButtonStatus,
        handleButtonUnderlayColor,
        renderButtonIcon
} from './Button-handle'
import {ButtonType} from './Button.enum'
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
                        type = ButtonType.FILLED,
                        ...renderProps
                },
                ref
        ) => {
                const [{elevation, eventName, status}, setState] = useImmer<ButtonState>({status: 'idle'})
                const id = useId()
                const theme = useTheme()
                const onButtonDisabled = useMemo(() => handleButtonDisabled(setState)(type), [setState, type])
                const onButtonStatus = useMemo(() => handleButtonStatus(setState)(rawDisabled), [rawDisabled, setState])
                const underlayColor = handleButtonUnderlayColor(theme)(type)
                const onStateEventChange =
                        (options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
                                handleButtonStateChange({...options, state, type})(setState)(event)

                const disabled = useMemo(() => loading || rawDisabled, [loading, rawDisabled])
                const stateOnEvent = useStateEvent({...renderProps, disabled, onStateEventChange})
                const {backgroundUnderlayAnimatedStyle, labelTextAnimatedStyle} = useButtonAnimated({
                        disabled: rawDisabled,
                        error,
                        eventName,
                        type
                })

                const iconButtonElement = renderButtonIcon({eventName, type, disabled: rawDisabled, id})(theme)(icon)

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
                        ref,
                        stateOnEvent,
                        type,
                        underlayColor
                })
        }
)
