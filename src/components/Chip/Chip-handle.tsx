import {cloneElement} from 'react'
import {SharedValue} from 'react-native-reanimated'
import {DefaultTheme} from 'styled-components/native'
import {Updater} from 'use-immer'
import {AnimatedTiming, StateEvent} from '../../hooks'
import {State} from '../Common'
import {ElevationLevel} from '../Elevation'
import {Icon, IconProps} from '../Icon'
import {IconButton} from '../Icon-button'
import {
        ChipState,
        ChipType,
        HandleChipAnimatedTimingOptions,
        HandleChipAnimatedTimingSharedValue,
        HandleChipElevationOptions,
        HandleChipIconOptions,
        HandleChipStateChangeOptions
} from './Chip.interface'

export const handleChipStatus = (setState: Updater<ChipState>) => (disabled?: boolean) => (elevated?: boolean) =>
        setState(draft => {
                if (draft.status !== 'idle') {
                        return
                }

                if (elevated && !disabled) {
                        draft.elevation = 1
                }

                draft.status = 'succeeded'
        })

export const handleChipElevation =
        ({type, elevated, disabled}: HandleChipElevationOptions) =>
        (setState: Updater<ChipState>) =>
        (state = 'enabled' as State) => {
                const elevationType = type && ['assist', 'filter', 'suggestion', 'inputFilled'].includes(type)

                if (!elevationType) {
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
                const correctionCoefficient = elevated ? 1 : 0

                if (state) {
                        setState(draft => {
                                draft.elevation = (
                                        state === 'disabled' || disabled ?
                                                level[state]
                                        :       level[state] + correctionCoefficient) as ElevationLevel
                        })
                }
        }

export const handleChipStateChange =
        ({eventName}: HandleChipStateChangeOptions) =>
        (setState: Updater<ChipState>) =>
        (_event: StateEvent) => {
                if (eventName === 'layout') {
                        return
                }

                setState(draft => {
                        draft.eventName = eventName
                })
        }

export const handleChipDisabled = (setState: Updater<ChipState>) => (disabled?: boolean) =>
        typeof disabled === 'boolean' &&
        disabled &&
        setState(draft => {
                draft.eventName = 'none'
        })

export const handleChipIcon =
        ({disabled, eventName}: HandleChipIconOptions) =>
        (theme: DefaultTheme) =>
        (icon?: JSX.Element) => {
                if (!icon) {
                        return icon
                }

                const iconSize = theme.adaptSize(theme.token.spacing.medium)

                return cloneElement<IconProps>(icon, {
                        disabled,
                        eventName,
                        fill: theme.token.scheme.primary,
                        height: iconSize,
                        width: iconSize
                })
        }

export const handleChipCloseButton =
        ({disabled, onClose}: HandleChipIconOptions) =>
        (theme: DefaultTheme) => {
                const iconSize = theme.adaptSize(theme.token.spacing.large + -1.5 * theme.token.spacing.extraSmall)
                const iconButtonSize = theme.adaptSize(theme.token.spacing.large)

                return (
                        <IconButton
                                disabled={disabled}
                                height={iconButtonSize}
                                onPressOut={onClose}
                                type='standard'
                                width={iconButtonSize}
                                icon={
                                        <Icon
                                                height={iconSize}
                                                iconStyle='rounded'
                                                name='close'
                                                type='outlined'
                                                width={iconSize}
                                        />
                                }
                        />
                )
        }

export const handleChipBorderAnimatedTiming = ({
        animatedTiming,
        borderInputRange,
        disabled
}: HandleChipAnimatedTimingOptions) => {
        const value = disabled ? 0 : borderInputRange[borderInputRange.length - 2]

        return (borderSharedValue: SharedValue<number>) => (active?: boolean) =>
                animatedTiming()(borderSharedValue)(active && !disabled ? 2 : value)
}

const handleChipFilterIconAnimatedTiming =
        (animatedTiming: AnimatedTiming) =>
        (filterIconContainerWidthSharedValue: SharedValue<number>) =>
        (active?: boolean) =>
                animatedTiming()(filterIconContainerWidthSharedValue)(active ? 1 : 0)

export const handleChipAnimatedTiming = ({
        active,
        animatedTiming,
        borderInputRange,
        disabled,
        elevated
}: HandleChipAnimatedTimingOptions) => {
        const toValue = disabled ? 0 : 1

        return (type: ChipType) =>
                ({
                        borderSharedValue,
                        colorSharedValue,
                        filterIconContainerWidthSharedValue
                }: HandleChipAnimatedTimingSharedValue) => {
                        const borderAnimatedTiming = handleChipBorderAnimatedTiming({
                                animatedTiming,
                                borderInputRange,
                                disabled
                        })(borderSharedValue)

                        if (typeof active === 'boolean') {
                                borderAnimatedTiming(active)

                                if (type === 'filter') {
                                        handleChipFilterIconAnimatedTiming(animatedTiming)(
                                                filterIconContainerWidthSharedValue
                                        )(active)
                                }
                        }

                        animatedTiming()(colorSharedValue)(toValue)

                        if (typeof elevated === 'boolean') {
                                borderAnimatedTiming(elevated)
                        }
                }
}
