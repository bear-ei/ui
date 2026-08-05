import {typedMemo} from '@/utils'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import {ListAfterAffordanceBase} from './List-after-affordance-base.component'
import type {ListAfterAffordanceProps} from './List-after-affordance.interface'

export const ListAfterAffordanceWithRef = forwardRef<View, ListAfterAffordanceProps>((props, ref) => (
    <ListAfterAffordanceBase
        {...props}
        ref={ref}
    />
))

ListAfterAffordanceWithRef.displayName = 'ListAfterAffordanceWithRef'

export const ListAfterAffordance = typedMemo(ListAfterAffordanceWithRef)()
