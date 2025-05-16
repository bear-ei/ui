import {forwardRef, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import {createStableHandler, createStableHandlerWithState, runAfterInteractions} from '../../../utils'
import {
	resetAffordanceConfirmationOnHide,
	triggerListAfterAffordanceConfirm,
	updateListAffordanceCancelState
} from './List-after-affordance.handler'
import type {ListAfterAffordanceBaseProps, ListAfterAffordanceState} from './List-after-affordance.interface'
import {useListAfterAffordanceAnimated} from './use-list-after-affordance-animated.hook'

export const ListAfterAffordanceBase = forwardRef<View, ListAfterAffordanceBaseProps>(
	(
		{indexKey, onCancel, onConfirm, renderListAfterAffordance, visible, ...renderListAfterAffordanceProps},
		ref
	) => {
		const [{doubleConfirmed: isDoubleConfirmed, nextCancelEvent}, setState] =
			useImmer<ListAfterAffordanceState>({})

		const theme = useTheme()
		const id = useId()
		const onListAfterAffordanceConfirm = useMemo(
			() =>
				createStableHandler(
					triggerListAfterAffordanceConfirm({
						doubleConfirmed: isDoubleConfirmed,
						indexKey,
						onConfirm
					})
				)(),
			[indexKey, isDoubleConfirmed, onConfirm]
		)

		const onListAfterAffordanceCancel = useMemo(
			() =>
				createStableHandlerWithState(
					updateListAffordanceCancelState({
						doubleConfirmed: isDoubleConfirmed,
						indexKey,
						onCancel
					})
				)(setState)(),
			[indexKey, isDoubleConfirmed, onCancel, setState]
		)

		const resetAffordanceConfirmationOnHideEffect = useMemo(
			() => createStableHandlerWithState(resetAffordanceConfirmationOnHide)(setState)(),
			[setState]
		)
		const {dangerAnimatedStyle} = useListAfterAffordanceAnimated({doubleConfirmed: isDoubleConfirmed})

		useEffect(() => {
			resetAffordanceConfirmationOnHideEffect(visible)
		}, [resetAffordanceConfirmationOnHideEffect, visible])

		useEffect(() => {
			runAfterInteractions(nextCancelEvent)()
		}, [nextCancelEvent])

		return renderListAfterAffordance({
			...renderListAfterAffordanceProps,
			dangerAnimatedStyle,
			doubleConfirmed: isDoubleConfirmed,
			id,
			onCancel: onListAfterAffordanceCancel,
			onConfirm: onListAfterAffordanceConfirm,
			ref,
			theme,
			visible
		})
	}
)
