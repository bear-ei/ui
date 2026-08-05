import {typedMemo} from '@/utils'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import {DividerBase} from './Divider-base.component'
import type {DividerProps} from './Divider.interface'

const DividerWithRef = forwardRef<View, DividerProps>((props, ref) => (
    <DividerBase
        {...props}
        ref={ref}
    />
))

DividerWithRef.displayName = 'DividerWithRef'

export const Divider = typedMemo(DividerWithRef)()
