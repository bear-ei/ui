import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import {LayoutBase} from './Layout-base.component'
import {LayoutNavigation} from './Layout-navigation'
import {LayoutPane} from './Layout-pane'
import {LayoutComponent, LayoutProps, RenderLayoutProps} from './Layout.interface'
import {ContainerLayoutAnimated} from './Layout.styles'

const render = ({
        children,
        defaultVisible = true,
        id,
        layout = 'row',
        testID,
        contentStyle: rawContentStyle,
        ...containerProps
}: RenderLayoutProps) => {
        const contentStyle = {...rawContentStyle, flexDirection: layout}

        return (
                <ContainerLayoutAnimated
                        {...containerProps}
                        contentStyle={contentStyle}
                        defaultVisible={defaultVisible}
                        testID={testID ?? `layout--${id}`}
                >
                        {children}
                </ContainerLayoutAnimated>
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
