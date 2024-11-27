import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import {LayoutPaneBase} from './Layout-pane-base.component'
import {LayoutPaneProps, RenderLayoutPaneProps} from './Layout-pane.interface'
import {Container} from './Layout-pane.styles'

const render = ({id, children, animatedType = 'collapse', width, testID, ...containerProps}: RenderLayoutPaneProps) => (
        <Container
                {...containerProps}
                animatedType={animatedType}
                defaultVisible={true}
                entry={{duration: 'medium3', easing: 'emphasizedDecelerate'}}
                exit={{duration: 'short3', easing: 'emphasizedAccelerate'}}
                testID={testID ?? `layoutPane--${id}`}
                width={width}
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
