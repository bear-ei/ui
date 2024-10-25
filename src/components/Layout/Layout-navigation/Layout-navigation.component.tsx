import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import {LayoutNavigationBase} from './Layout-navigation-base.component'
import {LayoutNavigationProps, RenderLayoutNavigationProps} from './Layout-navigation.interface'
import {Container} from './Layout-navigation.styles'

const render = ({id, children, ...containerProps}: RenderLayoutNavigationProps) => {
        return (
                <Container
                        {...containerProps}
                        testID={`layoutNavigation--${id}`}
                >
                        {children}
                </Container>
        )
}

const ForwardRefLayoutNavigation = forwardRef<View, LayoutNavigationProps>((props, ref) => (
        <LayoutNavigationBase
                {...props}
                ref={ref}
                render={render}
        />
))

export const LayoutNavigation = ForwardRefLayoutNavigation as FC<LayoutNavigationProps>
