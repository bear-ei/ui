import type {State} from '@/constants'
import {type HandleStateEventChangeOptions, type StateEvent, useInteractionStateEvent, useTheme} from '@/hooks'
import {forwardRef, useCallback, useEffect, useId, useMemo} from 'react'
import {useImmer} from 'use-immer'
import type {PressableType} from '../Touchable'
import {ICON_BUTTON_TYPE} from './Icon-button.enum'
import {getButtonUnderlayColor, handleIconButtonStateChange, updateIconButtonDisabledState} from './Icon-button.handler'
import type {IconButtonBaseProps, IconButtonState} from './Icon-button.interface'
import {RenderIconButton, RenderIconButtonIcon} from './Icon-button.render'
import {useIconButtonAnimated} from './use-icon-button-animated.hook'

export const IconButtonBase = forwardRef<PressableType, IconButtonBaseProps>(
    (
        {
            disabled: rawDisabled = false,
            icon,
            iconColor,
            loading,
            size,
            type = ICON_BUTTON_TYPE.FILLED,
            ...renderIconButtonProps
        },
        ref
    ) => {
        const [{eventName}, setState] = useImmer<IconButtonState>({})
        const id = useId()
        const isDisabled = loading || rawDisabled
        const theme = useTheme()
        const underlayColor = getButtonUnderlayColor(theme)(type)
        const onStateEventChange = useCallback(
            (options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
                handleIconButtonStateChange({...options, state})(setState)(event),
            [setState]
        )

        const interactionHandlers = useInteractionStateEvent({
            ...renderIconButtonProps,
            disabled: isDisabled,
            onStateEventChange
        })

        const {backgroundUnderlayAnimatedStyle} = useIconButtonAnimated({disabled: rawDisabled, type})
        const runUpdateDisabledState = useMemo(() => updateIconButtonDisabledState(setState), [setState])
        const iconElement = (
            <RenderIconButtonIcon
                disabled={isDisabled}
                eventName={eventName}
                icon={icon}
                iconColor={iconColor}
                id={id}
                loading={loading}
                size={size}
                type={type}
            />
        )

        useEffect(() => {
            runUpdateDisabledState(isDisabled)
        }, [runUpdateDisabledState, isDisabled])

        return (
            <RenderIconButton
                {...renderIconButtonProps}
                backgroundUnderlayAnimatedStyle={backgroundUnderlayAnimatedStyle}
                disabled={isDisabled}
                eventName={eventName}
                iconElement={iconElement}
                id={id}
                interactionHandlers={interactionHandlers}
                loading={loading}
                ref={ref}
                size={size}
                type={type}
                underlayColor={underlayColor}
            />
        )
    }
)

IconButtonBase.displayName = 'IconButtonBase'
