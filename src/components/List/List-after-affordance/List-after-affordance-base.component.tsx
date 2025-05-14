import {forwardRef, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import {createStableHandler, createStableHandlerWithState, runAfterInteractions} from '../../../utils'
import {
	handleAffordanceCancel,
	triggerAffordanceConfirm,
	updateAffordanceVisible
} from './List-after-affordance-handler'
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
		const onAffordanceConfirm = useMemo(
			() =>
				createStableHandler(
					triggerAffordanceConfirm({
						doubleConfirmed: isDoubleConfirmed,
						indexKey,
						onConfirm
					})
				)(),
			[indexKey, isDoubleConfirmed, onConfirm]
		)

		const onAffordanceCancel = useMemo(
			() =>
				createStableHandlerWithState(
					handleAffordanceCancel({
						doubleConfirmed: isDoubleConfirmed,
						indexKey,
						onCancel
					})
				)(setState)(),
			[indexKey, isDoubleConfirmed, onCancel, setState]
		)

		const updateAffordanceVisibleEffect = useMemo(
			() => createStableHandlerWithState(updateAffordanceVisible)(setState)(),
			[setState]
		)
		const {dangerAnimatedStyle} = useListAfterAffordanceAnimated({doubleConfirmed: isDoubleConfirmed})

		useEffect(() => {
			updateAffordanceVisibleEffect(visible)
		}, [updateAffordanceVisibleEffect, visible])

		useEffect(() => {
			runAfterInteractions(nextCancelEvent)()
		}, [nextCancelEvent])

		return renderListAfterAffordance({
			...renderListAfterAffordanceProps,
			dangerAnimatedStyle,
			doubleConfirmed: isDoubleConfirmed,
			id,
			onCancel: onAffordanceCancel,
			onConfirm: onAffordanceConfirm,
			ref,
			theme,
			visible
		})
	}
)
