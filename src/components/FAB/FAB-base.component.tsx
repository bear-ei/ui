import {SIZE} from '@bearei/element-token'
import {forwardRef, useCallback, useEffect, useId, useMemo} from 'react'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import {useInteractionStateEvent, type HandleStateEventChangeOptions, type StateEvent} from '../../hooks'
import {COMPONENT_STATUS, type State} from '../Common'
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
			extendedFAB,
			icon,
			labelText,
			loading,
			size = SIZE.MEDIUM,
			type = FAB_TYPE.PRIMARY,
			...renderFABProps
		},
		ref
	) => {
		const [{elevation, eventName, status}, setState] = useImmer<FABState>({status: COMPONENT_STATUS.IDLE})
		const id = useId()
		const theme = useTheme()
		const isDisabled = loading || rawDisabled
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

		const iconElement = useMemo(
			() =>
				icon && (
					<RenderFABIcon
						disabled={rawDisabled}
						icon={icon}
						id={id}
						size={size}
						type={type}
					/>
				),
			[icon, id, rawDisabled, size, type]
		)

		useEffect(() => {
			runUpdateStatus(isDisabled)
		}, [runUpdateStatus, isDisabled])

		useEffect(() => {
			runUpdateDisabledState(elevated)
		}, [runUpdateDisabledState, elevated])

		if (status === COMPONENT_STATUS.IDLE) {
			return <></>
		}

		return (
			<RenderFAB
				{...renderFABProps}
				backgroundUnderlayAnimatedStyle={backgroundUnderlayAnimatedStyle}
				disabled={isDisabled}
				elevation={elevation}
				eventName={eventName}
				extendedFAB={extendedFAB ?? !!labelText}
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
