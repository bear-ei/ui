import {typedMemo} from '@/utils'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import {TouchableRippleBase} from './Touchable-ripple-base.component'
import {compareTouchableRippleProps} from './Touchable-ripple.handler'
import type {TouchableRippleProps} from './Touchable-ripple.interface'

const TouchableRippleWithRef = forwardRef<View, TouchableRippleProps>((props, ref) => (
    <TouchableRippleBase
        {...props}
        ref={ref}
    />
))

TouchableRippleWithRef.displayName = 'TouchableRippleWithRef'

export const TouchableRipple = typedMemo(TouchableRippleWithRef)((prevProps, nextProps) =>
    compareTouchableRippleProps(prevProps)(nextProps)
)
