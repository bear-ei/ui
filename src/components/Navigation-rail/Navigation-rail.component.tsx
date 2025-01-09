import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import {NavigationRailBase} from './Navigation-rail-base.component'
import {NavigationRailProps, RenderNavigationRailProps} from './Navigation-rail.interface'
import {Container, Destination, Fab, Menu} from './Navigation-rail.styles'

const render = ({
        destinationPosition,
        fabElement,
        menu,
        navigationRailItemElements,
        ...containerProps
}: RenderNavigationRailProps) => (
        <Container {...containerProps}>
                {menu && <Menu>{menu}</Menu>}
                {fabElement && <Fab>{fabElement}</Fab>}

                <Destination destinationPosition={destinationPosition}>{navigationRailItemElements}</Destination>
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
