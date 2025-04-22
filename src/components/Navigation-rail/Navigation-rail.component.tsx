import {forwardRef} from 'react'
import type {View} from 'react-native'
import {NavigationRailBase} from './Navigation-rail-base.component'
import type {NavigationRailProps, RenderNavigationRailProps} from './Navigation-rail.interface'
import {Container, Destination, Fab, Menu} from './Navigation-rail.styles'

const renderNavigationRail = ({
	destinationPosition,
	fabElement,
	id,
	menu,
	navigationRailItemElements,
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
			{navigationRailItemElements}
		</Destination>
	</Container>
)

const NavigationRailWithRef = forwardRef<View, NavigationRailProps>((props, ref) => (
	<NavigationRailBase
		{...props}
		ref={ref}
		renderNavigationRail={renderNavigationRail}
	/>
))

export const NavigationRail = NavigationRailWithRef
