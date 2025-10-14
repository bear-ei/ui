import {typedMemo} from '@/utils'
import {forwardRef} from 'react'
import {TouchableBase} from './Touchable-base.component'
import type {PressableType, TouchableProps} from './Touchable.interface'

const TouchableWithRef = forwardRef<PressableType, TouchableProps>((props, ref) => (
        <TouchableBase
                {...props}
                ref={ref}
        />
))

TouchableWithRef.displayName = 'TouchableWithRef'

export const Touchable = typedMemo(TouchableWithRef)()
