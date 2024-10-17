import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import {LayoutBase} from './Layout-base.component'
import {LayoutPane} from './Layout-pane'
import {LayoutComponent, LayoutProps, RenderLayoutProps} from './Layout.interface'
import {Container} from './Layout.styles'

const render = ({id, children, ...containerProps}: RenderLayoutProps) => (
    <Container
        {...containerProps}
        testID={`layout--${id}`}
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

export const Layout = ForwardRefLayout as FC<LayoutProps> as LayoutComponent
