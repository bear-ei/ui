import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import {LayoutNavigationBase} from './Layout-navigation-base.component'
import {LayoutNavigationProps, RenderLayoutNavigationProps} from './Layout-navigation.interface'
import {Container} from './Layout-navigation.styles'

const render = ({
        animatedType = 'collapseX',
        children,
        defaultVisible = true,
        theme,
        width,
        ...containerProps
}: RenderLayoutNavigationProps) => (
        <Container
                {...containerProps}
                animatedType={animatedType}
                defaultVisible={defaultVisible}
                entry={{duration: 'medium3', easing: 'emphasizedDecelerate'}}
                exit={{duration: 'short3', easing: 'emphasizedAccelerate'}}
                width={width ?? theme.adaptSize(theme.token.spacing.extraSmall * 20)}
        >
                {children}
        </Container>
)

const ForwardRefLayoutNavigation = forwardRef<View, LayoutNavigationProps>((props, ref) => (
        <LayoutNavigationBase
                {...props}
                ref={ref}
                render={render}
        />
))

export const LayoutNavigation = ForwardRefLayoutNavigation as FC<LayoutNavigationProps>
