import {useCallback, useEffect, useId, useMemo, type FC} from 'react'
import {useImmer} from 'use-immer'

import type {ListAfterAffordanceBaseProps, ListAfterAffordanceState} from './List-after-affordance.interface'

import {COMPONENT_STATUS, type InteractionState} from '../../../constants'
import {
	useInteractionStateEvent,
	usePendingEvent,
	type HandleInteractionStateChangeOptions,
	type InteractionEvent
} from '../../../hooks'
import {LIST_AFTER_AFFORDANCE_PHASE} from './List-after-affordance.enum'
import {
	handleAffordanceStateChange,
	resetAffordanceConfirmationOnHide,
	triggerListAfterAffordancePrimaryAction,
	updateListAffordanceSecondaryPressState
} from './List-after-affordance.handler'
import {RenderListAfterAffordance} from './List-after-affordance.render'
import {useListAfterAffordanceAnimated} from './use-list-after-affordance-animated.hook'

export const ListAfterAffordanceBase: FC<ListAfterAffordanceBaseProps> = ({
	itemKey,
	onPrimaryAction: rawOnPrimaryAction,
	onSecondaryPress: rawOnSecondaryPress,
	visible,
	...renderListAfterAffordanceProps
}) => {
	const [{pendingSecondaryPressEvent, phase, status}, setState] = useImmer<ListAfterAffordanceState>({
		phase: LIST_AFTER_AFFORDANCE_PHASE.IDLE,
		status: COMPONENT_STATUS.IDLE
	})

	usePendingEvent('pendingSecondaryPressEvent', rawOnSecondaryPress, {
		pendingEvent: pendingSecondaryPressEvent,
		setState
	})

	const id = useId()
	const onInteractionStateChange = useCallback(
		(event: InteractionEvent, interactionState: InteractionState, options: HandleInteractionStateChangeOptions) =>
			handleAffordanceStateChange(event, setState, {...options, interactionState}),
		[setState]
	)

	const interactionHandlers = useInteractionStateEvent({...renderListAfterAffordanceProps, onInteractionStateChange})
	const onPrimaryAction = useMemo(
		() =>
			triggerListAfterAffordancePrimaryAction({
				itemKey,
				onPrimaryAction: rawOnPrimaryAction,
				phase
			}),
		[itemKey, phase, rawOnPrimaryAction]
	)

	const onSecondaryPress = useMemo(
		() =>
			updateListAffordanceSecondaryPressState(setState, {
				itemKey,
				onSecondaryPress: rawOnSecondaryPress,
				phase
			}),
		[itemKey, phase, rawOnSecondaryPress, setState]
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
			onPrimaryAction={onPrimaryAction}
			onSecondaryPress={onSecondaryPress}
			phase={phase}
			visible={visible}
		/>
	)
}
