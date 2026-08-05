import {typedMemo} from '@/utils'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import {SheetBase} from './Sheet-base.component'
import type {SheetProps} from './Sheet.interface'

const SheetWithRef = forwardRef<View, SheetProps>((props, ref) => (
    <SheetBase
        {...props}
        ref={ref}
    />
))

SheetWithRef.displayName = 'SheetWithRef'

export const Sheet = typedMemo(SheetWithRef)()
