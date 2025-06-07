import {forwardRef, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import {runAfterInteractions} from '../../../utils'
import {
	resetAffordanceConfirmationOnHide,
	triggerListAfterAffordanceConfirm,
	updateListAffordanceCancelState
} from './List-after-affordance.handler'
import type {ListAfterAffordanceBaseProps, ListAfterAffordanceState} from './List-after-affordance.interface'
import {useListAfterAffordanceAnimated} from './use-list-after-affordance-animated.hook'

export const ListAfterAffordanceBase = forwardRef<View, ListAfterAffordanceBaseProps>(
	(
		{
			indexKey,
			onCancel: rawOnCancel,
			onConfirm: rawOnConfirm,
			renderListAfterAffordance,
			visible,
			...renderListAfterAffordanceProps
		},
		ref
	) => {
		const [{doubleConfirmed: isDoubleConfirmed, nextCancelEvent}, setState] =
			useImmer<ListAfterAffordanceState>({})

		const theme = useTheme()
		const id = useId()
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

		const {dangerAnimatedStyle} = useListAfterAffordanceAnimated({doubleConfirmed: isDoubleConfirmed})
		const runResetConfirmationOnHide = useMemo(
			() => resetAffordanceConfirmationOnHide(setState),
			[setState]
		)

		useEffect(() => {
			runResetConfirmationOnHide(visible)
		}, [runResetConfirmationOnHide, visible])

		useEffect(() => {
			runAfterInteractions(nextCancelEvent)()
		}, [nextCancelEvent])

		return renderListAfterAffordance({
			...renderListAfterAffordanceProps,
			dangerAnimatedStyle,
			doubleConfirmed: isDoubleConfirmed,
			id,
			onCancel,
			onConfirm,
			ref,
			theme,
			visible
		})
	}
)
