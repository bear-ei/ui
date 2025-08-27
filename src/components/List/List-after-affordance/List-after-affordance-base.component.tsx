import {forwardRef, useCallback, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useImmer} from 'use-immer'
import {useInteractionStateEvent, type HandleStateEventChangeOptions, type StateEvent} from '../../../hooks'
import {createDeferredHandlerWithState, runAfterInteractions} from '../../../utils'
import {COMPONENT_STATUS, type State} from '../../Common'
import {
	clearAffordanceEvent,
	handleAffordanceStateChange,
	resetAffordanceConfirmationOnHide,
	triggerListAfterAffordanceConfirm,
	updateListAffordanceCancelState
} from './List-after-affordance.handler'
import type {ListAfterAffordanceBaseProps, ListAfterAffordanceState} from './List-after-affordance.interface'
import {RenderListAfterAffordance} from './List-after-affordance.render'
import {useListAfterAffordanceAnimated} from './use-list-after-affordance-animated.hook'

export const ListAfterAffordanceBase = forwardRef<View, ListAfterAffordanceBaseProps>(
	(
		{indexKey, onCancel: rawOnCancel, onConfirm: rawOnConfirm, visible, ...renderListAfterAffordanceProps},
		ref
	) => {
		const [{doubleConfirmed: isDoubleConfirmed, nextCancelEvent, status}, setState] =
			useImmer<ListAfterAffordanceState>({status: COMPONENT_STATUS.IDLE})

		const id = useId()
		const onStateEventChange = useCallback(
			(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
				handleAffordanceStateChange({...options, state})(setState)(event),
			[setState]
		)

		const interactionHandlers = useInteractionStateEvent({
			...renderListAfterAffordanceProps,
			onStateEventChange
		})

		const onConfirm = useMemo(
			() =>
				triggerListAfterAffordanceConfirm({
					doubleConfirmed: isDoubleConfirmed,
					indexKey,
					onConfirm: rawOnConfirm
				}),
			[indexKey, isDoubleConfirmed, rawOnConfirm]
		)

		const onCancel = useMemo(
			() =>
				updateListAffordanceCancelState({
					doubleConfirmed: isDoubleConfirmed,
					indexKey,
					onCancel: rawOnCancel
				})(setState),
			[indexKey, isDoubleConfirmed, rawOnCancel, setState]
		)

		const {dangerAnimatedStyle} = useListAfterAffordanceAnimated({
			doubleConfirmed: isDoubleConfirmed,
			status
		})

		const runResetConfirmationOnHide = useMemo(
			() => resetAffordanceConfirmationOnHide(setState),
			[setState]
		)

		const runClearAffordanceEvent = useMemo(
			() => createDeferredHandlerWithState(clearAffordanceEvent)(setState)(),
			[setState]
		)

		useEffect(() => {
			runResetConfirmationOnHide(visible)
		}, [runResetConfirmationOnHide, visible])

		useEffect(() => {
			runAfterInteractions(nextCancelEvent)().done(() => runClearAffordanceEvent('cancel'))
		}, [nextCancelEvent, runClearAffordanceEvent])

		return (
			<RenderListAfterAffordance
				{...renderListAfterAffordanceProps}
				dangerAnimatedStyle={dangerAnimatedStyle}
				doubleConfirmed={isDoubleConfirmed}
				id={id}
				interactionHandlers={interactionHandlers}
				onCancel={onCancel}
				onConfirm={onConfirm}
				ref={ref}
				visible={visible}
			/>
		)
	}
)
