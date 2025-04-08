import {Duration, Easing} from '@bearei/material-token'
import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import {LayoutAnimatedType} from '../../Layout-animated'
import {LayoutNavigationBase} from './Layout-navigation-base.component'
import {LayoutNavigationProps, RenderLayoutNavigationProps} from './Layout-navigation.interface'
import {ContainerLayout} from './Layout-navigation.styles'

const render = ({
        animatedType = LayoutAnimatedType.COLLAPSE_X,
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
                entry={{duration: Duration.MEDIUM_3, easing: Easing.EMPHASIZED_DECELERATE}}
                exit={{duration: Duration.SHORT_3, easing: Easing.EMPHASIZED_ACCELERATE}}
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
