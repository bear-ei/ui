import {forwardRef, useCallback, useEffect, useId, useMemo} from 'react'
import {useImmer} from 'use-immer'
import {COMPONENT_STATUS, type State} from '../../constants'
import {type HandleStateEventChangeOptions, type StateEvent, useInteractionStateEvent, useTheme} from '../../hooks'
import {DENSITY_SIZE} from '../../theme'
import {ELEVATION_VALUE} from '../Elevation'
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
			size = DENSITY_SIZE.MEDIUM,
			type = FAB_TYPE.PRIMARY,
			...renderFABProps
		},
		ref
	) => {
		const [{elevation, eventName, status}, setState] = useImmer<FABState>({
			status: COMPONENT_STATUS.IDLE,
			elevation: ELEVATION_VALUE.LEVEL_3
		})

		const id = useId()
		const theme = useTheme()
		const isDisabled = loading || rawDisabled
		const isExtended = !!labelText
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

		const {backgroundUnderlayAnimatedStyle, labelTextAnimatedStyle} = useFABAnimated({disabled: isDisabled, type})
		const runUpdateStatus = useMemo(() => updateFABStatus(rawDisabled)(setState), [rawDisabled, setState])
		const runUpdateDisabledState = useMemo(() => updateFABDisabledState(elevated)(setState), [elevated, setState])
		const iconElement = icon && (
			<RenderFABIcon
				disabled={rawDisabled}
				extended={isExtended}
				icon={icon}
				id={id}
				size={size}
				type={type}
			/>
		)

		useEffect(() => {
			runUpdateStatus(elevated)
		}, [runUpdateStatus, elevated])

		useEffect(() => {
			runUpdateDisabledState(isDisabled)
		}, [runUpdateDisabledState, isDisabled])

		return (
			<RenderFAB
				{...renderFABProps}
				backgroundUnderlayAnimatedStyle={backgroundUnderlayAnimatedStyle}
				disabled={isDisabled}
				elevation={elevation}
				eventName={eventName}
				extended={isExtended}
				iconElement={iconElement}
				id={id}
				interactionHandlers={interactionHandlers}
				labelText={labelText}
				labelTextAnimatedStyle={labelTextAnimatedStyle}
				loading={loading}
				ref={ref}
				size={size}
				status={status}
				type={type}
				underlayColor={underlayColor}
			/>
		)
	}
)

FABBase.displayName = 'FABBase'
