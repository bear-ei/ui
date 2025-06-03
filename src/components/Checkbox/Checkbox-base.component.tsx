import {DURATION} from '@bearei/material-token'
import {forwardRef, useCallback, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import {useInteractionStateEvent, type HandleStateEventChangeOptions, type StateEvent} from '../../hooks'
import {runAfterInteractions} from '../../utils'
import {COMPONENT_STATUS, type State} from '../Common'
import {LAYOUT_ANIMATED} from '../Layout-animated'
import {CHECKBOX_VALUE} from './Checkbox.enum'
import {
	handleCheckboxStateChange,
	updateCheckboxActive,
	updateCheckboxIndeterminate,
	updateCheckboxStatus
} from './Checkbox.handler'
import type {CheckboxBaseProps, CheckboxIconAnimatedOptions, CheckboxState} from './Checkbox.interface'

export const CheckboxBase = forwardRef<View, CheckboxBaseProps>(
	(
		{
			active: rawActive,
			defaultActive,
			disabled,
			error,
			indeterminate,
			onActive,
			renderCheckbox,
			...renderCheckboxProps
		},
		ref
	) => {
		const [{active: isActive, eventName, status, value, nextActiveEvent}, setState] =
			useImmer<CheckboxState>({status: COMPONENT_STATUS.IDLE, value: CHECKBOX_VALUE.UNSELECTED})

		const id = useId()
		const theme = useTheme()
		const animatedOptions = useMemo(
			() =>
				({
					animatedType: LAYOUT_ANIMATED.SCALE,
					entry: {duration: DURATION.SHORT_2},
					exit: {duration: DURATION.SHORT_1}
				}) as CheckboxIconAnimatedOptions,
			[]
		)

		const runUpdateCheckboxStatus = useMemo(() => updateCheckboxStatus(setState), [setState])
		const runUpdateCheckboxIndeterminate = useMemo(() => updateCheckboxIndeterminate(setState), [setState])
		const runUpdateCheckboxActive = useMemo(
			() => updateCheckboxActive({indeterminate})(setState),
			[indeterminate, setState]
		)

		const onStateEventChange = useCallback(
			(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
				handleCheckboxStateChange({
					...options,
					active: isActive,
					indeterminate,
					onActive,
					state
				})(setState)(event),
			[indeterminate, isActive, onActive, setState]
		)

		const interactionHandlers = useInteractionStateEvent({
			...renderCheckboxProps,
			disabled,
			onStateEventChange
		})

		useEffect(() => {
			runUpdateCheckboxStatus(indeterminate)
			runUpdateCheckboxIndeterminate(indeterminate)
		}, [runUpdateCheckboxIndeterminate, runUpdateCheckboxStatus, indeterminate])

		useEffect(() => {
			runUpdateCheckboxActive(rawActive ?? defaultActive)
		}, [runUpdateCheckboxActive, defaultActive, rawActive])

		useEffect(() => {
			runAfterInteractions(nextActiveEvent)()
		}, [nextActiveEvent])

		if (status === COMPONENT_STATUS.IDLE) {
			return <></>
		}

		return renderCheckbox({
			...renderCheckboxProps,
			disabled,
			error,
			eventName,
			id,
			interactionHandlers,
			ref,
			theme,
			value,
			animatedOptions
		})
	}
)
