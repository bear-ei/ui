import {typedMemo} from '@/utils'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import {ProgressBase} from './Progress-base.component'
import type {ProgressProps} from './Progress.interface'

const ProgressWithRef = forwardRef<View, ProgressProps>((props, ref) => (
        <ProgressBase
                {...props}
                ref={ref}
        />
))

ProgressWithRef.displayName = 'ProgressWithRef'

export const Progress = typedMemo(ProgressWithRef)()
