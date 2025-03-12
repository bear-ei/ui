import {forwardRef, useEffect, useId, useMemo} from 'react'
import {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import {HandleStateEventChangeOptions, StateEventType, useStateEvent} from '../../hooks'
import {State} from '../Common'
import {Icon} from '../Icon'
import {
        handleChipDisabled,
        handleChipElevation,
        handleChipStateChange,
        handleChipStatus,
        renderChipCloseButton,
        renderChipIcon
} from './Chip-handle'
import {ChipBaseProps, ChipState} from './Chip.interface'
import {useChipAnimated} from './use-chip-animated.hook'

export const ChipBase = forwardRef<View, ChipBaseProps>(
        (
                {
                        active,
                        chipStyle = 'outlined',
                        close,
                        disabled: rawDisabled,
                        elevated,
                        labelText = 'Label',
                        leadingIcon,
                        loading,
                        onClose,
                        render,
                        trailingIcon,
                        type = 'assist',
                        ...renderProps
                },
                ref
        ) => {
                const [{elevation, eventName, status}, setState] = useImmer<ChipState>({status: 'idle'})
                const theme = useTheme()
                const id = useId()
                const onChipDisabled = useMemo(() => handleChipDisabled(setState), [setState])
                const onChipElevation = useMemo(
                        () => handleChipElevation({type, disabled: rawDisabled})(setState),
                        [rawDisabled, setState, type]
                )

                const onChipStatus = useMemo(() => handleChipStatus(setState)(rawDisabled), [rawDisabled, setState])
                const onStateEventChange =
                        (options: HandleStateEventChangeOptions) => (state: State) => (event: StateEventType) =>
                                handleChipStateChange({...options, state})(setState)(event)

                const disabled = loading || rawDisabled
                const stateEvent = useStateEvent({...renderProps, disabled, onStateEventChange})
                const {backgroundUnderlayAnimatedStyle, filterIconLayoutAnimatedStyle, labelTextAnimatedStyle} =
                        useChipAnimated({active, disabled: rawDisabled, elevated, type, chipStyle})

                const leadingIconElement = renderChipIcon({eventName, disabled: rawDisabled, id})(theme)(
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
                                renderChipCloseButton({disabled: rawDisabled, onClose, id})(theme)
                        :       renderChipIcon({eventName, disabled: rawDisabled, id})(theme)(trailingIcon)

                useEffect(() => {
                        onChipElevation(elevated ? 'enabled' : 'disabled')
                }, [elevated, onChipElevation])

                useEffect(() => {
                        onChipStatus(elevated)
                }, [onChipStatus, elevated])

                useEffect(() => {
                        onChipDisabled(rawDisabled)
                }, [rawDisabled, onChipDisabled])

                if (status === 'idle') {
                        return <></>
                }

                return render({
                        ...renderProps,
                        active,
                        backgroundUnderlayAnimatedStyle,
                        close,
                        disabled,
                        elevation,
                        eventName,
                        filterIconLayoutAnimatedStyle,
                        labelText,
                        labelTextAnimatedStyle,
                        leadingIcon: leadingIconElement,
                        stateEvent,
                        ref,
                        theme,
                        trailing: trailingElement,
                        type
                })
        }
)
