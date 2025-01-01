import {forwardRef, useEffect, useId, useMemo} from 'react'
import {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../hooks'
import {State} from '../Common'
import {
        handleIconButtonDisabled,
        handleIconButtonIcon,
        handleIconButtonStateChange,
        handleIconButtonUnderlayColor
} from './Icon-button-handle'
import {IconButtonBaseProps, IconButtonState} from './Icon-button.interface'
import {useIconButtonAnimated} from './use-icon-button-animated.hook'

export const IconButtonBase = forwardRef<View, IconButtonBaseProps>(
        ({disabled = false, fill, icon, render, type = 'filled', loading, ...renderProps}, ref) => {
                const [{eventName}, setState] = useImmer<IconButtonState>({eventName: undefined})
                const id = useId()
                const theme = useTheme()

                const underlayColor = handleIconButtonUnderlayColor(theme)(type)
                const onIconButtonDisabled = useMemo(() => handleIconButtonDisabled(setState), [setState])
                const onStateEventChange =
                        (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
                                handleIconButtonStateChange({...options, state})(setState)(event)

                const disabledEvent = loading || disabled
                const onStateEvent = useOnStateEvent({...renderProps, disabled: disabledEvent, onStateEventChange})
                const {contentUnderlayAnimatedStyle} = useIconButtonAnimated({disabled, type})
                const iconElement = handleIconButtonIcon({disabled, eventName, fill, loading, type})(theme)(icon)

                useEffect(() => {
                        onIconButtonDisabled(disabled)
                }, [disabled, onIconButtonDisabled])

                return render({
                        ...renderProps,
                        contentUnderlayAnimatedStyle,
                        disabled: disabledEvent,
                        eventName,
                        icon: iconElement,
                        id,
                        loading,
                        onStateEvent,
                        ref,
                        theme,
                        type,
                        underlayColor
                })
        }
)
