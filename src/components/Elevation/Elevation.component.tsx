import {typedMemo} from '@/utils'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import {ElevationBase} from './Elevation-base.component'
import type {ElevationProps} from './Elevation.interface'

const ElevationWithRef = forwardRef<View, ElevationProps>((props, ref) => (
    <ElevationBase
        {...props}
        ref={ref}
    />
))

ElevationWithRef.displayName = 'ElevationWithRef'

export const Elevation = typedMemo(ElevationWithRef)()
