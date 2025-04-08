import {Duration, Easing} from '@bearei/material-token'
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
                        entry={{duration: Duration.MEDIUM_3, easing: Easing.EMPHASIZED_DECELERATE}}
                        exit={{duration: Duration.SHORT_3, easing: Easing.EMPHASIZED_ACCELERATE}}
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
