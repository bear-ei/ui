import {cloneElement, forwardRef, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import {InteractionManager, View} from 'react-native'
import {DefaultTheme, useTheme} from 'styled-components/native'
import {Updater, useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../hooks'
import {EventName, State} from '../Common'
import {ElevationLevel} from '../Elevation'
import {Icon, IconProps} from '../Icon'
import {IconButton} from '../Icon-button'
import {
        ChipBaseProps,
        ChipState,
        HandleChipElevationOptions,
        HandleChipStateChangeOptions,
        RenderChipIconOptions
} from './Chip.interface'
import {useChipAnimated} from './use-chip-animated.hook'

const handleChipElevation =
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

const handleChipStateChange = ({eventName, touchableRef}: HandleChipStateChangeOptions) => {
        const nextEvent = {
                pressIn: () => touchableRef?.current?.focus()
        } as Record<EventName, () => void>

        return (setState: Updater<ChipState>) => (_event: StateEvent) => {
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
}

const handleChipInit = (setState: Updater<ChipState>) => (disabled?: boolean) => (elevated?: boolean) =>
        setState(draft => {
                if (draft.status !== 'idle') {
                        return
                }

                if (elevated && !disabled) {
                        draft.elevation = 1
                }

                draft.status = 'succeeded'
        })

const handleChipDisabled = (setState: Updater<ChipState>) => (disabled?: boolean) => {
        if (typeof disabled === 'boolean' && disabled) {
                setState(draft => {
                        draft.eventName = 'none'
                })
        }
}

const renderChipIcon =
        ({disabled, eventName}: RenderChipIconOptions) =>
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

const renderChipCloseButton =
        ({disabled, onClose, type}: RenderChipIconOptions) =>
        (theme: DefaultTheme) => {
                const iconSize = theme.adaptSize(theme.token.spacing.medium)
                const iconButtonSize =
                        type === 'inputFilled' ?
                                theme.adaptSize(theme.token.spacing.large + -1.5 * theme.token.spacing.extraSmall)
                        :       theme.adaptSize(theme.token.spacing.large)

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

export const ChipBase = forwardRef<View, ChipBaseProps>(
        (
                {
                        active,
                        close,
                        disabled,
                        elevated,
                        labelText = 'Label',
                        leadingIcon,
                        onClose,
                        render,
                        trailingIcon,
                        type = 'assist',
                        ...renderProps
                },
                ref
        ) => {
                const [{elevation, eventName, status, nextPressInEvent}, setState] = useImmer<ChipState>({
                        elevation: undefined,
                        eventName: undefined,
                        nextPressInEvent: undefined,
                        status: 'idle'
                })

                const theme = useTheme()
                const activeColor = theme.token.scheme.secondaryContainer
                const id = useId()
                const leadingIconElement = renderChipIcon({eventName, disabled})(theme)(
                        type === 'filter' ?
                                <Icon
                                        iconStyle='rounded'
                                        name='check'
                                        type='outlined'
                                />
                        :       leadingIcon
                )

                const trailingElement =
                        close ?
                                renderChipCloseButton({disabled, onClose, type})(theme)
                        :       renderChipIcon({eventName, disabled})(theme)(trailingIcon)

                const onChipDisabled = useMemo(() => handleChipDisabled(setState), [setState])
                const onChipElevation = useMemo(
                        () => handleChipElevation({type, disabled})(setState),
                        [disabled, setState, type]
                )

                const onChipInit = useMemo(() => handleChipInit(setState)(disabled), [disabled, setState])
                const touchableRef = useRef<View>(null)
                const underlayColor = theme.token.scheme.onSurfaceVariant
                const onStateEventChange =
                        (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
                                handleChipStateChange({...options, state, touchableRef})(setState)(event)

                const onStateEvent = useOnStateEvent({
                        ...renderProps,
                        disabled,
                        onStateEventChange
                })

                const {contentUnderlayAnimatedStyle, filterIconContainerAnimatedStyle, labelTextAnimatedStyle} =
                        useChipAnimated({active, disabled, elevated, type})

                useImperativeHandle(ref, () => (touchableRef?.current ? touchableRef?.current : {}) as View, [])

                useEffect(() => {
                        onChipElevation(elevated ? 'enabled' : 'disabled')
                }, [elevated, onChipElevation])

                useEffect(() => {
                        onChipInit(elevated)
                }, [onChipInit, elevated])

                useEffect(() => {
                        onChipDisabled(disabled)
                }, [disabled, onChipDisabled])

                useEffect(() => {
                        InteractionManager.runAfterInteractions(() => nextPressInEvent?.())
                }, [nextPressInEvent])

                if (status === 'idle') {
                        return <></>
                }

                return render({
                        ...renderProps,
                        active,
                        activeColor,
                        close,
                        contentUnderlayAnimatedStyle,
                        disabled,
                        elevation,
                        eventName,
                        filterIconContainerAnimatedStyle,
                        id,
                        labelText,
                        labelTextAnimatedStyle,
                        leadingIcon: leadingIconElement,
                        onStateEvent,
                        ref: touchableRef,
                        trailing: trailingElement,
                        type,
                        underlayColor
                })
        }
)
