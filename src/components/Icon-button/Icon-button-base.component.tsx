import {forwardRef, useEffect, useId, useMemo} from 'react'
import {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../hooks'
import {State} from '../Common'
import {
        handleIconButtonDisabled,
        handleIconButtonStateChange,
        handleIconButtonUnderlayColor,
        renderIconButtonIcon
} from './Icon-button-handle'
import {IconButtonBaseProps, IconButtonState} from './Icon-button.interface'
import {useIconButtonAnimated} from './use-icon-button-animated.hook'

export const IconButtonBase = forwardRef<View, IconButtonBaseProps>(
        ({disabled: rawDisabled = false, fill, icon, render, type = 'filled', loading, ...renderProps}, ref) => {
                const [{eventName}, setState] = useImmer<IconButtonState>({})
                const theme = useTheme()
                const id = useId()
                const underlayColor = handleIconButtonUnderlayColor(theme)(type)
                const onIconButtonDisabled = useMemo(() => handleIconButtonDisabled(setState), [setState])
                const onStateEventChange =
                        (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
                                handleIconButtonStateChange({...options, state})(setState)(event)

                const disabled = loading || rawDisabled
                const onStateEvent = useOnStateEvent({...renderProps, disabled, onStateEventChange})
                const {backgroundUnderlayAnimatedStyle} = useIconButtonAnimated({disabled: rawDisabled, type})
                const iconElement = renderIconButtonIcon({disabled, eventName, fill, loading, type, id})(theme)(icon)

                useEffect(() => {
                        onIconButtonDisabled(disabled)
                }, [disabled, onIconButtonDisabled])

                return render({
                        ...renderProps,
                        backgroundUnderlayAnimatedStyle,
                        disabled,
                        eventName,
                        icon: iconElement,
                        loading,
                        onStateEvent,
                        ref,
                        theme,
                        type,
                        underlayColor
                })
        }
)
