import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import {LayoutPaneBase} from './Layout-pane-base.component'
import {LayoutPaneProps, RenderLayoutPaneProps} from './Layout-pane.interface'
import {ContainerLayout} from './Layout-pane.styles'

const render = ({
        children,
        contentStyle: rawContentStyle,
        defaultVisible = true,
        id,
        layout = 'row',
        testID,
        ...containerProps
}: RenderLayoutPaneProps) => {
        const contentStyle = {...rawContentStyle, flexDirection: layout}

        return (
                <ContainerLayout
                        {...containerProps}
                        contentStyle={contentStyle}
                        defaultVisible={defaultVisible}
                        entry={{duration: 'medium3', easing: 'emphasizedDecelerate'}}
                        exit={{duration: 'short3', easing: 'emphasizedAccelerate'}}
                        testID={testID ?? `layoutPane--${id}`}
                >
                        {children}
                </ContainerLayout>
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
