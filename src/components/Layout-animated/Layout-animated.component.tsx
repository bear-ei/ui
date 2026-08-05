import {typedMemo} from '@/utils'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import {LayoutAnimatedBase} from './Layout-animated-base.component'
import type {LayoutAnimatedProps} from './Layout-animated.interface'

const LayoutAnimatedWithRef = forwardRef<View, LayoutAnimatedProps>((props, ref) => (
    <LayoutAnimatedBase
        {...props}
        ref={ref}
    />
))

LayoutAnimatedWithRef.displayName = 'LayoutAnimatedWithRef'

export const LayoutAnimated = typedMemo(LayoutAnimatedWithRef)()
