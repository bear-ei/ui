import {forwardRef, useCallback, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useImmer} from 'use-immer'
import {COMPONENT_STATUS, type State} from '../../../constants'
import {
	type HandleStateEventChangeOptions,
	type StateEvent,
	useInteractionStateEvent,
	usePendingEvent
} from '../../../hooks'
import {
	handleAffordanceStateChange,
	resetAffordanceConfirmationOnHide,
	triggerListAfterAffordanceConfirm,
	updateListAffordanceSecondaryActionState
} from './List-after-affordance.handler'
import type {ListAfterAffordanceBaseProps, ListAfterAffordanceState} from './List-after-affordance.interface'
import {RenderListAfterAffordance} from './List-after-affordance.render'
import {useListAfterAffordanceAnimated} from './use-list-after-affordance-animated.hook'
import {LIST_AFTER_AFFORDANCE_PHASE} from './List-after-affordance.enum'

export const ListAfterAffordanceBase = forwardRef<View, ListAfterAffordanceBaseProps>(
	(
		{
			indexKey,
			onConfirm: rawOnConfirm,
			onSecondaryAction: rawOnSecondaryAction,
			visible,
			...renderListAfterAffordanceProps
		},
		ref
	) => {
		const [{phase, pendingSecondaryActionEvent, status}, setState] = useImmer<ListAfterAffordanceState>({
			phase: LIST_AFTER_AFFORDANCE_PHASE.IDLE,
			status: COMPONENT_STATUS.IDLE
		})

		usePendingEvent({
			eventKey: 'pendingSecondaryActionEvent',
			func: rawOnSecondaryAction,
			pendingEvent: pendingSecondaryActionEvent,
			setState
		})

		const id = useId()
		const onStateEventChange = useCallback(
			(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
				handleAffordanceStateChange({...options, state})(setState)(event),
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
				updateListAffordanceSecondaryActionState({
					indexKey,
					onSecondaryAction: rawOnSecondaryAction,
					phase
				})(setState),
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
				ref={ref}
				visible={visible}
			/>
		)
	}
)

ListAfterAffordanceBase.displayName = 'ListAfterAffordanceBase'
