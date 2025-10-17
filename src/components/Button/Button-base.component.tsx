import {COMPONENT_STATUS, type State} from '@/constants'
import {type HandleStateEventChangeOptions, type StateEvent, useInteractionStateEvent, useTheme} from '@/hooks'
import {forwardRef, useCallback, useEffect, useId, useMemo} from 'react'
import {useImmer} from 'use-immer'
import type {PressableType} from '../Touchable'
import {BUTTON_TYPE} from './Button.enum'
import {
        getButtonUnderlayColor,
        handleButtonStateChange,
        updateButtonDisabledState,
        updateButtonStatus
} from './Button.handler'
import type {ButtonBaseProps, ButtonState} from './Button.interface'
import {RenderButton, RenderButtonIcon} from './Button.render'
import {useButtonAnimated} from './use-button-animated.hook'

export const ButtonBase = forwardRef<PressableType, ButtonBaseProps>(
        (
                {
                        disabled: rawDisabled,
                        error,
                        icon,
                        labelText = 'Label',
                        linkColor,
                        loading,
                        type = BUTTON_TYPE.FILLED,
                        ...renderButtonProps
                },
                ref
        ) => {
                const [{elevation, eventName}, setState] = useImmer<ButtonState>({
                        status: COMPONENT_STATUS.IDLE
                })

                const id = useId()
                const isDisabled = loading || rawDisabled
                const theme = useTheme()
                const underlayColor = getButtonUnderlayColor(theme)(linkColor)(type)
                const onStateEventChange = useCallback(
                        (options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
                                handleButtonStateChange({...options, state, type})(setState)(event),
                        [setState, type]
                )

                const interactionHandlers = useInteractionStateEvent({
                        ...renderButtonProps,
                        disabled: isDisabled,
                        onStateEventChange
                })

                const {backgroundUnderlayAnimatedStyle, labelTextAnimatedStyle} = useButtonAnimated({
                        disabled: rawDisabled,
                        error,
                        eventName,
                        linkColor,
                        type
                })

                const runUpdateStatus = useMemo(
                        () => updateButtonStatus(rawDisabled)(setState),
                        [rawDisabled, setState]
                )

                const runUpdateDisabledState = useMemo(
                        () => updateButtonDisabledState(type)(setState),
                        [setState, type]
                )

                const iconElement = icon && (
                        <RenderButtonIcon
                                disabled={rawDisabled}
                                icon={icon}
                                id={id}
                                type={type}
                        />
                )

                useEffect(() => {
                        runUpdateStatus(type)
                }, [type, runUpdateStatus])

                useEffect(() => {
                        runUpdateDisabledState(isDisabled)
                }, [isDisabled, runUpdateDisabledState])

                return (
                        <RenderButton
                                {...renderButtonProps}
                                backgroundUnderlayAnimatedStyle={backgroundUnderlayAnimatedStyle}
                                disabled={isDisabled}
                                elevation={elevation}
                                eventName={eventName}
                                iconElement={iconElement}
                                id={id}
                                interactionHandlers={interactionHandlers}
                                labelText={labelText}
                                labelTextAnimatedStyle={labelTextAnimatedStyle}
                                linkColor={linkColor}
                                loading={loading}
                                ref={ref}
                                type={type}
                                underlayColor={underlayColor}
                        />
                )
        }
)

ButtonBase.displayName = 'ButtonBase'
