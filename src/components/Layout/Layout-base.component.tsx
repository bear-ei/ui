import {LAYOUT} from '@/constants'
import {forwardRef, useId} from 'react'
import type {View} from 'react-native'
import {LAYOUT_ANIMATED} from '../Layout-animated'
import type {LayoutBaseProps} from './Layout.interface'
import {RenderLayout} from './Layout.render'

export const LayoutBase = forwardRef<View, LayoutBaseProps>(
    (
        {
            animatedType = LAYOUT_ANIMATED.STANDARD,
            defaultVisible = true,
            layoutType = LAYOUT.HORIZONTAL,
            ...renderLayoutProps
        },
        ref
    ) => {
        const id = useId()

        return (
            <RenderLayout
                {...renderLayoutProps}
                animatedType={animatedType}
                defaultVisible={defaultVisible}
                id={id}
                layoutType={layoutType}
                ref={ref}
            />
        )
    }
)

LayoutBase.displayName = 'LayoutBase'
