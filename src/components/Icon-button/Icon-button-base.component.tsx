import {cloneElement, forwardRef, useEffect, useId, useMemo} from 'react'
import {View} from 'react-native'
import {DefaultTheme, useTheme} from 'styled-components/native'
import {Updater, useImmer} from 'use-immer'
import {OnStateEventChangedOptions, StateEvent, useOnStateEvent} from '../../hooks'
import {State} from '../Common'
import {Icon, IconProps} from '../Icon'
import {
        HandleIconButtonStateChangedOptions,
        IconButtonBaseProps,
        IconButtonState,
        IconButtonType,
        RenderIconButtonIconOptions
} from './Icon-button.interface'
import {useIconButtonAnimated} from './use-icon-button-animated.hook'

const handleIconButtonStateChanged =
        ({eventName}: HandleIconButtonStateChangedOptions) =>
        (setState: Updater<IconButtonState>) =>
        (_event: StateEvent) => {
                if (eventName === 'layout') {
                        return
                }

                setState(draft => {
                        draft.eventName = eventName
                })
        }
const handleIconButtonDisabled = (setState: Updater<IconButtonState>) => (disabled?: boolean) => {
        if (disabled) {
                setState(draft => {
                        draft.eventName = 'none'
                })
        }
}

const handleIconButtonUnderlayColor = (theme: DefaultTheme) => {
        const underlay = {
                active: theme.token.scheme.onSurfaceVariant,
                filled: theme.token.scheme.onPrimary,
                outlined: theme.token.scheme.onSurfaceVariant,
                standard: theme.token.scheme.onSurfaceVariant,
                tonal: theme.token.scheme.onSecondaryContainer
        }

        return (type: IconButtonType = 'filled') => underlay[type]
}

const renderIconButtonIcon =
        ({disabled, type, fill, eventName, loading}: RenderIconButtonIconOptions) =>
        (theme: DefaultTheme) => {
                const fillType = {
                        active: theme.token.scheme.onSurfaceVariant,
                        filled: theme.token.scheme.onPrimary,
                        outlined: theme.token.scheme.onSurfaceVariant,
                        standard: theme.token.scheme.onSurfaceVariant,
                        tonal: theme.token.scheme.onSecondaryContainer
                }

                return (icon?: JSX.Element) =>
                        cloneElement<IconProps>(
                                icon ?? (
                                        <Icon
                                                iconStyle='rounded'
                                                type='outlined'
                                        />
                                ),
                                {
                                        disabled,
                                        eventName,
                                        fill:
                                                fill ??
                                                (!loading ?
                                                        fillType[type as keyof typeof fillType]
                                                :       theme.token.scheme.onSurfaceVariant)
                                }
                        )
        }

export const IconButtonBase = forwardRef<View, IconButtonBaseProps>(
        ({disabled = false, fill, icon, render, type = 'filled', loading, ...renderProps}, ref) => {
                const [{eventName, nextPressInEvent}, setState] = useImmer<IconButtonState>({eventName: undefined})
                const id = useId()
                const theme = useTheme()
                const activeColor = theme.token.scheme.secondaryContainer
                const underlayColor = handleIconButtonUnderlayColor(theme)(type)
                const onIconButtonDisabled = useMemo(() => handleIconButtonDisabled(setState), [setState])
                const onStateEventChange =
                        (options: OnStateEventChangedOptions) => (state: State) => (event: StateEvent) =>
                                handleIconButtonStateChanged({...options, state})(setState)(event)

                const onStateEvent = useOnStateEvent({
                        ...renderProps,
                        disabled: loading || disabled,
                        onStateEventChange
                })

                const {contentUnderlayAnimatedStyle} = useIconButtonAnimated({disabled, type})
                const iconElement = renderIconButtonIcon({disabled, eventName, fill, loading, type})(theme)(icon)

                useEffect(() => {
                        onIconButtonDisabled(disabled)
                }, [disabled, onIconButtonDisabled])

                useEffect(() => {
                        nextPressInEvent?.()
                }, [nextPressInEvent])

                return render({
                        ...renderProps,
                        activeColor,
                        contentUnderlayAnimatedStyle,
                        disabled,
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
