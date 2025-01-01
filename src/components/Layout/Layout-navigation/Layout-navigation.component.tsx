import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import {LayoutNavigationBase} from './Layout-navigation-base.component'
import {LayoutNavigationProps, RenderLayoutNavigationProps} from './Layout-navigation.interface'
import {Container} from './Layout-navigation.styles'

const render = ({
        animatedType = 'collapseX',
        children,
        id,
        testID,
        theme,
        width,
        ...containerProps
}: RenderLayoutNavigationProps) => (
        <Container
                {...containerProps}
                animatedType={animatedType}
                defaultVisible={true}
                entry={{duration: 'medium3', easing: 'emphasizedDecelerate'}}
                exit={{duration: 'short3', easing: 'emphasizedAccelerate'}}
                testID={testID ?? `layoutNavigation--${id}`}
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
