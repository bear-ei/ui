import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import {NavigationRailBase} from './Navigation-rail-base.component'
import {NavigationRailProps, RenderNavigationRailProps} from './Navigation-rail.interface'
import {Container, Destination, Fab, Menu} from './Navigation-rail.styles'

const render = ({
        id,
        menu,
        fabElement,
        navigationRailItemElements,
        destinationPosition,
        ...containerProps
}: RenderNavigationRailProps) => (
        <Container
                {...containerProps}
                testID={`navigationRail--${id}`}
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

const ForwardRefNavigationRail = forwardRef<View, NavigationRailProps>((props, ref) => (
        <NavigationRailBase
                {...props}
                ref={ref}
                render={render}
        />
))

export const NavigationRail: FC<NavigationRailProps> = ForwardRefNavigationRail
