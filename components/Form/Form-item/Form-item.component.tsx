import {typedMemo} from '@/utils'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import {FormItemBase} from './Form-item-base.component'
import type {FormItemProps} from './Form-item.interface'

const FormItemWithRef = forwardRef<View, FormItemProps>((props, ref) => (
        <FormItemBase
                {...props}
                ref={ref}
        />
))

FormItemWithRef.displayName = 'FormItemWithRef'

export const FormItem = typedMemo(FormItemWithRef)()
