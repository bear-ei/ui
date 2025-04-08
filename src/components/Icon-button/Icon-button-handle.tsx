import {cloneElement} from 'react'
import {DefaultTheme} from 'styled-components/native'
import {Updater} from 'use-immer'
import {StateEvent} from '../../hooks'
import {Icon, IconProps, IconStyle, IconType} from '../Icon'
import {IconButtonType} from './Icon-button.enum'
import {
        HandleIconButtonAnimatedTimingOptions,
        HandleIconButtonAnimatedTimingSharedValue,
        HandleIconButtonStateChangeOptions,
        IconButtonState,
        RenderIconButtonIconOptions
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
                [IconButtonType.ACTIVE]: theme.token.scheme.onSurfaceVariant,
                [IconButtonType.FILLED]: theme.token.scheme.onPrimary,
                [IconButtonType.OUTLINED]: theme.token.scheme.onSurfaceVariant,
                [IconButtonType.STANDARD]: theme.token.scheme.onSurfaceVariant,
                [IconButtonType.TONAL]: theme.token.scheme.onSecondaryContainer
        }

        return (type: IconButtonType = IconButtonType.FILLED) => underlay[type]
}

export const renderIconButtonIcon =
        ({disabled, type, fill: rawFill, eventName, loading, id}: RenderIconButtonIconOptions) =>
        (theme: DefaultTheme) => {
                const fillType = {
                        [IconButtonType.ACTIVE]: theme.token.scheme.onSurfaceVariant,
                        [IconButtonType.FILLED]: theme.token.scheme.onPrimary,
                        [IconButtonType.OUTLINED]: theme.token.scheme.onSurfaceVariant,
                        [IconButtonType.STANDARD]: theme.token.scheme.onSurfaceVariant,
                        [IconButtonType.TONAL]: theme.token.scheme.onSecondaryContainer
                }

                const fill =
                        rawFill ??
                        (!loading ? fillType[type as keyof typeof fillType] : theme.token.scheme.onSurfaceVariant)

                return (icon?: React.JSX.Element) =>
                        cloneElement<IconProps>(
                                icon ?? (
                                        <Icon
                                                iconStyle={IconStyle.ROUNDED}
                                                type={IconType.OUTLINED}
                                        />
                                ),
                                {
                                        disabled,
                                        eventName,
                                        fill,
                                        testID: `iconButton__icon--${id}`
                                }
                        )
        }

export const handleIconButtonAnimatedTiming =
        ({animatedTiming, type}: HandleIconButtonAnimatedTimingOptions) =>
        ({borderSharedValue, colorSharedValue}: HandleIconButtonAnimatedTimingSharedValue) =>
        (disabled?: boolean) => {
                const toValue = disabled ? 0 : 1

                if (type === IconButtonType.OUTLINED) {
                        animatedTiming()(borderSharedValue)(toValue)
                        animatedTiming()(colorSharedValue)(toValue)

                        return
                }

                animatedTiming()(colorSharedValue)(toValue)
        }
