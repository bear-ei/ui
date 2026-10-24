import {cloneElement, useEffect, useId, useMemo, type FC} from 'react'
import {useImmer} from 'use-immer'

import type {FABProps} from '../FAB'
import type {IconButtonProps} from '../Icon-button'
import type {NavigationRailBaseProps, NavigationRailState} from './Navigation-rail.interface'

import {usePendingEvent} from '../../hooks'
import {DENSITY_SIZE} from '../../theme'
import {NAVIGATION_DESTINATION_POSITION} from './Navigation-rail.enum'
import {updateNavigationRailActiveKey, updateNavigationRailData} from './Navigation-rail.handler'
import {RenderNavigationRail, RenderNavigationRailItems} from './Navigation-rail.render'

export const NavigationRailBase: FC<NavigationRailBaseProps> = ({
	activeKey: rawActiveKey,
	animation,
	data: rawData,
	defaultActiveKey,
	destinationPosition = NAVIGATION_DESTINATION_POSITION.TOP,
	fab,
	menu,
	onActiveKeyChange: rawOnActiveKeyChange,
	type,
	...renderNavigationRailProps
}) => {
	const [{activeKey, data, pendingActiveEvent}, setState] = useImmer<NavigationRailState>({
		activeKey: rawActiveKey ?? defaultActiveKey
	})

	usePendingEvent('pendingActiveEvent', rawOnActiveKeyChange, {pendingEvent: pendingActiveEvent, setState})

	const id = useId()
	const onActiveKeyChange = useMemo(
		() => updateNavigationRailActiveKey(setState, {onActiveKeyChange: rawOnActiveKeyChange}),
		[rawOnActiveKeyChange, setState]
	)

	const runUpdateData = useMemo(() => updateNavigationRailData(setState), [setState])
	const runUpdateActiveKey = useMemo(() => updateNavigationRailActiveKey(setState, {notify: false}), [setState])

	const itemElements = (
		<RenderNavigationRailItems
			activeKey={activeKey}
			animation={animation}
			data={data}
			id={id}
			onActiveKeyChange={onActiveKeyChange}
			type={type}
		/>
	)

	// Intentional override: the NavigationRail controls the FAB's layout
	// (elevation off to blend into the rail, XX_LARGE size for the rail's
	// grid). Caller-provided size / elevated are ignored.
	const fabElement =
		fab ?
			cloneElement<FABProps>(fab, {
				elevated: false,
				size: DENSITY_SIZE.XX_LARGE,
				testID: `navigationRail__fab--${id}`
			})
		:	undefined

	const menuElement =
		menu ?
			cloneElement<IconButtonProps>(menu, {size: DENSITY_SIZE.MEDIUM, testID: `navigationRail__menu--${id}`})
		:	undefined

	useEffect(() => {
		runUpdateActiveKey(rawActiveKey)
	}, [rawActiveKey, runUpdateActiveKey])

	useEffect(() => {
		runUpdateData(rawData)
	}, [runUpdateData, rawData])

	return (
		<RenderNavigationRail
			{...renderNavigationRailProps}
			destinationPosition={destinationPosition}
			fabElement={fabElement}
			id={id}
			itemElements={itemElements}
			menuElement={menuElement}
		/>
	)
}
