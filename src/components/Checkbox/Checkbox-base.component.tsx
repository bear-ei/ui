import {DURATION} from '@bearei/material-token'
import {forwardRef, useCallback, useEffect, useId, useMemo} from 'react'
import type {Pressable} from 'react-native'
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
import {RenderCheckbox} from './Checkbox.render'

export const CheckboxBase = forwardRef<typeof Pressable, CheckboxBaseProps>(
	({active: rawActive, defaultActive, disabled, error, indeterminate, onActive, ...renderCheckboxProps}, ref) => {
		const [{active: isActive, eventName, status, value, nextActiveEvent}, setState] =
			useImmer<CheckboxState>({status: COMPONENT_STATUS.IDLE, value: CHECKBOX_VALUE.UNSELECTED})

		const id = useId()
		const animatedOptions = useMemo(
			() =>
				({
					animatedType: LAYOUT_ANIMATED.SCALE,
					entry: {duration: DURATION.SHORT_2},
					exit: {duration: DURATION.SHORT_1}
				}) as CheckboxIconAnimatedOptions,
			[]
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

		const runUpdateStatus = useMemo(() => updateCheckboxStatus(setState), [setState])
		const runUpdateIndeterminate = useMemo(() => updateCheckboxIndeterminate(setState), [setState])
		const runUpdateActive = useMemo(
			() => updateCheckboxActive({indeterminate})(setState),
			[indeterminate, setState]
		)

		useEffect(() => {
			runUpdateStatus(indeterminate)
			runUpdateIndeterminate(indeterminate)
		}, [indeterminate, runUpdateIndeterminate, runUpdateStatus])

		useEffect(() => {
			runUpdateActive(rawActive ?? defaultActive)
		}, [runUpdateActive, defaultActive, rawActive])

		useEffect(() => {
			runAfterInteractions(nextActiveEvent)()
		}, [nextActiveEvent])

		if (status === COMPONENT_STATUS.IDLE) {
			return <></>
		}

		return (
			<RenderCheckbox
				{...renderCheckboxProps}
				animatedOptions={animatedOptions}
				disabled={disabled}
				error={error}
				eventName={eventName}
				id={id}
				interactionHandlers={interactionHandlers}
				ref={ref}
				value={value}
			/>
		)
	}
)
