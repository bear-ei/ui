import {cloneElement} from 'react'
import {DefaultTheme} from 'styled-components/native'
import {Updater} from 'use-immer'
import {StateEvent} from '../../hooks'
import {Icon, IconProps} from '../Icon'
import {
        HandleIconButtonAnimatedTimingOptions,
        HandleIconButtonAnimatedTimingSharedValue,
        HandleIconButtonIconOptions,
        HandleIconButtonStateChangeOptions,
        IconButtonState,
        IconButtonType
} from './Icon-button.interface'

export const handleIconButtonStateChange =
        ({eventName}: HandleIconButtonStateChangeOptions) =>
        (setState: Updater<IconButtonState>) =>
        (_event: StateEvent) => {
                if (eventName === 'layout') {
                        return
                }

                setState(draft => {
                        draft.eventName = eventName
                })
        }

export const handleIconButtonDisabled = (setState: Updater<IconButtonState>) => (disabled?: boolean) =>
        disabled &&
        setState(draft => {
                draft.eventName = 'none'
        })

export const handleIconButtonUnderlayColor = (theme: DefaultTheme) => {
        const underlay = {
                active: theme.token.scheme.onSurfaceVariant,
                filled: theme.token.scheme.onPrimary,
                outlined: theme.token.scheme.onSurfaceVariant,
                standard: theme.token.scheme.onSurfaceVariant,
                tonal: theme.token.scheme.onSecondaryContainer
        }

        return (type: IconButtonType = 'filled') => underlay[type]
}

export const handleIconButtonIcon =
        ({disabled, type, fill, eventName, loading, id}: HandleIconButtonIconOptions) =>
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
                                        testID: `iconButton__icon--${id}`,
                                        fill:
                                                fill ??
                                                (!loading ?
                                                        fillType[type as keyof typeof fillType]
                                                :       theme.token.scheme.onSurfaceVariant)
                                }
                        )
        }

export const handleIconButtonAnimatedTiming =
        ({animatedTiming, type}: HandleIconButtonAnimatedTimingOptions) =>
        ({borderSharedValue, colorSharedValue}: HandleIconButtonAnimatedTimingSharedValue) =>
        (disabled?: boolean) => {
                const toValue = disabled ? 0 : 1

                if (type === 'outlined') {
                        animatedTiming()(borderSharedValue)(toValue)
                        animatedTiming()(colorSharedValue)(toValue)

                        return
                }

                animatedTiming()(colorSharedValue)(toValue)
        }
