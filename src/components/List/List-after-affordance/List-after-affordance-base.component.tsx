import {useCallback, useEffect, useId, useMemo, type FC} from 'react'
import {useImmer} from 'use-immer'

import type {ListAfterAffordanceBaseProps, ListAfterAffordanceState} from './List-after-affordance.interface'

import {COMPONENT_STATUS, type State} from '../../../constants'
import {
	useInteractionStateEvent,
	usePendingEvent,
	type HandleStateEventChangeOptions,
	type StateEvent
} from '../../../hooks'
import {LIST_AFTER_AFFORDANCE_PHASE} from './List-after-affordance.enum'
import {
	handleAffordanceStateChange,
	resetAffordanceConfirmationOnHide,
	triggerListAfterAffordanceConfirm,
	updateListAffordanceSecondaryActionState
} from './List-after-affordance.handler'
import {RenderListAfterAffordance} from './List-after-affordance.render'
import {useListAfterAffordanceAnimated} from './use-list-after-affordance-animated.hook'

export const ListAfterAffordanceBase: FC<ListAfterAffordanceBaseProps> = ({
	indexKey,
	onConfirm: rawOnConfirm,
	onSecondaryAction: rawOnSecondaryAction,
	visible,
	...renderListAfterAffordanceProps
}) => {
	const [{pendingSecondaryActionEvent, phase, status}, setState] = useImmer<ListAfterAffordanceState>({
		phase: LIST_AFTER_AFFORDANCE_PHASE.IDLE,
		status: COMPONENT_STATUS.IDLE
	})

	usePendingEvent('pendingSecondaryActionEvent', rawOnSecondaryAction, {
		pendingEvent: pendingSecondaryActionEvent,
		setState
	})

	const id = useId()
	const onStateEventChange = useCallback(
		(event: StateEvent, state: State, options: HandleStateEventChangeOptions) =>
			handleAffordanceStateChange(event, setState, {...options, state}),
		[setState]
	)

	const interactionHandlers = useInteractionStateEvent({...renderListAfterAffordanceProps, onStateEventChange})
	const onConfirm = useMemo(
		() =>
			triggerListAfterAffordanceConfirm({
				indexKey,
				onConfirm: rawOnConfirm,
				phase
			}),
		[indexKey, phase, rawOnConfirm]
	)

	const onSecondaryAction = useMemo(
		() =>
			updateListAffordanceSecondaryActionState(setState, {
				indexKey,
				onSecondaryAction: rawOnSecondaryAction,
				phase
			}),
		[indexKey, phase, rawOnSecondaryAction, setState]
	)

	const {dangerAnimatedStyle} = useListAfterAffordanceAnimated({phase, status})
	const runResetConfirmationOnHide = useMemo(() => resetAffordanceConfirmationOnHide(setState), [setState])

	useEffect(() => {
		runResetConfirmationOnHide(visible)
	}, [runResetConfirmationOnHide, visible])

	return (
		<RenderListAfterAffordance
			{...renderListAfterAffordanceProps}
			dangerAnimatedStyle={dangerAnimatedStyle}
			id={id}
			interactionHandlers={interactionHandlers}
			onConfirm={onConfirm}
			onSecondaryAction={onSecondaryAction}
			phase={phase}
			visible={visible}
		/>
	)
}
