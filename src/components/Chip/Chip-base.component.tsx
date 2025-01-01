import {forwardRef, useEffect, useId, useMemo} from 'react'
import {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../hooks'
import {State} from '../Common'
import {Icon} from '../Icon'
import {
        handleChipCloseButton,
        handleChipDisabled,
        handleChipElevation,
        handleChipIcon,
        handleChipInit,
        handleChipStateChange
} from './Chip-handle'
import {ChipBaseProps, ChipState} from './Chip.interface'
import {useChipAnimated} from './use-chip-animated.hook'

export const ChipBase = forwardRef<View, ChipBaseProps>(
        (
                {
                        active,
                        chipStyle = 'outlined',
                        close,
                        disabled,
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
                const leadingIconElement = handleChipIcon({eventName, disabled})(theme)(
                        type === 'filter' ?
                                <Icon
                                        iconStyle='rounded'
                                        name='check'
                                        testID={`chip__filterIcon--${id}`}
                                        type='outlined'
                                />
                        :       leadingIcon
                )

                const trailingElement =
                        close ?
                                handleChipCloseButton({disabled, onClose, id})(theme)
                        :       handleChipIcon({eventName, disabled, id})(theme)(trailingIcon)

                const onChipDisabled = useMemo(() => handleChipDisabled(setState), [setState])
                const onChipElevation = useMemo(
                        () => handleChipElevation({type, disabled})(setState),
                        [disabled, setState, type]
                )

                const onChipInit = useMemo(() => handleChipInit(setState)(disabled), [disabled, setState])
                const onStateEventChange =
                        (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
                                handleChipStateChange({...options, state})(setState)(event)

                const disabledEvent = loading || disabled
                const onStateEvent = useOnStateEvent({...renderProps, disabled: disabledEvent, onStateEventChange})
                const {contentUnderlayAnimatedStyle, filterIconContainerAnimatedStyle, labelTextAnimatedStyle} =
                        useChipAnimated({active, disabled, elevated, type, chipStyle})

                useEffect(() => {
                        onChipElevation(elevated ? 'enabled' : 'disabled')
                }, [elevated, onChipElevation])

                useEffect(() => {
                        onChipInit(elevated)
                }, [onChipInit, elevated])

                useEffect(() => {
                        onChipDisabled(disabled)
                }, [disabled, onChipDisabled])

                if (status === 'idle') {
                        return <></>
                }

                return render({
                        ...renderProps,
                        active,
                        close,
                        contentUnderlayAnimatedStyle,
                        disabled: disabledEvent,
                        elevation,
                        eventName,
                        filterIconContainerAnimatedStyle,
                        id,
                        labelText,
                        labelTextAnimatedStyle,
                        leadingIcon: leadingIconElement,
                        onStateEvent,
                        ref,
                        theme,
                        trailing: trailingElement,
                        type
                })
        }
)
