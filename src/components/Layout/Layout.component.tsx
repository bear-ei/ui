import {FC, forwardRef} from 'react'
import {View, ViewStyle} from 'react-native'
import {LayoutType} from '../Common'
import {LayoutBase} from './Layout-base.component'
import {LayoutNavigation} from './Layout-navigation'
import {LayoutPane} from './Layout-pane'
import {LayoutComponent, LayoutProps, RenderLayoutProps} from './Layout.interface'
import {ContainerLayout} from './Layout.styles'

const render = ({
        children,
        contentStyle: rawContentStyle,
        defaultVisible = true,
        id,
        layout = LayoutType.HORIZONTAL,
        testID,
        ...containerProps
}: RenderLayoutProps) => {
        const contentStyle = {
                ...rawContentStyle,
                flexDirection: layout === LayoutType.HORIZONTAL ? 'row' : 'column'
        } as ViewStyle

        return (
                <ContainerLayout
                        {...containerProps}
                        contentStyle={contentStyle}
                        defaultVisible={defaultVisible}
                        testID={testID ?? `layout--${id}`}
                >
                        {children}
                </ContainerLayout>
        )
}

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
