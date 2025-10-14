import {typedMemo} from '@/utils'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import {ProgressActiveIndicatorLinearBase} from './Progress-active-indicator-linear-base.component'
import type {ProgressActiveIndicatorLinearProps} from './Progress-active-indicator-linear.interface'

const ProgressActiveIndicatorLinearWithRef = forwardRef<View, ProgressActiveIndicatorLinearProps>((props, ref) => (
        <ProgressActiveIndicatorLinearBase
                {...props}
                ref={ref}
        />
))

ProgressActiveIndicatorLinearWithRef.displayName = 'ProgressActiveIndicatorLinearWithRef'

export const ProgressActiveIndicatorLinear = typedMemo(ProgressActiveIndicatorLinearWithRef)()
