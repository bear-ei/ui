import {COMPONENT_STATUS, type State} from '@/constants'
import {type HandleStateEventChangeOptions, type StateEvent, useInteractionStateEvent, useTheme} from '@/hooks'
import {SIZE} from '@bearei/theme-token'
import {forwardRef, useCallback, useEffect, useId, useMemo} from 'react'
import {useImmer} from 'use-immer'
import type {PressableType} from '../Touchable'
import {FAB_TYPE} from './FAB.enum'
import {getFABUnderlayColor, handleFABStateChange, updateFABDisabledState, updateFABStatus} from './FAB.handler'
import type {FABBaseProps, FABState} from './FAB.interface'
import {RenderFAB, RenderFABIcon} from './FAB.render'
import {useFABAnimated} from './use-fab-animated.hook'

export const FABBase = forwardRef<PressableType, FABBaseProps>(
        (
                {
                        disabled: rawDisabled,
                        elevated = true,
                        icon,
                        labelText,
                        loading,
                        size = SIZE.MEDIUM,
                        type = FAB_TYPE.PRIMARY,
                        ...renderFABProps
                },
                ref
        ) => {
                const [{elevation, eventName}, setState] = useImmer<FABState>({status: COMPONENT_STATUS.IDLE})
                const id = useId()
                const theme = useTheme()
                const isDisabled = loading || rawDisabled
                const extended = !!labelText
                const underlayColor = getFABUnderlayColor(theme)(type)
                const onStateEventChange = useCallback(
                        (options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
                                handleFABStateChange({...options, state, elevated})(setState)(event),
                        [elevated, setState]
                )

                const interactionHandlers = useInteractionStateEvent({
                        ...renderFABProps,
                        disabled: isDisabled,
                        onStateEventChange
                })

                const {backgroundUnderlayAnimatedStyle, labelTextAnimatedStyle} = useFABAnimated({
                        disabled: rawDisabled,
                        type
                })

                const runUpdateStatus = useMemo(() => updateFABStatus(rawDisabled)(setState), [rawDisabled, setState])
                const runUpdateDisabledState = useMemo(
                        () => updateFABDisabledState(elevated)(setState),
                        [elevated, setState]
                )

                const iconElement = icon && (
                        <RenderFABIcon
                                disabled={rawDisabled}
                                extended={extended}
                                icon={icon}
                                id={id}
                                size={size}
                                type={type}
                        />
                )

                useEffect(() => {
                        runUpdateStatus(isDisabled)
                }, [runUpdateStatus, isDisabled])

                useEffect(() => {
                        runUpdateDisabledState(elevated)
                }, [runUpdateDisabledState, elevated])

                return (
                        <RenderFAB
                                {...renderFABProps}
                                backgroundUnderlayAnimatedStyle={backgroundUnderlayAnimatedStyle}
                                disabled={isDisabled}
                                elevation={elevation}
                                eventName={eventName}
                                extended={extended}
                                iconElement={iconElement}
                                id={id}
                                interactionHandlers={interactionHandlers}
                                labelText={labelText}
                                labelTextAnimatedStyle={labelTextAnimatedStyle}
                                loading={loading}
                                ref={ref}
                                size={size}
                                type={type}
                                underlayColor={underlayColor}
                        />
                )
        }
)

FABBase.displayName = 'FABBase'
