import {Size} from '@bearei/material-token'
import {WritableDraft} from 'immer'
import {cloneElement} from 'react'
import {SharedValue} from 'react-native-reanimated'
import {DefaultTheme} from 'styled-components/native'
import {Updater} from 'use-immer'
import {AnimatedTiming, StateEvent} from '../../hooks'
import {State} from '../Common'
import {ElevationLevel} from '../Elevation'
import {IconProps} from '../Icon'
import {FABType} from './FAB.enum'
import {FABState, HandleFABStateChangeOptions, RenderFABIconOptions} from './FAB.interface'

export const handleFABStatus = (setState: Updater<FABState>) => (disabled?: boolean) => (elevated?: boolean) =>
        setState(draft => {
                if (draft.status !== 'idle') {
                        return
                }

                if (elevated && !disabled) {
                        draft.elevation = ElevationLevel.LEVEL_3
                }

                draft.status = 'succeeded'
        })

const handleFABElevation = (draft: WritableDraft<FABState>) => (elevated?: boolean) => (state?: State) => {
        if (!elevated) {
                return
        }

        const level = {
                disabled: ElevationLevel.LEVEL_0,
                enabled: ElevationLevel.LEVEL_0,
                error: ElevationLevel.LEVEL_0,
                focused: ElevationLevel.LEVEL_0,
                hovered: ElevationLevel.LEVEL_1,
                longPressIn: ElevationLevel.LEVEL_0,
                pressIn: ElevationLevel.LEVEL_0
        }

        if (state) {
                draft.elevation = (
                        state === 'disabled' ?
                                level[state]
                        :       level[state] + ElevationLevel.LEVEL_3) as ElevationLevel
        }
}

export const handleFABStateChange =
        ({eventName, elevated, state}: HandleFABStateChangeOptions) =>
        (setState: Updater<FABState>) =>
        (_event: StateEvent) => {
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
                        draft.elevation = disabled ? ElevationLevel.LEVEL_0 : ElevationLevel.LEVEL_1
                }
        })

export const handleFABUnderlayColor = (theme: DefaultTheme) => {
        const underlay = {
                [FABType.PRIMARY]: theme.token.scheme.onPrimaryContainer,
                [FABType.SECONDARY]: theme.token.scheme.onSecondaryContainer,
                [FABType.SURFACE]: theme.token.scheme.primary,
                [FABType.TERTIARY]: theme.token.scheme.onTertiaryContainer
        }

        return (type: FABType) => underlay[type]
}

export const renderFABIcon =
        ({disabled, eventName, size, type = FABType.PRIMARY, id}: RenderFABIconOptions) =>
        (theme: DefaultTheme) => {
                const fillType = {
                        [FABType.PRIMARY]: theme.token.scheme.onPrimaryContainer,
                        [FABType.SECONDARY]: theme.token.scheme.onSecondaryContainer,
                        [FABType.SURFACE]: theme.token.scheme.primary,
                        [FABType.TERTIARY]: theme.token.scheme.onTertiaryContainer
                } as Record<FABType, string>

                return (icon?: React.JSX.Element) => {
                        if (!icon) {
                                return icon
                        }

                        const iconSize = theme.adaptSize(theme.token.spacing.large + 3 * theme.token.spacing.extraSmall)

                        return cloneElement<IconProps>(icon, {
                                ...(size === Size.LARGE && {width: iconSize, height: iconSize}),
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
