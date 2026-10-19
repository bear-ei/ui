import {cloneElement, forwardRef, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useImmer} from 'use-immer'
import {usePendingEvent} from '../../hooks'
import {DENSITY_SIZE} from '../../theme'
import type {FABProps} from '../FAB'
import type {IconButtonProps} from '../Icon-button'
import {NAVIGATION_DESTINATION_POSITION} from './Navigation-rail.enum'
import {updateNavigationRailActiveKey, updateNavigationRailData} from './Navigation-rail.handler'
import type {NavigationRailBaseProps, NavigationRailState} from './Navigation-rail.interface'
import {RenderNavigationRail, RenderNavigationRailItems} from './Navigation-rail.render'

export const NavigationRailBase = forwardRef<View, NavigationRailBaseProps>(
	(
		{
			activeKey: rawActiveKey,
			animatedType,
			data: rawData,
			defaultActiveKey,
			destinationPosition = NAVIGATION_DESTINATION_POSITION.TOP,
			fab,
			menu,
			onActive: rawOnActive,
			type,
			...renderNavigationRailProps
		},
		ref
	) => {
		const [{activeKey, data, pendingActiveEvent}, setState] = useImmer<NavigationRailState>({
			activeKey: rawActiveKey ?? defaultActiveKey
		})

		usePendingEvent({
			eventKey: 'pendingActiveEvent',
			func: rawOnActive,
			pendingEvent: pendingActiveEvent,
			setState
		})

		const id = useId()
		const onActive = useMemo(
			() => updateNavigationRailActiveKey({onActive: rawOnActive})(setState),
			[rawOnActive, setState]
		)

		const runUpdateData = useMemo(() => updateNavigationRailData(setState), [setState])
		const runUpdateActiveKey = useMemo(
			() => updateNavigationRailActiveKey({triggerEvent: false})(setState),
			[setState]
		)

		const itemElements = (
			<RenderNavigationRailItems
				activeKey={activeKey}
				animatedType={animatedType}
				data={data}
				id={id}
				onActive={onActive}
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
				ref={ref}
			/>
		)
	}
)

NavigationRailBase.displayName = 'NavigationRailBase'
