import {SIZE} from '@bearei/material-token'
import {cloneElement} from 'react'
import type {FABProps} from '../FAB'
import {NavigationRailItem} from './Navigation-rail-item'
import type {
	NavigationRailData,
	RenderNavigationRailItemOptions,
	RenderNavigationRailProps
} from './Navigation-rail.interface'
import {Container, Destination, Fab, Menu} from './Navigation-rail.styles'

export const renderNavigationRailItems =
	({id, ...renderNavigationRailItemOptions}: RenderNavigationRailItemOptions) =>
	(data?: NavigationRailData[]) =>
		data?.map(({indexKey, ...props}, index) => (
			<NavigationRailItem
				{...props}
				{...renderNavigationRailItemOptions}
				indexKey={indexKey ?? index.toString()}
				key={indexKey}
				testID={`navigationRail__navigationRailItem--${id}`}
			/>
		))

export const renderNavigationRailFAB = (id: string) => (fab?: React.JSX.Element) =>
	fab ?
		cloneElement<FABProps>(fab, {elevated: false, size: SIZE.MEDIUM, testID: `navigationRail__fab--${id}`})
	:	undefined

export const renderNavigationRail = ({
	destinationPosition,
	fabElement,
	id,
	itemElements,
	menu,
	testID,
	...containerProps
}: RenderNavigationRailProps) => (
	<Container
		{...containerProps}
		testID={testID ?? `navigationRail--${id}`}
	>
		{menu && <Menu testID={`navigationRail__menu--${id}`}>{menu}</Menu>}
		{fabElement && <Fab testID={`navigationRail__fab--${id}`}>{fabElement}</Fab>}
		<Destination
			destinationPosition={destinationPosition}
			testID={`navigationRail__destination--${id}`}
		>
			{itemElements}
		</Destination>
	</Container>
)
