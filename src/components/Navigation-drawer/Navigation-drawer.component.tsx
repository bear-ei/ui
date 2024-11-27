import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import {NavigationDrawerBase} from './Navigation-drawer-base.component'
import {NavigationDrawerProps, RenderNavigationDrawerProps} from './Navigation-drawer.interface'
import {Container, Destination, Headline, HeadlineText} from './Navigation-drawer.styles'

const render = ({
        headlineText = 'Drawer',
        id,
        navigationDrawerItemElements,
        testID,
        ...containerProps
}: RenderNavigationDrawerProps) => (
        <Container
                {...containerProps}
                testID={testID ?? `navigationDrawer--${id}`}
        >
                <Headline testID={`navigationDrawer__headline--${id}`}>
                        <HeadlineText
                                size='small'
                                testID={`navigationDrawer__headlineText--${id}`}
                                type='title'
                        >
                                {headlineText}
                        </HeadlineText>
                </Headline>

                <Destination testID={`navigationDrawer__destination--${id}`}>
                        {navigationDrawerItemElements}
                </Destination>
        </Container>
)

const ForwardRefNavigationDrawer = forwardRef<View, NavigationDrawerProps>((props, ref) => (
        <NavigationDrawerBase
                {...props}
                ref={ref}
                render={render}
        />
))

export const NavigationDrawer: FC<NavigationDrawerProps> = ForwardRefNavigationDrawer
