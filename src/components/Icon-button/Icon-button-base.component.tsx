import {cloneElement, forwardRef, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import {View} from 'react-native'
import {DefaultTheme, useTheme} from 'styled-components/native'
import {Updater, useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../hooks'
import {EventName, State} from '../Common'
import {Icon, IconProps} from '../Icon'
import {
        HandleIconButtonStateChangeOptions,
        IconButtonBaseProps,
        IconButtonState,
        IconButtonType,
        RenderIconButtonIconOptions
} from './Icon-button.interface'
import {useIconButtonAnimated} from './use-icon-button-animated.hook'

const handleIconButtonStateChange =
        ({eventName, touchableRef}: HandleIconButtonStateChangeOptions) =>
        (setState: Updater<IconButtonState>) =>
        (_event: StateEvent) => {
                const nextEvent = {
                        pressIn: () => touchableRef?.current?.focus()
                } as Record<EventName, () => void>

                if (eventName === 'layout') {
                        return
                }

                setState(draft => {
                        const prevEventName = draft.eventName

                        draft.eventName = eventName

                        if (prevEventName !== eventName && eventName === 'pressIn') {
                                draft.nextPressInEvent = nextEvent[eventName]
                        }
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
                const touchableRef = useRef<View>(null)
                const theme = useTheme()
                const activeColor = theme.token.scheme.secondaryContainer
                const underlayColor = handleIconButtonUnderlayColor(theme)(type)
                const onIconButtonDisabled = useMemo(() => handleIconButtonDisabled(setState), [setState])
                const onStateEventChange =
                        (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
                                handleIconButtonStateChange({...options, state, touchableRef})(setState)(event)

                const onStateEvent = useOnStateEvent({
                        ...renderProps,
                        disabled: loading || disabled,
                        onStateEventChange
                })

                const {contentUnderlayAnimatedStyle} = useIconButtonAnimated({disabled, type})
                const iconElement = renderIconButtonIcon({disabled, eventName, fill, loading, type})(theme)(icon)

                useImperativeHandle(ref, () => (touchableRef?.current ? touchableRef?.current : {}) as View, [])

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
                        ref: touchableRef,
                        theme,
                        type,
                        underlayColor
                })
        }
)
