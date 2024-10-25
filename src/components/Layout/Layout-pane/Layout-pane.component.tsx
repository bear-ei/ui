import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import {LayoutPaneBase} from './Layout-pane-base.component'
import {LayoutPaneProps, RenderLayoutPaneProps} from './Layout-pane.interface'
import {Container} from './Layout-pane.styles'

const render = ({id, children, ...containerProps}: RenderLayoutPaneProps) => {
        return (
                <Container
                        {...containerProps}
                        testID={`layoutPane--${id}`}
                >
                        {children}
                </Container>
        )
}

const ForwardRefLayoutPane = forwardRef<View, LayoutPaneProps>((props, ref) => (
        <LayoutPaneBase
                {...props}
                ref={ref}
                render={render}
        />
))

export const LayoutPane = ForwardRefLayoutPane as FC<LayoutPaneProps>
