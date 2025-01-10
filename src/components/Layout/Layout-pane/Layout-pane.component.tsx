import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import {LayoutPaneBase} from './Layout-pane-base.component'
import {LayoutPaneProps, RenderLayoutPaneProps} from './Layout-pane.interface'
import {Container} from './Layout-pane.styles'

const render = ({
        animatedType = 'collapseX',
        children,
        defaultVisible = true,
        ...containerProps
}: RenderLayoutPaneProps) => (
        <Container
                {...containerProps}
                animatedType={animatedType}
                defaultVisible={defaultVisible}
                entry={{duration: 'medium3', easing: 'emphasizedDecelerate'}}
                exit={{duration: 'short3', easing: 'emphasizedAccelerate'}}
        >
                {children}
        </Container>
)

const ForwardRefLayoutPane = forwardRef<View, LayoutPaneProps>((props, ref) => (
        <LayoutPaneBase
                {...props}
                ref={ref}
                render={render}
        />
))

export const LayoutPane = ForwardRefLayoutPane as FC<LayoutPaneProps>
