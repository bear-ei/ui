import type {FC} from 'react'
import {useEffect, useId, useMemo} from 'react'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import {runAfterInteractions} from '../../../utils'
import {
	handleListAfterAffordanceCancel,
	handleListAfterAffordanceConfirm,
	handleListAfterAffordanceVisible
} from './List-after-affordance-handle'
import type {ListAfterAffordanceBaseProps, ListAfterAffordanceState} from './List-after-affordance.interface'
import {useListAfterAffordanceAnimated} from './use-list-after-affordance-animated.hook'

export const ListAfterAffordanceBase: FC<ListAfterAffordanceBaseProps> = ({
	indexKey,
	onCancel,
	onConfirm,
	render,
	visible,
	...renderProps
}) => {
	const [{doubleConfirmed, nextCancelEvent}, setState] = useImmer<ListAfterAffordanceState>({})
	const theme = useTheme()
	const id = useId()
	const onListAfterAffordanceConfirm = handleListAfterAffordanceConfirm({doubleConfirmed, onConfirm, indexKey})
	const onListAfterAffordanceCancel = handleListAfterAffordanceCancel({doubleConfirmed, onCancel, indexKey})(
		setState
	)

	const onListAfterAffordanceVisible = useMemo(() => handleListAfterAffordanceVisible(setState), [setState])
	const {dangerAnimatedStyle} = useListAfterAffordanceAnimated({doubleConfirmed})

	useEffect(() => {
		onListAfterAffordanceVisible(visible)
	}, [onListAfterAffordanceVisible, visible])

	useEffect(() => {
		runAfterInteractions(nextCancelEvent)()
	}, [nextCancelEvent])

	return render({
		...renderProps,
		dangerAnimatedStyle,
		doubleConfirmed,
		id,
		onCancel: onListAfterAffordanceCancel,
		onConfirm: onListAfterAffordanceConfirm,
		theme,
		visible
	})
}
