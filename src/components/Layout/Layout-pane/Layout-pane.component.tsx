import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import {LayoutPaneBase} from './Layout-pane-base.component'
import {LayoutPaneProps, RenderLayoutPaneProps} from './Layout-pane.interface'
import {ContainerLayoutAnimated} from './Layout-pane.styles'

const render = ({
        children,
        defaultVisible = true,
        id,
        layout = 'row',
        testID,
        ...containerProps
}: RenderLayoutPaneProps) => {
        const contentStyle = {flexDirection: layout}

        return (
                <ContainerLayoutAnimated
                        {...containerProps}
                        contentStyle={contentStyle}
                        defaultVisible={defaultVisible}
                        entry={{duration: 'medium3', easing: 'emphasizedDecelerate'}}
                        exit={{duration: 'short3', easing: 'emphasizedAccelerate'}}
                        testID={testID ?? `layoutPane--${id}`}
                >
                        {children}
                </ContainerLayoutAnimated>
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
