import {forwardRef} from 'react'
import type {View} from 'react-native'
import {typedMemo} from '../../../utils'
import {ProgressActiveIndicatorCircularBase} from './Progress-active-indicator-circular-base.component'
import type {ProgressActiveIndicatorCircularProps} from './Progress-active-indicator-circular.interface'

const ProgressActiveIndicatorCircularWithRef = forwardRef<View, ProgressActiveIndicatorCircularProps>((props, ref) => (
        <ProgressActiveIndicatorCircularBase
                {...props}
                ref={ref}
        />
))

ProgressActiveIndicatorCircularWithRef.displayName = 'ProgressActiveIndicatorCircularWithRef'

export const ProgressActiveIndicatorCircular = typedMemo(ProgressActiveIndicatorCircularWithRef)()
