import {forwardRef, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import {createHandler, createHandlerFinal, runAfterInteractions} from '../../../utils'
import {
	handleListAfterAffordanceCancel,
	handleListAfterAffordanceConfirm,
	handleListAfterAffordanceVisible
} from './List-after-affordance-handle'
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
				createHandlerFinal(
					handleListAfterAffordanceConfirm({
						doubleConfirmed: isDoubleConfirmed,
						indexKey,
						onConfirm
					})
				)(),
			[indexKey, isDoubleConfirmed, onConfirm]
		)

		const onListAfterAffordanceCancel = useMemo(
			() =>
				createHandler(
					handleListAfterAffordanceCancel({
						doubleConfirmed: isDoubleConfirmed,
						indexKey,
						onCancel
					})
				)(setState)(),
			[indexKey, isDoubleConfirmed, onCancel, setState]
		)

		const onListAfterAffordanceVisible = useMemo(
			() => createHandler(handleListAfterAffordanceVisible)(setState)(),
			[setState]
		)
		const {dangerAnimatedStyle} = useListAfterAffordanceAnimated({doubleConfirmed: isDoubleConfirmed})

		useEffect(() => {
			onListAfterAffordanceVisible(visible)
		}, [onListAfterAffordanceVisible, visible])

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
