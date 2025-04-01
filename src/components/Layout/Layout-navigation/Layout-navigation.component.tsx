import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import {LayoutNavigationBase} from './Layout-navigation-base.component'
import {LayoutNavigationProps, RenderLayoutNavigationProps} from './Layout-navigation.interface'
import {ContainerLayout} from './Layout-navigation.styles'

const render = ({
        animatedType = 'collapseX',
        children,
        defaultVisible = true,
        id,
        testID,
        ...containerProps
}: RenderLayoutNavigationProps) => (
        <ContainerLayout
                {...containerProps}
                animatedType={animatedType}
                defaultVisible={defaultVisible}
                entry={{duration: 'medium3', easing: 'emphasizedDecelerate'}}
                exit={{duration: 'short3', easing: 'emphasizedAccelerate'}}
                testID={testID ?? `layoutNavigation--${id}`}
        >
                {children}
        </ContainerLayout>
)

const ForwardRefLayoutNavigation = forwardRef<View, LayoutNavigationProps>((props, ref) => (
        <LayoutNavigationBase
                {...props}
                ref={ref}
                render={render}
        />
))

export const LayoutNavigation = ForwardRefLayoutNavigation as FC<LayoutNavigationProps>
