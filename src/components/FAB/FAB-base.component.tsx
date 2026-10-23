import {useCallback, useEffect, useId, useMemo, type FC} from 'react'
import {useImmer} from 'use-immer'

import type {FABBaseProps, FABState} from './FAB.interface'

import {COMPONENT_STATUS, type State} from '../../constants'
import {useTheme, type HandleStateEventChangeOptions, type StateEvent} from '../../hooks'
import {DENSITY_SIZE} from '../../theme'
import {ELEVATION_VALUE} from '../Elevation'
import {FAB_TYPE} from './FAB.enum'
import {getFABUnderlayColor, handleFABStateChange, updateFABDisabledState, updateFABStatus} from './FAB.handler'
import {RenderFAB, RenderFABIcon} from './FAB.render'
import {useFABAnimated} from './use-fab-animated.hook'

export const FABBase: FC<FABBaseProps> = ({
	disabled: rawDisabled,
	elevated = true,
	icon,
	labelText,
	loading,
	size = DENSITY_SIZE.MEDIUM,
	type = FAB_TYPE.PRIMARY,
	...renderFABProps
}) => {
	const [{elevation, eventName, status}, setState] = useImmer<FABState>({
		elevation: elevated ? ELEVATION_VALUE.LEVEL_3 : ELEVATION_VALUE.LEVEL_0,
		status: COMPONENT_STATUS.IDLE
	})

	const id = useId()
	const theme = useTheme()
	const isDisabled = loading || rawDisabled
	const isExtended = !!labelText
	const underlayColor = getFABUnderlayColor(type, theme)
	const onStateEventChange = useCallback(
		(event: StateEvent, state: State, options: HandleStateEventChangeOptions) =>
			handleFABStateChange(event, setState, {...options, elevated, state}),
		[elevated, setState]
	)

	const {backgroundUnderlayAnimatedStyle, labelTextAnimatedStyle} = useFABAnimated({disabled: isDisabled, type})
	const runUpdateStatus = useMemo(() => updateFABStatus(setState, isDisabled), [isDisabled, setState])
	const runUpdateDisabledState = useMemo(() => updateFABDisabledState(setState, elevated), [elevated, setState])
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
			labelText={labelText}
			labelTextAnimatedStyle={labelTextAnimatedStyle}
			loading={loading}
			onStateEventChange={onStateEventChange}
			size={size}
			status={status}
			type={type}
			underlayColor={underlayColor}
		/>
	)
}


