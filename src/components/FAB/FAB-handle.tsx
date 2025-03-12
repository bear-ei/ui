import {WritableDraft} from 'immer'
import {cloneElement} from 'react'
import {SharedValue} from 'react-native-reanimated'
import {DefaultTheme} from 'styled-components/native'
import {Updater} from 'use-immer'
import {AnimatedTiming, StateEventType} from '../../hooks'
import {State} from '../Common'
import {ElevationLevel} from '../Elevation'
import {IconProps} from '../Icon'
import {FABState, FABType, HandleFABStateChangeOptions, RenderFABIconOptions} from './FAB.interface'

export const handleFABStatus = (setState: Updater<FABState>) => (disabled?: boolean) => (elevated?: boolean) =>
        setState(draft => {
                if (draft.status !== 'idle') {
                        return
                }

                if (elevated && !disabled) {
                        draft.elevation = 3
                }

                draft.status = 'succeeded'
        })

const handleFABElevation = (draft: WritableDraft<FABState>) => (elevated?: boolean) => (state?: State) => {
        if (!elevated) {
                return
        }

        const level = {
                disabled: 0,
                enabled: 0,
                error: 0,
                focused: 0,
                hovered: 1,
                longPressIn: 0,
                pressIn: 0
        }

        if (state) {
                draft.elevation = (state === 'disabled' ? level[state] : level[state] + 3) as ElevationLevel
        }
}

export const handleFABStateChange =
        ({eventName, elevated, state}: HandleFABStateChangeOptions) =>
        (setState: Updater<FABState>) =>
        (_event: StateEventType) => {
                if (eventName === 'layout') {
                        return
                }

                setState(draft => {
                        const prevEventName = draft.eventName

                        if (eventName) {
                                draft.eventName = eventName
                        }

                        if (prevEventName !== eventName) {
                                handleFABElevation(draft)(elevated)(state)
                        }
                })
        }

export const handleFABDisabled = (setState: Updater<FABState>) => (elevated?: boolean) => (disabled?: boolean) =>
        typeof disabled === 'boolean' &&
        setState(draft => {
                if (disabled) {
                        draft.eventName = 'none'
                }

                if (elevated) {
                        draft.elevation = disabled ? 0 : 1
                }
        })

export const handleFABUnderlayColor = (theme: DefaultTheme) => {
        const underlay = {
                primary: theme.token.scheme.onPrimaryContainer,
                secondary: theme.token.scheme.onSecondaryContainer,
                surface: theme.token.scheme.primary,
                tertiary: theme.token.scheme.onTertiaryContainer
        }

        return (type: FABType) => underlay[type]
}

export const renderFABIcon =
        ({disabled, eventName, size, type = 'primary', id}: RenderFABIconOptions) =>
        (theme: DefaultTheme) => {
                const fillType = {
                        primary: theme.token.scheme.onPrimaryContainer,
                        secondary: theme.token.scheme.onSecondaryContainer,
                        surface: theme.token.scheme.primary,
                        tertiary: theme.token.scheme.onTertiaryContainer
                } as Record<FABType, string>

                return (icon?: React.JSX.Element) => {
                        if (!icon) {
                                return icon
                        }

                        const iconSize = theme.adaptSize(theme.token.spacing.large + 3 * theme.token.spacing.extraSmall)

                        return cloneElement<IconProps>(icon, {
                                ...(size === 'large' && {width: iconSize, height: iconSize}),
                                disabled,
                                eventName,
                                fill: fillType[type],
                                testID: `fab__icon--${id}`
                        })
                }
        }

export const handleFABAnimatedTiming =
        (animatedTiming: AnimatedTiming) => (colorSharedValue: SharedValue<number>) => (disabled?: boolean) =>
                animatedTiming()(colorSharedValue)(disabled ? 0 : 1)
