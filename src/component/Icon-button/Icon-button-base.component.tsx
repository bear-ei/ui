import {cloneElement, forwardRef, useEffect, useId, useMemo} from 'react'
import {View} from 'react-native'
import {DefaultTheme, useTheme} from 'styled-components/native'
import {Updater, useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../hook'
import {State} from '../Common'
import {Icon, IconProps} from '../Icon'
import {
    HandleIconButtonStateChangeOptions,
    IconButtonBaseProps,
    IconButtonType,
    InitialIconButtonState,
    RenderIconButtonIconOptions
} from './Icon-button.interface'
import {useIconButtonAnimated} from './use-icon-button-animated.hook'

const handleIconButtonStateChange =
    ({eventName}: HandleIconButtonStateChangeOptions) =>
    (setState: Updater<InitialIconButtonState>) =>
    (_event: StateEvent) =>
        eventName !== 'layout' &&
        setState(draft => {
            draft.eventName = eventName
        })

const handleIconButtonDisabled = (setState: Updater<InitialIconButtonState>) => (disabled?: boolean) =>
    disabled &&
    setState(draft => {
        draft.eventName = 'none'
    })

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
    ({disabled, type, fill, eventName}: RenderIconButtonIconOptions) =>
    (theme: DefaultTheme) => {
        const fillType = {
            active: theme.token.scheme.onSurfaceVariant,
            filled: theme.token.scheme.onPrimary,
            outlined: theme.token.scheme.onSurfaceVariant,
            standard: theme.token.scheme.onSurfaceVariant,
            tonal: theme.token.scheme.onSecondaryContainer
        }

        return (icon?: React.JSX.Element) => {
            return cloneElement<IconProps>(icon ?? <Icon />, {
                disabled,
                eventName,
                fill: fill ?? fillType[type as keyof typeof fillType]
            })
        }
    }

export const IconButtonBase = forwardRef<View, IconButtonBaseProps>(
    ({densityScale, disabled = false, fill, icon, render, type = 'filled', ...renderProps}, ref) => {
        const [{eventName}, setState] = useImmer<InitialIconButtonState>({eventName: undefined})
        const id = useId()
        const theme = useTheme()
        const activeColor = theme.token.scheme.secondaryContainer
        const underlayColor = handleIconButtonUnderlayColor(theme)(type)
        const iconElement = renderIconButtonIcon({disabled, fill, type, eventName})(theme)(icon)
        const onIconButtonDisabled = useMemo(() => handleIconButtonDisabled(setState), [setState])
        const onStateEventChange = (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
            handleIconButtonStateChange({...options, state})(setState)(event)

        const onStateEvent = useOnStateEvent({...renderProps, disabled, onStateEventChange})
        const {contentUnderlayAnimatedStyle} = useIconButtonAnimated({disabled, type})

        useEffect(() => {
            onIconButtonDisabled(disabled)
        }, [disabled, onIconButtonDisabled])

        return render({
            ...renderProps,
            activeColor,
            contentUnderlayAnimatedStyle,
            densityScale,
            disabled,
            eventName,
            icon: iconElement,
            id,
            onStateEvent,
            ref,
            type,
            underlayColor
        })
    }
)
