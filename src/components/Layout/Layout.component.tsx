import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import {LayoutBase} from './Layout-base.component'
import {LayoutNavigation} from './Layout-navigation'
import {LayoutPane} from './Layout-pane'
import {LayoutComponent, LayoutProps, RenderLayoutProps} from './Layout.interface'
import {Container} from './Layout.styles'

const render = ({id, children, testID, ...containerProps}: RenderLayoutProps) => (
        <Container
                {...containerProps}
                testID={testID ?? `layout--${id}`}
        >
                {children}
        </Container>
)

const ForwardRefLayout = forwardRef<View, LayoutProps>((props, ref) => (
        <LayoutBase
                {...props}
                ref={ref}
                render={render}
        />
))

Object.defineProperty(ForwardRefLayout, 'Pane', {value: LayoutPane})
Object.defineProperty(ForwardRefLayout, 'Navigation', {value: LayoutNavigation})

export const Layout = ForwardRefLayout as FC<LayoutProps> as LayoutComponent
