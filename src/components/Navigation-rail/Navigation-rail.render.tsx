import {forwardRef, type FC} from 'react'
import type {View} from 'react-native'
import {NavigationRailItem} from './Navigation-rail-item'
import type {RenderNavigationRailItemOptions, RenderNavigationRailProps} from './Navigation-rail.interface'
import {Container, Destination, Fab, Menu} from './Navigation-rail.styles'

export const RenderNavigationRailItems: FC<RenderNavigationRailItemOptions> = ({
	id,
	data,
	...renderNavigationRailItemProps
}) => (
	<>
		{data?.map(({indexKey, ...props}, index) => (
			<NavigationRailItem
				{...props}
				{...renderNavigationRailItemProps}
				indexKey={indexKey ?? index.toString()}
				key={indexKey}
				testID={`navigationRail__navigationRailItem--${id}`}
			/>
		))}
	</>
)

export const RenderNavigationRail = forwardRef<View, RenderNavigationRailProps>(
	({destinationPosition, id, itemElements, menuElement, testID, fabElement, ...containerProps}, ref) => (
		<Container
			{...containerProps}
			ref={ref}
			testID={testID ?? `navigationRail--${id}`}
		>
			{menuElement && <Menu testID={`navigationRail__menu--${id}`}>{menuElement}</Menu>}
			{fabElement && <Fab testID={`navigationRail__fab--${id}`}>{fabElement}</Fab>}
			<Destination
				destinationPosition={destinationPosition}
				testID={`navigationRail__destination--${id}`}
			>
				{itemElements}
			</Destination>
		</Container>
	)
)
