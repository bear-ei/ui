import {forwardRef} from 'react'
import type {View} from 'react-native'
import {typedMemo} from '../../utils'
import {MaskBase} from './Mask-base.component'
import type {MaskProps} from './Mask.interface'

const MaskWithRef = forwardRef<View, MaskProps>((props, ref) => (
        <MaskBase
                {...props}
                ref={ref}
        />
))

MaskWithRef.displayName = 'MaskWithRef'

export const Mask = typedMemo(MaskWithRef)()
